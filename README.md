# WebPhone – cổng ứng dụng web kiểu iPhone

Mở `index.html` bằng trình duyệt là chạy (không cần build, không cần server).

## Cấu trúc
- `index.html`      khung giao diện
- `css/style.css`   giao diện iPhone
- `js/data.js`      **PORTAL_DATA** – toàn bộ ứng dụng / thư mục / bố cục (sửa ở đây)
- `js/app.js`       logic (vuốt trang, thư mục, tìm kiếm, tải icon)

## Thêm một ứng dụng
1. Trong `apps`: `myapp: ["Tên", "https://myapp.com"],`
2. Thêm id vào một thư mục (`folders.<x>.apps`) và/hoặc vào `layout.pages` / `layout.dock` dưới dạng `"app:myapp"`.

## Icon
Icon thật lấy tự động theo thứ tự `settings.iconProviders` (favicon của Google → DuckDuckGo → Simple Icons).
Cần Internet. Muốn icon riêng/offline: `{ icon: "assets/myapp.png" }` ở tuỳ chọn thứ 3 của app.
Nếu mọi nguồn lỗi, app hiện ô chữ cái đầu.

## Thao tác
Vuốt/kéo chuột hoặc phím ←/→ đổi trang · vuốt xuống hoặc phím `/` để tìm kiếm · bấm đồng hồ đổi hình nền · thanh dưới cùng về trang chủ · Esc đóng.
