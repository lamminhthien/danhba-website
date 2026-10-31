const fs = require("node:fs");
const path = require("node:path");

const dataDir = path.join(__dirname, "data");
const customPath = path.join(dataDir, "custom-links.json");
const modes = ["work", "ai", "shopping", "entertainment", "games"];

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function parseArgs(args) {
  const values = {};
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    if (!key.startsWith("--") || !args[index + 1] || args[index + 1].startsWith("--")) {
      throw new Error(`Thiếu giá trị hợp lệ cho ${key}`);
    }
    const name = key.slice(2);
    if (!["id", "name", "url", "mode", "icon", "slug", "is-free"].includes(name)) {
      throw new Error(`Tùy chọn không được hỗ trợ: ${key}`);
    }
    if (values[name]) throw new Error(`Tùy chọn bị lặp: ${key}`);
    values[name] = args[++index];
  }
  return values;
}

try {
  const values = parseArgs(process.argv.slice(2));
  for (const required of ["id", "name", "url", "mode"]) {
    if (!values[required]) throw new Error(`Thiếu --${required}`);
  }
  if (!/^[a-z0-9][a-z0-9_-]{0,39}$/.test(values.id)) {
    throw new Error("--id chỉ được chứa chữ thường, số, dấu gạch ngang hoặc gạch dưới.");
  }
  if (!modes.includes(values.mode)) {
    throw new Error(`--mode phải là một trong: ${modes.join(", ")}`);
  }
  if (values["is-free"] !== undefined && !["true", "false"].includes(values["is-free"])) {
    throw new Error("--is-free phải là true hoặc false.");
  }

  const url = new URL(values.url);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
    throw new Error("--url phải là địa chỉ HTTP/HTTPS hợp lệ và không chứa thông tin đăng nhập.");
  }
  if (values.icon && !/^https:\/\//i.test(values.icon)) {
    throw new Error("--icon phải là URL HTTPS.");
  }
  if (values.slug && !/^[a-z0-9-]+$/.test(values.slug)) {
    throw new Error("--slug chỉ được chứa chữ thường, số và dấu gạch ngang.");
  }

  const builtInApps = modes.flatMap(mode => {
    const file = path.join(dataDir, `${mode}.json`);
    return fs.existsSync(file) ? Object.keys(JSON.parse(fs.readFileSync(file, "utf8"))) : [];
  });
  if (builtInApps.includes(values.id)) throw new Error(`ID đã có trong dữ liệu gốc: ${values.id}`);

  const custom = JSON.parse(fs.readFileSync(customPath, "utf8"));
  if (!custom.apps || typeof custom.apps !== "object" || Array.isArray(custom.apps)) {
    throw new Error("Cấu trúc data/custom-links.json không hợp lệ.");
  }
  if (Object.hasOwn(custom.apps, values.id)) throw new Error(`ID đã tồn tại trong custom-links.json: ${values.id}`);

  const app = { name: values.name, url: url.href, mode: values.mode };
  if (values["is-free"] !== undefined) app.isFree = values["is-free"] === "true";
  if (values.icon) app.icon = values.icon;
  if (values.slug) app.slug = values.slug;
  custom.apps[values.id] = app;
  fs.writeFileSync(customPath, `${JSON.stringify(custom, null, 2)}\n`);
  console.log(`Đã thêm ${values.name} vào data/custom-links.json`);
} catch (error) {
  fail(`${error.message}\nDùng: node linkmaker.js --id id --name "Tên" --url https://example.com --mode work [--is-free true|false] [--icon https://...] [--slug ten-icon]`);
}