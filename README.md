# IndiCart

**IndiCart** is a full-stack grocery delivery web application built to provide a seamless online shopping experience for users and efficient product and order management for sellers.

It supports user and admin roles, secure authentication, and multiple payment options including Cash on Delivery (COD) and Stripe integration.

---

## **Features**

### **User**

* Browse grocery products
* Add items to cart
* Place orders using:

  * Cash on Delivery (COD)
  * Stripe (Online Payment)
* Secure login and session handling

### **Seller (Admin)**

* Add new products
* View and manage product list
* Update product stock availability
* View all orders
* Update order status
* Dashboard for overall management

### **System**

* JWT authentication with cookies
* Secure API routes
* Stripe payment integration
* Cloudinary for image storage
* Role-based access control

---

## **Tech Stack**

### **Frontend**

* React (Vite)
* Tailwind CSS
* Lucide React

### **Backend**

* Node.js
* Express.js

### **Database**

* MongoDB

### **Authentication**

* JWT with cookies

### **Payments**

* Stripe and COD

---

## **Project Structure**

### **Backend (`server/`)**

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

### **Frontend (`client/`)**

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
│   ├── index.css
│   └── main.jsx
├── .env.example
```

---

## **Environment Variables**

### **Backend (`.env`)**

```
PORT=5000
NODE_ENV=development

MONGODB_URI=

CLIENT_URL=http://localhost:5173

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

### **Frontend (`.env`)**

```
VITE_CURRENCY=
VITE_SERVER_URL=
```

---

## **Getting Started**

### **1. Clone the Repository**

```
git clone https://github.com/baibhavsinhadev/indicart.git
cd indicart
```

### **2. Setup Backend**

```
cd server
npm install
npm run server
```

### **3. Setup Frontend**

```
cd client
npm install
npm run dev
```

---

## **API Structure**

* Base URL:

```
/api
```

* REST-based architecture
* Protected routes using JWT
* Role-based middleware

---

## **Security**

* JWT-based authentication
* Secure cookies for session handling
* Protected API routes
* Environment-based configuration

---

## **Important Notes**

* Use MongoDB Atlas or a local MongoDB instance
* Ensure environment variables are properly configured
* Stripe keys are required for online payments
* Backend and frontend must run simultaneously

---

## **Future Improvements (Optional)**

* Order tracking system
* Email notifications
* UI/UX enhancements
* Improved mobile responsiveness

---

## **Contributing**

Contributions are welcome. Feel free to fork the repository and submit a pull request.

---

## **License**

This project is open-source and available under the MIT License.

---

## **Author**

Built as a full-stack project focused on solving real-world grocery delivery use cases with scalable architecture.

---

## Inspiration

This project is inspired by the work and tutorials of GreatStack.

IndiCart was built independently as a portfolio project, with additional features, architectural decisions, and enhancements tailored for real-world use cases such as role-based access, background job processing, and automated workflows.

The goal was not just to follow along, but to extend the concept into a more complete and production-oriented system.