# IndiCart

**IndiCart** is a full-stack grocery delivery web application built to provide a seamless online shopping experience for users and efficient product/order management for sellers.

It supports **user & admin roles,** secure authentication, and multiple payment options including **Cash on Delivery (COD)** and **Stripe integration**.

---

## Features

### User

* Browse grocery products
* Add items to cart
* Place orders using:
  * Cash on Delivery (COD)
  * Stripe (Online Payment)
* Secure login & session handling

### Admin (Seller)

* Add new products
* View and manage product list
* Update product stock availability
* View all orders
* Update order status
* Dashboard for overall management

### System Features

* JWT Authentication with Cookies
* Secure API routes
* Stripe payment integration
* Cloudinary for image storage
* Role-based access control

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Stripe

### Frontend

* React (Vite)

---

## Project Structure

### Backend (`server/`)

```
server/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── .env.example
├── package.json
└── server.js
```

### Frontend (`client/`)

```
client/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   ├── .env.example
│   ├── index.css
│   └── main.jsx
```

---

## ⚙️ Environment Variables

### Backend (`.env`)

```
PORT=5000
NODE_ENV=development

MONGODB_URI=

CLIENT_URL=

JWT_SECRET= 

SELLER_EMAIL= 
SELLER_PASSWORD= 

CLOUDINARY_CLOUD_NAME= 
CLOUDINARY_API_KEY= 
CLOUDINARY_API_SECRET= 

STRIPE_PUBLISHABLE_KEY= 
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Frontend (`.env`)

```
VITE_CURRENCY= 
VITE_SERVER_URL=
```

---

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/baibhavsinhadev/quickems.git
cd quickems
```

---

### 2. Setup Backend

```
cd server
npm install
npm run server
```

Or using nodemon:

```
nodemon server.js
```

---

### 3. Setup Frontend

```
cd client
npm install
npm run dev
```

---

## API Structure

* Base URL:

```
/api
```

* REST-based architecture
* Protected routes using JWT
* Role-based middleware:

  * `protect` → for authenticated users
  * `protectAdmin` → for admin-only access

---

## Security

QuickEMS follows best practices to ensure backend security:

* HTTP headers secured using Helmet
* NoSQL injection protection via Mongo Sanitize
* XSS protection using xss-clean
* API rate limiting
* Request logging with Morgan

---

## Email System

Email notifications are powered by Nodemailer using Gmail SMTP.

> ⚠️ Make sure to use a **Gmail App Password** instead of your real password.

---

## Background Jobs

Background processing is handled using Inngest:

* Scheduled cron jobs (attendance reminders, auto check-out)
* Event-driven workflows (leave notifications, alerts)

---

## Important Notes

* Use **MongoDB Atlas** or local MongoDB instance
* Ensure `.env` is properly configured before running
* Gmail SMTP requires App Password
* Backend and frontend must run simultaneously

---

## Future Improvements (Optional)

* Mobile responsiveness enhancements
* Advanced analytics dashboard
* Multi-company support
* Role expansion (HR, Manager, etc.)

---

## Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## License

This project is open-source and available under the MIT License.

---

## Author

Built with focus and clarity to solve real-world employee management problems.

## Inspiration

This project is inspired by the work and tutorials of GreatStack.

QuickEMS was built independently as a portfolio project, with additional features, architectural decisions, and enhancements tailored for real-world use cases such as role-based access, background job processing, and automated workflows.

The goal was not just to follow along, but to extend the concept into a more complete and production-oriented system.
