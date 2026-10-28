(() => {
  const D = PORTAL_DATA, S = D.settings;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ---------- Icon thật: thử lần lượt từng nguồn ---------- */
  const hue = s => [...s].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  function candidates(id) {
    const [, url, o = {}] = D.apps[id];
    const domain = new URL(url).hostname.replace(/^www\./, "");
    const list = [];
    if (o.icon) list.push({ src: o.icon, free: true });
    S.iconProviders.forEach((t, i) => list.push({
      src: t.replace("{url}", encodeURIComponent(url)).replace("{domain}", domain).replace("{slug}", o.slug || id),
      free: t.includes("simpleicons")
    }));
    return list;
  }
  function fillIcon(box, id) {
    const [name, , o = {}] = D.apps[id];
    const list = candidates(id);
    if (o.bg) box.style.background = o.bg;
    if (o.fit === "cover") box.classList.add("cover");
    const letter = () => {
      box.style.background = `hsl(${hue(name)} 55% 45%)`;
      box.innerHTML = `<span class="letter">${name[0].toUpperCase()}</span>`;
    };
    (function next(i) {
      if (i >= list.length) return letter();
      const img = new Image();
      img.alt = ""; img.draggable = false; img.decoding = "async";
      img.onload = () => { if (list[i].free || img.naturalWidth > 16) box.replaceChildren(img); else next(i + 1); };
      img.onerror = () => next(i + 1);
      img.src = list[i].src;
    })(0);
  }

  /* ---------- Thành phần ---------- */
  function open(id) { window.open(D.apps[id][1], S.openTarget, "noopener,noreferrer"); }

  function appItem(id, inFolder) {
    const b = el("button", "item"); b.title = D.apps[id][1];
    const t = el("div", "tile"); fillIcon(t, id);
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
  const make = ref => { const [k, id] = ref.split(":"); return k === "folder" ? folderItem(id) : appItem(id); };

  /* ---------- Trang chủ ---------- */
  const pager = $("#pager"), dots = $("#dots");
  let cur = 0, dragged = false;
  D.layout.pages.forEach((p, i) => {
    const pg = el("section", "page"); p.forEach(r => pg.append(make(r))); pager.append(pg);
    dots.append(el("i", i ? "" : "on"));
  });
  D.layout.dock.forEach(r => $("#dock").append(make(r)));

  function go(n) {
    cur = Math.max(0, Math.min(D.layout.pages.length - 1, n));
    pager.style.transform = `translateX(${-cur * 100}%)`;
    [...dots.children].forEach((d, i) => d.classList.toggle("on", i === cur));
  }

  /* Vuốt / kéo chuột */
  const screen = $("#screen"); let sx = 0, sy = 0, down = false, dx = 0;
  screen.addEventListener("pointerdown", e => { if (e.target.closest(".spot,.folder-view")) return; down = true; dragged = false; sx = e.clientX; sy = e.clientY; dx = 0; });
  screen.addEventListener("pointermove", e => {
    if (!down) return;
    dx = e.clientX - sx;
    if (Math.abs(dx) > 8) { dragged = true; pager.classList.add("drag"); pager.style.transform = `translateX(calc(${-cur * 100}% + ${dx}px))`; }
  });
  const end = e => {
    if (!down) return; down = false; pager.classList.remove("drag");
    const dy = e.clientY - sy;
    if (dragged && Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); else go(cur);
    if (!dragged && dy > 60) openSpot();
    setTimeout(() => dragged = false, 0);
  };
  screen.addEventListener("pointerup", end); screen.addEventListener("pointercancel", end);
  screen.addEventListener("wheel", e => { if (Math.abs(e.deltaX) > 30) go(cur + (e.deltaX > 0 ? 1 : -1)); }, { passive: true });

  /* ---------- Thư mục ---------- */
  const fv = $("#folderView");
  function openFolder(fid) {
    const f = D.folders[fid], g = $(".folder-grid", fv);
    $("h2", fv).textContent = f.name; g.replaceChildren(...f.apps.map(id => appItem(id)));
    fv.classList.add("open");
  }
  fv.addEventListener("click", e => { if (!e.target.closest(".folder-grid")) closeAll(); });

  /* ---------- Tìm kiếm ---------- */
  const spot = $("#spot"), q = $("#q"), res = $("#results");
  const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  function openSpot() { spot.classList.add("open"); q.value = ""; render(""); q.focus(); }
  function render(v) {
    const n = norm(v.trim());
    const ids = Object.keys(D.apps).filter(id => !n || norm(D.apps[id][0]).includes(n) || norm(D.apps[id][1]).includes(n));
    res.replaceChildren(...(ids.length ? ids.map(id => appItem(id)) : [el("p", "hint", "Không tìm thấy ứng dụng nào.")]));
  }
  q.addEventListener("input", () => render(q.value));
  q.addEventListener("keydown", e => { if (e.key === "Enter") { const f = $(".item", res); if (f) f.click(); } });
  $("#searchBtn").onclick = openSpot;

  function closeAll() { fv.classList.remove("open"); spot.classList.remove("open"); q.blur(); }
  $("#homeBar").onclick = () => { closeAll(); go(0); };
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAll();
    if (spot.classList.contains("open")) return;
    if (e.key === "ArrowRight") go(cur + 1);
    if (e.key === "ArrowLeft") go(cur - 1);
    if (e.key === "/") { e.preventDefault(); openSpot(); }
  });

  /* ---------- Đồng hồ, hình nền ---------- */
  const clock = $("#clock");
  const tick = () => { const d = new Date(); clock.textContent = d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0"); };
  tick(); setInterval(tick, 10000);

  let wp = S.wallpaperDefault;
  try { wp = +localStorage.getItem("portal.wp") || wp; } catch (e) {}
  const wall = $("#wall"), toast = $("#toast");
  const applyWp = (say) => {
    wall.style.background = S.wallpapers[wp];
    if (say) { toast.textContent = `Hình nền ${wp + 1}/${S.wallpapers.length}`; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 1200); }
    try { localStorage.setItem("portal.wp", wp); } catch (e) {}
  };
  clock.parentElement.onclick = () => { wp = (wp + 1) % S.wallpapers.length; applyWp(true); };
  applyWp(false);
})();
