# Web Directory – cổng ứng dụng web kiểu iPhone

Chạy ứng dụng qua `localhost` (không cần build). Do dữ liệu được nạp bằng
`fetch()` từ JSON, không mở trực tiếp bằng `file://`. Để cài PWA và dùng ngoại
tuyến, cần mở qua HTTPS hoặc `localhost`.
- `manifest.webmanifest`, các kích thước `icon-*`, `apple-touch-icon.png`,
  `service-worker.js`  cài như app, chạy fullscreen và lưu giao diện ngoại tuyến

## Cấu trúc
- `index.html`      khung giao diện
- `css/style.css`   giao diện toàn màn hình (co giãn theo điện thoại / iPad / desktop)
- `data/portal.json` cấu hình chung, thư mục và bố cục
- `data/work.json`, `data/ai.json`, `data/shopping.json`,
  `data/entertainment.json`, `data/games.json` danh sách ứng dụng theo chế độ
- `data/custom-links.json` các website tự thêm bằng `linkmaker.js`
- `js/data-loader.js` nạp và ghép dữ liệu JSON trước khi mở ứng dụng
- `linkmaker.js` tạo entry JSON cho website mới
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

## Thêm một website
Chạy lệnh từ thư mục dự án, thay giá trị theo website muốn thêm:

```sh
node linkmaker.js --id myapp --name "Tên website" --url https://myapp.com --mode work
```

`--mode` nhận `work`, `ai`, `shopping`, `entertainment` hoặc `games`. Lệnh ghi website
vào `data/custom-links.json`; ứng dụng sẽ tự hiển thị trong chế độ tương ứng và
trong chế độ “Tất cả”. Có thể thêm `--icon https://...` hoặc `--slug ten-icon`
để chỉ định icon. Các file nhóm JSON gốc không bị thay đổi.

Mỗi app trong file nhóm là một object với thuộc tính có tên:

```json
{
  "myapp": {
    "name": "Tên website",
    "url": "https://myapp.com",
    "mode": "work"
  }
}
```

`icon`, `slug`, `bg` và `fit` là các thuộc tính tùy chọn cùng cấp với `name`,
`url` và `mode`.

## Icon
Icon thật lấy tự động theo thứ tự `settings.iconProviders` (favicon của Google → DuckDuckGo → Simple Icons).
Cần Internet. Muốn icon riêng: đặt thuộc tính `icon` trên app, ví dụ
`"icon": "assets/myapp.png"`.
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
