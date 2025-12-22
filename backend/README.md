# 🛒 Store Inventory Management API

Hệ thống Backend RESTful API chuyên nghiệp để quản lý kho hàng, sản phẩm và danh mục cho cửa hàng bán lẻ. Dự án được xây dựng dựa trên kiến trúc phân lớp (Layered Architecture), tối ưu hóa khả năng mở rộng, bảo mật và dễ bảo trì.

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

* **Core:** Node.js, TypeScript, Express.js
* **Database:** PostgreSQL (chạy trên Docker)
* **ORM:** Prisma (Version 5) - Quản lý Schema và Migration
* **Authentication:** JWT (JSON Web Token), Bcryptjs (Mã hóa mật khẩu)
* **Validation:** Class-validator, Class-transformer (Kiểm tra dữ liệu đầu vào)
* **Security:** Helmet (Bảo mật HTTP Header), CORS
* **Tools:** Docker Compose, Nodemon, Postman

---

## 📂 Cấu Trúc Dự Án (Project Structure)

Dự án tuân thủ mô hình **Controller - Service - Repository** để tách biệt trách nhiệm:

```text
root/
├── docker-compose.yml    # Cấu hình container PostgreSQL
├── package.json          # Quản lý dependencies và scripts
├── tsconfig.json         # Cấu hình TypeScript
├── prisma/
│   ├── schema.prisma     # Định nghĩa Database Schema (User, Category, Product)
│   └── migrations/       # Lịch sử thay đổi Database
├── src/
│   ├── config/           # Cấu hình môi trường (Environment variables)
│   ├── controllers/      # Tiếp nhận Request, trả về Response (Giao tiếp với Client)
│   ├── services/         # Xử lý Logic nghiệp vụ chính (Business Logic)
│   ├── routes/           # Định nghĩa các API Endpoints
│   ├── middleware/       # Xử lý trung gian (Auth Guard, Validation, Error Handling)
│   ├── validation/       # Định nghĩa luật kiểm tra dữ liệu (DTOs)
│   ├── utils/            # Các hàm tiện ích dùng chung
│   └── server.ts         # Entry point - Khởi chạy Server

🛠️ Hướng Dẫn Cài Đặt (Installation)
Yêu cầu: Máy tính đã cài đặt Node.js và Docker Desktop.

Bước 1: Clone dự án
Bash

git clone <link-repo-cua-ban>
cd store-inventory-api
Bước 2: Cài đặt thư viện
Bash

npm install
Bước 3: Cấu hình môi trường
Tạo file .env tại thư mục gốc và điền các thông số sau:

# Server Port
PORT=3000

# Database Connection (Khớp với docker-compose.yml)
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=public"

# JWT Secret Key (Dùng để ký Token)
JWT_SECRET="cum_tu_bi_mat_khong_duoc_tiet_lo_123456"

Bước 4: Khởi chạy Database
Sử dụng Docker để bật PostgreSQL:

Bash

docker-compose up -d
Bước 5: Đồng bộ Database (Migration)
Chạy lệnh này để Prisma tạo các bảng (User, Category, Product) vào Database:

Bash

npx prisma migrate dev --name init
Bước 6: Chạy Server
Môi trường Dev (Development):

Bash

npm run dev
Môi trường Production (Build):

Bash

npm run build
npm start
Server sẽ hoạt động tại: http://localhost:3000

📡 Tài Liệu API (API Documentation)
1. Authentication (Xác thực)
POST /api/auth/register: Đăng ký tài khoản mới (Body: email, password, fullName).

POST /api/auth/login: Đăng nhập lấy Token.

2. Categories (Danh mục)
GET /api/categories: Xem danh sách danh mục (Public).

POST /api/categories: Tạo danh mục mới 🔒 (Yêu cầu Token).

PUT /api/categories/:id: Cập nhật danh mục 🔒 (Yêu cầu Token).

DELETE /api/categories/:id: Xóa danh mục 🔒 (Yêu cầu Token - Chỉ xóa được khi rỗng).

3. Products (Sản phẩm)
GET /api/products: Xem danh sách sản phẩm.

Hỗ trợ tìm kiếm: /api/products?search=iphone

GET /api/products/:id: Xem chi tiết sản phẩm.

POST /api/products: Thêm sản phẩm mới 🔒 (Yêu cầu Token + Validate dữ liệu).

PUT /api/products/:id: Sửa thông tin sản phẩm 🔒 (Yêu cầu Token).

DELETE /api/products/:id: Xóa sản phẩm 🔒 (Yêu cầu Token).

🧪 Công Cụ Quản Lý Dữ Liệu
Dự án tích hợp sẵn Prisma Studio (Giao diện GUI quản lý DB). Chạy lệnh sau để mở:

Bash

npx prisma studio
Truy cập: http://localhost:5555