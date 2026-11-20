# HƯỚNG DẪN CÀI APP "SỔ KỶ NIỆM A12"

Kết quả: một đường link dạng `https://ten-cua-ban.github.io/so-ky-niem/`. Mở trên điện thoại → thêm vào màn hình chính → có **biểu tượng A12**, bấm vào **mở toàn màn hình như app**. Ai có link đều xem được; chỉ bạn (đăng nhập) mới sửa được.

Thời gian: khoảng 30–45 phút. Làm trên **máy tính** cho dễ.

## Các file trong thư mục

| File | Dùng để |
|---|---|
| `index.html` | Toàn bộ app |
| `firebase-config.js` | **Bạn sửa**: thông tin máy chủ Firebase + email chủ sổ |
| `firestore.rules` | **Bạn sửa email** rồi dán vào Firebase (quy tắc bảo mật) |
| `manifest.webmanifest` | Cho điện thoại biết tên app, logo, mở toàn màn hình |
| `sw.js` | Service worker: app mở nhanh, mất mạng vẫn xem được |
| `icons/` | Logo A12 các cỡ |

---

## PHẦN A — Tạo máy chủ Firebase (miễn phí)

Giao diện Firebase là tiếng Anh, mình ghi đúng chữ trên màn hình.

1. Vào **console.firebase.google.com**, đăng nhập Google.
2. Bấm **Create a project** (Tạo dự án) → đặt tên `so-ky-niem-a12` → **Continue** → tắt **Google Analytics** → **Create project**.
3. **Tạo kho dữ liệu (Firestore):**
   - **Tìm trang Firestore** — chọn một trong 3 cách (giao diện Firebase hay đổi vị trí menu):
     - **Cách chắc chắn nhất:** dán địa chỉ `https://console.firebase.google.com/project/TEN-DU-AN/firestore` vào thanh địa chỉ, thay `TEN-DU-AN` bằng **Project ID** (dòng chữ nhỏ dưới tên dự án, hoặc trong địa chỉ trang hiện tại sau chữ `/project/`).
     - **Ô tìm kiếm** trên cùng của Firebase: gõ `Firestore` → chọn **Firestore Database** (hoặc **Cloud Firestore**).
     - **Menu trái:** mở nhóm **Build** (có thể tên **Databases & Storage** / **Xây dựng** / **Cơ sở dữ liệu**; nếu menu bị thu gọn bấm ☰ hoặc **All products / Tất cả sản phẩm**) → **Firestore Database**.
   - Bấm **Create database** → chọn vị trí `asia-southeast1 (Singapore)` → chọn **Start in production mode** → **Create**.
   - Nếu được hỏi chọn **Standard edition / Enterprise edition**: chọn **Standard**.
4. **Dán quy tắc bảo mật:**
   - Mở file `firestore.rules`, đổi `email-cua-ban@gmail.com` thành email bạn sẽ dùng làm chủ sổ (viết thường).
   - Trong Firestore bấm tab **Rules**, xóa hết chữ cũ, dán toàn bộ nội dung file vào → **Publish**.
5. **Bật đăng nhập:** mở trang Authentication (dán `https://console.firebase.google.com/project/TEN-DU-AN/authentication`, hoặc gõ `Authentication` vào ô tìm kiếm) → **Get started** → tab **Sign-in method** → chọn **Email/Password** → bật công tắc đầu tiên → **Save**.
6. **Tạo tài khoản chủ sổ:** tab **Users** → **Add user** → nhập email (trùng email ở bước 4) và một mật khẩu mạnh → **Add user**.
7. **Lấy thông tin kết nối:** bấm ⚙️ cạnh **Project Overview** → **Project settings** → kéo xuống **Your apps** → bấm biểu tượng **`</>`** (Web) → đặt tên `a12` → **Register app** (không tick Firebase Hosting). Màn hình hiện đoạn `const firebaseConfig = { ... }`.
8. Mở file `firebase-config.js` bằng VS Code:
   - Thay phần trong `window.FIREBASE_CONFIG = { ... }` bằng các dòng `apiKey`, `authDomain`, `projectId`... vừa copy.
   - Sửa `window.OWNER_EMAILS = ["email-cua-ban@gmail.com"]` thành email chủ sổ.
   - Lưu file.

