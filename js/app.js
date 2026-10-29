(() => {
  const D = PORTAL_DATA, S = D.settings;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const root = document.documentElement;

  /* ================= 1. Thông báo nhỏ ================= */
  const toast = $("#toast");
  let toastTimer = 0;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1500);
  }

  /* ================= 2. Icon ================= */
  const hue = s => [...s].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  function candidates(id) {
    const [, url, o = {}] = D.apps[id];
    const domain = new URL(url).hostname.replace(/^www\./, "");
    const list = [];
    if (o.icon) list.push({ src: o.icon, free: true });
    S.iconProviders.forEach(t => list.push({
      src: t.replace("{url}", encodeURIComponent(url)).replace("{domain}", domain).replace("{slug}", o.slug || id),
      free: t.includes("simpleicons")
    }));
    return list;
  }

  const ICONS = new Map();    // id -> url | null (null = đã thử hết, dùng chữ cái)
  const JOBS = new Map();     // id -> Promise (gộp nhiều ô dùng chung một app)
  const WAIT = new WeakMap(); // ô icon -> id (đang chờ lọt vào khung nhìn)
  const PENDING = new Set();  // các ô đang chờ, để dọn khi bị dựng lại

  /* Chỉ phân giải icon khi ô thật sự gần khung nhìn. Trước đây 151 app × 4
     nguồn = hàng trăm request ngay khi mở trang. */
  const IO = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const box = en.target, id = WAIT.get(box);
      WAIT.delete(box); PENDING.delete(box); IO.unobserve(box);
      if (id) loadIcon(id).then(src => { if (src) paintImage(box, id, src); else paintLetter(box, id); });
    }
  }, { rootMargin: "200px 0px" }) : null;

  function paintLetter(box, id) {
    const name = D.apps[id][0];
    box.classList.remove("cover");
    box.style.background = `hsl(${hue(name)} 55% 45%)`;
    box.innerHTML = `<span class="letter">${name[0].toUpperCase()}</span>`;
  }
  function paintImage(box, id, src) {
    const o = D.apps[id][2] || {};
    const img = new Image();
    img.alt = ""; img.draggable = false; img.decoding = "async";
    img.src = src;
    box.style.background = o.bg || "";
    box.classList.toggle("cover", o.fit === "cover");
    box.replaceChildren(img);
  }
  function loadIcon(id) {
    if (JOBS.has(id)) return JOBS.get(id);
    const job = new Promise(resolve => {
      const list = candidates(id);
      (function next(i) {
        if (i >= list.length) { ICONS.set(id, null); resolve(null); return; }
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (!list[i].free && img.naturalWidth <= 16) return next(i + 1);
          ICONS.set(id, list[i].src); resolve(list[i].src);
        };
        img.onerror = () => next(i + 1);
        img.src = list[i].src;
      })(0);
    }).then(src => { JOBS.delete(id); return src; });
    JOBS.set(id, job);
    return job;
  }
  function fillIcon(box, id, eager) {
    const src = ICONS.get(id);
    if (src === null) return paintLetter(box, id);
    if (src !== undefined) return paintImage(box, id, src);   // đã có -> hiện tức thì
    paintLetter(box, id);                                     // hiện ngay, 0 request
    const run = () => loadIcon(id).then(s => s ? paintImage(box, id, s) : paintLetter(box, id));
    if (eager || !IO) run();
    else { WAIT.set(box, id); PENDING.add(box); IO.observe(box); }
  }
  /* IntersectionObserver giữ tham chiếu mạnh tới target: bỏ theo dõi các ô đã
     bị dựng lại để không rò rỉ bộ nhớ mỗi lần resize. */
  function sweep() {
    if (!IO) return;
    for (const b of PENDING) {
      if (b.isConnected) continue;
      PENDING.delete(b); WAIT.delete(b); IO.unobserve(b);
    }
  }

  /* ================= 3. Thành phần ================= */
  function open(id) { window.open(D.apps[id][1], S.openTarget, "noopener,noreferrer"); }

  function appItem(id, eager) {
    const b = el("button", "item"); b.title = D.apps[id][1];
    const t = el("div", "tile"); fillIcon(t, id, eager);
    b.append(t, el("span", "label", D.apps[id][0]));
    b.onclick = () => { if (!dragged) open(id); };
    return b;
  }
  function folderItem(fid) {
    const f = D.folders[fid];
    const b = el("button", "item");
    const t = el("div", "tile folder");
    f.apps.slice(0, 9).forEach(id => { const m = el("div", "mini"); fillIcon(m, id); t.append(m); });
    b.append(t, el("span", "label", f.name));
    b.onclick = () => { if (!dragged) openFolder(fid); };
    return b;
  }
  const make = (ref, eager) => { const [k, id] = ref.split(":"); return k === "folder" ? folderItem(id) : appItem(id, eager); };

  /* ================= 4. Trang chủ =================
     Số ô mỗi trang được tính theo màn hình thật (đo chiều cao 1 hàng icon × số
     cột đang dùng) nên lưới lấp đầy chiều cao, không dừng ở 2 hàng như trước. */
  const pager = $("#pager"), dots = $("#dots"), host = $("#screen");
    const MODE_IDS = [APP_MODES.ALL, APP_MODES.WORK, APP_MODES.SHOPPING, APP_MODES.ENTERTAINMENT];
  function appIdsForMode(mode) {
      if (mode === APP_MODES.ALL) return Object.keys(D.apps);
    return Object.keys(D.apps).filter(id => D.apps[id][2]?.mode === mode);
  }
  let activeMode = null;
  try {
    const storedMode = localStorage.getItem("portal.mode");
    if (MODE_IDS.includes(storedMode)) activeMode = storedMode;
  } catch (e) {}
  let visibleAppIds = appIdsForMode(activeMode || "all");
  let ITEMS = D.layout.pages.flat();
  const modePicker = $("#modePicker"), modeLabel = $("#modeLabel");
  const modeButtons = [...modePicker.querySelectorAll(".mode-option")];
  let cur = 0, pageCount = 1, dragged = false, pageKey = "", lastSize = "", pageRefs = [];

  const colsNow = () => Math.max(1, parseInt(getComputedStyle(root).getPropertyValue("--cols"), 10) || 4);

  function probeItem() {
    const b = el("button", "item");
    b.append(el("div", "tile"), el("span", "label", "Aa"));
    return b;
  }
  function rowsThatFit() {
    const probe = el("section", "page probe");
    probe.append(probeItem());
    host.append(probe);
    const cs = getComputedStyle(probe);
    const padTop = parseFloat(cs.paddingTop) || 0, padBottom = parseFloat(cs.paddingBottom) || 0;
    const gapY = parseFloat(cs.rowGap) || 0;
    const rowH = probe.firstElementChild.getBoundingClientRect().height || 1;
    const avail = probe.clientHeight - padTop - padBottom;
    probe.remove();
    return Math.max(1, Math.floor((avail + gapY) / (rowH + gapY)));
  }

  function build(force) {
    // Cùng kích thước thì bỏ qua: mỗi lần build là một lần ép layout toàn trang
    const size = innerWidth + "x" + innerHeight;
    if (!force && size === lastSize) return;
    lastSize = size;

    const cols = colsNow(), rows = rowsThatFit(), perPage = cols * rows;
    const key = `${cols}x${rows}`;
    if (key === pageKey) return;  // màn hình không đổi -> giữ nguyên, khỏi tải lại icon
    pageKey = key;
    const pages = [];
    for (let i = 0; i < ITEMS.length; i += perPage) pages.push(ITEMS.slice(i, i + perPage));
    if (!pages.length) pages.push([]);
    pageCount = pages.length;
    pageRefs = pages;
    cur = Math.min(cur, pageCount - 1);
    pager.replaceChildren(...pages.map(p => {
      // Trang đầy đủ số hàng -> giãn hàng cho lấp kín chiều cao màn hình
      const full = Math.ceil(p.length / cols) >= rows;
      const pg = el("section", full ? "page fill" : "page");
      p.forEach(r => pg.append(make(r)));
      return pg;
    }));
    dots.replaceChildren(...pages.map((_, i) => el("i", i === cur ? "on" : "")));
    sweep();
    go(cur);
  }

  function go(n) {
    cur = Math.max(0, Math.min(pageCount - 1, n));
    pager.style.transform = `translateX(${-cur * 100}%)`;
    [...dots.children].forEach((d, i) => d.classList.toggle("on", i === cur));
    warmNext();
  }

  /* Nạp trước icon của trang kế bên khi người dùng đang rảnh, để lần vuốt tới
     hiện icon ngay. Chỉ 1 trang (~1 màn hình), không phải toàn bộ 151 app. */
  let warmTimer = 0, warmed = false;
  function warmNext() {
    if (navigator.connection && navigator.connection.saveData) return;
    clearTimeout(warmTimer);
    warmTimer = setTimeout(() => {
      const nxt = pageRefs[cur + 1];
      if (!nxt) return;
      for (const r of nxt) {
        const [k, id] = r.split(":");
        if (k !== "folder") loadIcon(id);
      }
    }, warmed ? 800 : 2400);
    warmed = true;
  }

  function setMode(mode, persist = true, closePicker = true) {
    if (!MODE_IDS.includes(mode)) return;
    activeMode = mode;
    visibleAppIds = appIdsForMode(mode);
    ITEMS = mode === APP_MODES.ALL ? D.layout.pages.flat() : visibleAppIds.map(id => `app:${id}`);
    const dockRefs = mode === APP_MODES.ALL ? D.layout.dock : visibleAppIds.slice(0, 4).map(id => `app:${id}`);
    $("#dock").replaceChildren(...dockRefs.map(ref => make(ref, true)));
    modeButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.mode === mode)));
    modeLabel.textContent = modeButtons.find(button => button.dataset.mode === mode).querySelector(".mode-name").textContent;
    pageKey = "";
    cur = 0;
    if (persist) {
      try { localStorage.setItem("portal.mode", mode); } catch (e) {}
    }
    if (closePicker) modePicker.classList.remove("open");
    build(true);
  }

  modeButtons.forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));
  $("#modeChange").addEventListener("click", () => {
    closeAll();
    modePicker.classList.add("open");
    modeButtons[0].focus();
  });
  if (activeMode) setMode(activeMode, false);
  else setMode(APP_MODES.ALL, false, false);
  let rafBuild = 0;
  addEventListener("resize", () => {
    if (rafBuild) return;
    rafBuild = requestAnimationFrame(() => { rafBuild = 0; build(); });
  }, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => build(true));

  /* ================= 5. Vuốt / kéo chuột ================= */
  const screen = $("#screen");
  let sx = 0, sy = 0, down = false, dx = 0, rafDrag = 0;

  screen.addEventListener("pointerdown", e => {
    if (e.target.closest(".spot,.folder-view")) return;
    down = true; dragged = false; sx = e.clientX; sy = e.clientY; dx = 0;
  }, { passive: true });

  screen.addEventListener("pointermove", e => {
    if (!down) return;
    dx = e.clientX - sx;
    if (Math.abs(dx) <= 8) return;
    dragged = true;
    pager.classList.add("drag");
    // Gom về 1 lần ghi style mỗi khung hình (pointermove có thể bắn 120 lần/giây)
    if (rafDrag) return;
    rafDrag = requestAnimationFrame(() => {
      rafDrag = 0;
      pager.style.transform = `translateX(calc(${-cur * 100}% + ${dx}px))`;
    });
  }, { passive: true });

  const end = e => {
    if (!down) return;
    down = false;
    if (rafDrag) { cancelAnimationFrame(rafDrag); rafDrag = 0; }
    pager.classList.remove("drag");
    const dy = e.clientY - sy;
    if (dragged && Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); else go(cur);
    if (!dragged && dy > 60) openSpot();
    setTimeout(() => dragged = false, 0);
  };
  screen.addEventListener("pointerup", end); screen.addEventListener("pointercancel", end);
  screen.addEventListener("wheel", e => { if (Math.abs(e.deltaX) > 30) go(cur + (e.deltaX > 0 ? 1 : -1)); }, { passive: true });

  /* ================= 6. Thư mục ================= */
  const fv = $("#folderView");
  function openFolder(fid) {
    const f = D.folders[fid], g = $(".folder-grid", fv);
    $("h2", fv).textContent = f.name; g.replaceChildren(...f.apps.map(id => appItem(id)));
    fv.classList.add("open");
  }
  fv.addEventListener("click", e => { if (!e.target.closest(".folder-grid")) closeAll(); });

  /* ================= 7. Tìm kiếm ================= */
  const spot = $("#spot"), q = $("#q"), res = $("#results");
  const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Chuẩn hoá tên + URL một lần lúc khởi động, thay vì mỗi lần gõ phím
  const SEARCH = {};
  for (const id in D.apps) SEARCH[id] = norm(D.apps[id][0]) + " " + norm(D.apps[id][1]);

  function openSpot() { spot.classList.add("open"); q.value = ""; render(""); q.focus(); }

  function render(v) {
    const n = norm(v.trim());
    const ids = [];
    for (const id of visibleAppIds) if (!n || SEARCH[id].includes(n)) ids.push(id);
    res.replaceChildren(...(ids.length ? ids.map(id => appItem(id)) : [el("p", "hint", "Không tìm thấy ứng dụng nào.")]));
    sweep();
  }

  let inputTimer = 0;
  q.addEventListener("input", () => {
    clearTimeout(inputTimer);
    inputTimer = setTimeout(() => render(q.value), 110);
  });
  q.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    clearTimeout(inputTimer);
    render(q.value);
    const f = $(".item", res);
    if (f) f.click();
  });
  $("#searchBtn").onclick = openSpot;

  function closeAll() { fv.classList.remove("open"); spot.classList.remove("open"); q.blur(); }
  $("#homeBar").onclick = () => { closeAll(); go(0); };
  document.addEventListener("keydown", e => {
    if (modePicker.classList.contains("open")) return;
    if (e.key === "Escape") closeAll();
    if (spot.classList.contains("open")) return;
    if (e.key === "ArrowRight") go(cur + 1);
    if (e.key === "ArrowLeft") go(cur - 1);
    if (e.key === "/") { e.preventDefault(); openSpot(); }
  });

  /* ================= 8. Đồng hồ, hình nền ================= */
  const clock = $("#clock");
  let clockTimer = 0;
  const tick = () => {
    const d = new Date();
    const t = d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
    if (clock.textContent !== t) clock.textContent = t;
  };
  const startClock = () => { tick(); clearInterval(clockTimer); clockTimer = setInterval(tick, 15000); };
  startClock();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(clockTimer); else startClock();
  });

  let wp = S.wallpaperDefault;
  try { wp = +localStorage.getItem("portal.wp") || wp; } catch (e) {}
  const wall = $("#wall"), wallTop = $("#wallAlt");
  let wallNow = "";

  /* Chuyển nền bằng opacity trên lớp phủ. Trước đây animate `background` của
     gradient = repaint toàn màn hình ~30 khung hình. */
  function applyWp(animate) {
    const bg = S.wallpapers[wp];
    if (animate && wallNow) {
      wallTop.style.transition = "none";
      wallTop.style.background = wallNow;
      wallTop.style.opacity = "1";
      void wallTop.offsetWidth;                 // chốt trạng thái trước khi mờ dần
      wallTop.style.transition = "";
      wall.style.background = bg;
      requestAnimationFrame(() => { wallTop.style.opacity = "0"; });
    } else {
      wall.style.background = bg;
      wallTop.style.opacity = "0";
    }
    wallNow = bg;
    try { localStorage.setItem("portal.wp", wp); } catch (e) {}
  }

  /* Bấm thanh trạng thái = đổi hình nền */
  clock.parentElement.onclick = () => {
    wp = (wp + 1) % S.wallpapers.length;
    applyWp(true);
    say(`Hình nền ${wp + 1}/${S.wallpapers.length}`);
  };

  applyWp(false);
})();
