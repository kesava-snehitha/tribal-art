# 🏺 TribalArt: Full-Stack E-Commerce & Cultural Platform

TribalArt is a premium, full-stack web application designed to empower tribal artisans by providing a direct-to-consumer marketplace. It combines standard e-commerce functionality with immersive cultural experiences.

---

## 🚀 Pin-to-Pin Feature Breakdown

### 1. Immersive Discovery Features (Unique)
- **Virtual Exhibition (`/exhibition`)**: A scroll-driven, museum-grade storytelling experience. It uses high-end CSS transitions and viewport snapping to showcase tribal art forms as "exhibits" rather than just products.
- **Custom Commissioning (`/commission`)**: A bespoke service where clients can request custom artwork directly from artisans by specifying dimensions, materials, and budgets.

### 2. Marketplace & Cart
- **Dynamic Product Cards**: Each product card features a real-time **Quantity Selector**, allowing users to specify exact amounts before adding to cart.
- **Backend-Driven Calculations**: All pricing logic (Subtotal, 18% GST, Shipping) has been migrated from the frontend to the **Spring Boot Backend** to ensure data integrity and security.
- **Persistent Cart**: Works with local state but calculates against real-time backend logic.

### 3. User Personalization & Dashboard
- **Individual Data Ownership**: Each user has a unique dashboard that fetches their specific:
    - **My Orders**: Real-time order tracking and history saved in the MySQL database.
    - **Wishlist**: Personalized collection of favorite items persisted on the server.
    - **Product Reviews**: Customer feedback tied specifically to the user's account and products.
- **Role-Based Access**: Specialized dashboards for Customers, Artisans, and Admins.

---

## 🛠️ Technical Stack

- **Frontend**: React.js (Vite)
- **Styling**: Vanilla CSS (Custom premium design system)
- **Backend**: Java Spring Boot
- **Database**: MySQL
- **Security**: Spring Security with JWT/Session support
- **Persistence**: Hibernate / Spring Data JPA

---

## 📂 Project Structure Explained

### `/frontend`
- **`src/components/`**: Reusable UI elements like `Navigation`, `ProductCard`, and `Footer`.
- **`src/pages/`**: Main page views including `CustomerDashboard`, `Cart`, `Checkout`, and `VirtualExhibition`.
- **`src/App.jsx`**: Main router and global state management for the user and cart.

### `/backend`
- **`model/`**: Java classes mapping to MySQL tables (`User`, `Product`, `Order`, `Review`, `Wishlist`).
- **`repository/`**: Interfaces for database operations using Spring Data JPA.
- **`controller/`**: REST API endpoints:
    - `CartController`: Handles pricing logic.
    - `DashboardController`: Fetches user-specific data.
    - `OrderController`: Manages the checkout and order placement.
    - `WishlistController`: Handles server-side wishlist management.

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js & npm
- Java JDK 17+
- MySQL Server

### 2. Backend Setup
1. Configure your MySQL credentials in `backend/src/main/resources/application.properties`.
2. Run the backend:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

### 3. Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🛡️ Database Schema (Entities)
- **User**: Stores profile, credentials, and user role.
- **Product**: Details about the tribal art pieces.
- **Order / OrderItem**: Links users to their purchased products with calculated totals.
- **Review**: Star ratings and feedback text per product per user.
- **WishlistItem**: Maps users to their "saved for later" products.

---

## 📈 Recent Enhancements
- ✅ Migration of business logic to backend controllers.
- ✅ Implementation of JPA relationships for user-specific data.
- ✅ Added "Virtual Exhibition" for immersive storytelling.
- ✅ Integrated SSH/HTTPS for secure GitHub deployment.
