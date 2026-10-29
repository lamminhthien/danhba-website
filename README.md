# Web Directory – cổng ứng dụng web kiểu iPhone

Mở `index.html` bằng trình duyệt là chạy (không cần build, không cần server).
Mở `index.html` bằng trình duyệt là chạy (không cần build, không cần server). Để
cài PWA và dùng ngoại tuyến, cần mở qua HTTPS hoặc `localhost`.
- `manifest.webmanifest`, các kích thước `icon-*`, `apple-touch-icon.png`,
  `service-worker.js`  cài như app, chạy fullscreen và lưu giao diện ngoại tuyến

## Cấu trúc
- `index.html`      khung giao diện
- `css/style.css`   giao diện toàn màn hình (co giãn theo điện thoại / iPad / desktop)
- `js/data.js`      **PORTAL_DATA** – toàn bộ ứng dụng / thư mục / bố cục (sửa ở đây)
- `js/app.js`       logic (vuốt trang, thư mục, tìm kiếm, tải icon)
- `manifest.webmanifest`, `icon.svg`  cài như app để chạy fullscreen

## Toàn màn hình kiểu iPad
Giao diện phủ kín cửa sổ trình duyệt, không còn khung điện thoại giả:

- Điện thoại: 4 cột · iPad dọc: 6 cột · iPad ngang / desktop: 7–8 cột.
- Số trang và số icon mỗi trang **tự tính theo màn hình** (`js/app.js` đo chiều cao
  một hàng icon rồi nhân với số cột), nên lưới phủ kín chiều cao thay vì dừng ở
  2 hàng. `layout.pages` chỉ còn là danh sách phẳng theo thứ tự ưu tiên.
- Icon, dock, chữ tự co giãn theo kích thước màn hình.
- Hỗ trợ `safe-area-inset` cho tai thỏ và thanh home.
- Trên iPad/iPhone: mở bằng Safari → **Chia sẻ → Thêm vào MH chính** để chạy
  toàn màn hình không có thanh địa chỉ (manifest đặt `display: fullscreen`).
  Khi phát triển trên máy tính, chạy `python3 -m http.server 8000` rồi mở
  `http://localhost:8000`; khi triển khai, dùng HTTPS để service worker hoạt động.

## Thêm một ứng dụng
1. Trong `apps`: `myapp: ["Tên", "https://myapp.com"],`
2. Thêm id vào một thư mục (`folders.<x>.apps`) và/hoặc vào `layout.pages` / `layout.dock` dưới dạng `"app:myapp"`.

## Icon
Icon thật lấy tự động theo thứ tự `settings.iconProviders` (favicon của Google → DuckDuckGo → Simple Icons).
Cần Internet. Muốn icon riêng/offline: `{ icon: "assets/myapp.png" }` ở tuỳ chọn thứ 3 của app.
Nếu mọi nguồn lỗi, app hiện ô chữ cái đầu.

## Thao tác
Vuốt/kéo chuột hoặc phím ←/→ đổi trang · vuốt xuống hoặc phím `/` để tìm kiếm · bấm đồng hồ đổi hình nền · thanh dưới cùng về trang chủ · Esc đóng.

## Giao diện phẳng kiểu iOS 6 – chạy được trên máy yếu
Toàn bộ giao diện **không dùng `backdrop-filter` (kính mờ) và không đổ bóng mờ**.
Đó là hai thứ đắt nhất trên GPU phổ thông (Snapdragon 450, Helio G81…), nơi một
lớp blur toàn màn hình có thể kéo FPS xuống dưới 15. Thay vào đó:

- Dock: gradient xám đặc + viền 1px (kiểu thanh iOS 6).
- Thư mục / tìm kiếm / mở thư mục: nền tối đặc, không blur.
- Ô icon: chỉ một đường viền mảnh `inset 0 0 0 1px`, không bóng đổ.
- Không còn `filter: brightness()` khi nhấn (mỗi filter tạo một surface mới).

Nhờ vậy giao diện giữ nguyên bố cục và độ tương phản, nhưng chi phí vẽ gần như
chỉ còn là "tô màu" – hợp với máy 2GB RAM / GPU yếu.

## Tối ưu hiệu năng khác
- Icon chỉ được tải khi ô icon sắp vào khung nhìn (`IntersectionObserver`) → không
  còn hàng trăm request favicon ngay khi mở trang; kết quả được cache trong RAM,
  và trang kế bên được nạp trước khi máy rảnh.
- Bỏ `will-change` thường trực trên pager (trước đây giữ texture GPU rất lớn),
  chỉ bật lúc kéo; `contain: paint` cho từng trang.
- Kéo trang được gom vào `requestAnimationFrame`; `resize` được gộp khung hình và
  bỏ qua nếu kích thước không đổi.
- Chuyển hình nền bằng `opacity` trên lớp phủ thay vì animate `background`
  (animate gradient = repaint toàn màn hình mỗi khung hình).
- Tìm kiếm: chuẩn hoá tên/URL một lần lúc khởi động, debounce 110ms khi gõ.
- Đồng hồ dừng cập nhật khi tab bị ẩn.
