# WebPhone – cổng ứng dụng web kiểu iPhone

Mở `index.html` bằng trình duyệt là chạy (không cần build, không cần server).

## Cấu trúc
- `index.html`      khung giao diện
- `css/style.css`   giao diện toàn màn hình (co giãn theo điện thoại / iPad / desktop)
- `js/data.js`      **PORTAL_DATA** – toàn bộ ứng dụng / thư mục / bố cục (sửa ở đây)
- `js/app.js`       logic (vuốt trang, thư mục, tìm kiếm, tải icon)
- `manifest.webmanifest`, `icon.svg`  cài như app để chạy fullscreen

## Toàn màn hình kiểu iPad
Giao diện phủ kín cửa sổ trình duyệt, không còn khung điện thoại giả:

- Điện thoại: 4 cột · iPad dọc: 6 cột · iPad ngang / desktop: 7–8 cột.
- Icon, dock, chữ tự co giãn theo kích thước màn hình.
- Hỗ trợ `safe-area-inset` cho tai thỏ và thanh home.
- Trên iPad/iPhone: mở bằng Safari → **Chia sẻ → Thêm vào MH chính** để chạy
  toàn màn hình không có thanh địa chỉ (manifest đặt `display: fullscreen`).

## Thêm một ứng dụng
1. Trong `apps`: `myapp: ["Tên", "https://myapp.com"],`
2. Thêm id vào một thư mục (`folders.<x>.apps`) và/hoặc vào `layout.pages` / `layout.dock` dưới dạng `"app:myapp"`.

## Icon
Icon thật lấy tự động theo thứ tự `settings.iconProviders` (favicon của Google → DuckDuckGo → Simple Icons).
Cần Internet. Muốn icon riêng/offline: `{ icon: "assets/myapp.png" }` ở tuỳ chọn thứ 3 của app.
Nếu mọi nguồn lỗi, app hiện ô chữ cái đầu.

## Thao tác
Vuốt/kéo chuột hoặc phím ←/→ đổi trang · vuốt xuống hoặc phím `/` để tìm kiếm · bấm đồng hồ đổi hình nền · thanh dưới cùng về trang chủ · Esc đóng.