> `apiKey` của Firebase không phải mật khẩu, để công khai không sao. Thứ bảo vệ dữ liệu là **Rules** ở bước 4.

## PHẦN B — Đưa app lên mạng bằng GitHub Pages (miễn phí)

1. Vào **github.com**, tạo tài khoản (nhớ tên tài khoản, ví dụ `lop12a1`).
2. Bấm **+** (góc trên phải) → **New repository** → tên `so-ky-niem` → chọn **Public** → **Create repository**.
3. Bấm link **uploading an existing file** → kéo thả **tất cả file và thư mục `icons`** vào → kéo xuống bấm **Commit changes**.
4. Vào **Settings** (của repository) → menu trái **Pages** → ở **Branch** chọn `main` và `/ (root)` → **Save**.
5. Đợi 1–2 phút, tải lại trang Pages sẽ thấy link: `https://lop12a1.github.io/so-ky-niem/`.
6. (Để chắc chắn) Firebase → **Authentication → Settings → Authorized domains → Add domain** → nhập `lop12a1.github.io`.

Mở link trên máy tính: thấy "Sổ còn trống" là đã nối máy chủ thành công. Bấm **🔒 Đăng nhập**, nhập email + mật khẩu ở PHẦN A bước 6.

## PHẦN C — Cài lên điện thoại

**iPhone (iOS 26 trở lên):** mở link bằng **Safari** → bấm **⋯** cạnh thanh địa chỉ → **Chia sẻ** → **Thêm vào Màn hình chính** → để **bật** "Mở dưới dạng ứng dụng web" → **Thêm**.
(iOS cũ hơn: nút Chia sẻ ở thanh dưới → Thêm vào MH chính; app vẫn mở toàn màn hình vì đã có manifest.)

**Android:** mở link bằng **Chrome** → **⋮** → **Cài đặt ứng dụng** (hoặc **Thêm vào màn hình chính**).

Gửi link cho cả lớp, mỗi người tự làm bước này là có app A12.

## PHẦN D — Đưa kỷ niệm cũ vào app

1. Mở bản cũ (file trên máy hoặc link claude.ai) → **💾 Sao lưu** → tải file `.json`.
2. Mở app mới → **🔒 Đăng nhập** → **💾 Sao lưu** → **Chọn file .json để nhập**.

## Sửa app về sau

1. Sửa file trên máy.
2. Mở file `sw.js`, đổi `so-ky-niem-a12-v1` thành `v2` (lần sau `v3`...) để điện thoại tải bản mới.
3. Lên GitHub repository → **Add file → Upload files** → kéo file đã sửa vào → **Commit changes**.

## Lưu ý

- **Ảnh** được nén (rộng tối đa 900px) và lưu luôn trong kỷ niệm. Ảnh quá nặng sẽ báo lỗi, hãy chọn ảnh nhỏ hơn.
- **Trợ lý AI:** người xem dùng chế độ cơ bản. Chủ sổ muốn AI thông minh thì bấm ⚙️ trong khung chat, dán API key Claude — key chỉ lưu trên máy của bạn, **không** nằm trong code.
- **Không bao giờ** đưa API key Claude hay mật khẩu vào file trên GitHub (ai cũng xem được).
- Gói miễn phí của Firebase đủ dùng cho một lớp. Nếu báo "hết hạn mức", đợi qua ngày.

## Lỗi thường gặp

| Hiện tượng | Cách sửa |
|---|---|
| Nút ghi "Trên máy này", không có Đăng nhập | `firebase-config.js` chưa điền đúng (vẫn còn chữ `DAN_...`) |
| "Máy chủ chưa cho phép đọc dữ liệu" | Chưa **Publish** Rules ở PHẦN A bước 4 |
| Đăng nhập được nhưng báo "không phải chủ sổ" | Email trong `OWNER_EMAILS` khác email đăng nhập |
| Lưu bị "Máy chủ từ chối" | Email trong `firestore.rules` khác email đăng nhập |
| Link GitHub báo 404 | Đợi thêm vài phút; kiểm tra file `index.html` nằm ngay thư mục gốc |
| Sửa code xong điện thoại vẫn bản cũ | Chưa đổi số phiên bản trong `sw.js`; đóng hẳn app rồi mở lại |
