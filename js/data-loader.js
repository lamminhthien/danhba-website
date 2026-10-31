(() => {
  const files = ["portal", "work", "shopping", "entertainment", "games", "custom-links"];
  const load = name => fetch(`./data/${name}.json`).then(response => {
    if (!response.ok) throw new Error(`Could not load data/${name}.json (${response.status})`);
    return response.json();
  });

  Promise.all(files.map(load)).then(([portal, work, shopping, entertainment, games, custom]) => {
    const customApps = custom.apps || {};
    const pages = portal.layout.pages.map(page => page.slice());
    const customIds = Object.keys(customApps);
    if (customIds.length) pages.push(customIds.map(id => `app:${id}`));

    window.APP_MODES = Object.freeze(portal.modes);
    window.PORTAL_DATA = {
      settings: portal.settings,
      apps: Object.assign({}, work, shopping, entertainment, games, customApps),
      folders: portal.folders,
      layout: { ...portal.layout, pages }
    };

    const app = document.createElement("script");
    app.src = "./js/app.js";
    app.onerror = () => showError("Không thể tải ứng dụng. Hãy tải lại trang hoặc kiểm tra file js/app.js.");
    document.body.append(app);
  }).catch(error => {
    console.error(error);
    showError("Không thể tải dữ liệu JSON. Hãy chạy website qua localhost hoặc HTTPS.");
  });

  function showError(message) {
    const notice = document.createElement("p");
    notice.textContent = message;
    notice.style.cssText = "position:fixed;inset:1rem 1rem auto;padding:1rem;background:#fff;color:#222;z-index:9999";
    document.body.append(notice);
  }
})();