# Furniture eCommerce

A full-stack furniture eCommerce application built with **Next.js**, **NestJS**, and **MongoDB**. The project provides a modern shopping experience with product browsing, filtering, authentication, cart management.

### Customer

* Browse products
* Search products by name, SKU, category, or description
* Filter products by configuration
* Sort products by:
  * Name
  * Price
  * Date
* Product details page
* Shopping cart
* Secure checkout
* Payments with Stripe Checkout
* PayPal payment support
* User authentication with Google OAuth
* Responsive design

---

## Tech Stack

### Frontend

* Next.js 15
* TypeScript
* Redux Toolkit
* Axios
* Formik
* Tailwind CSS
* SCSS Modules

### Backend

* NestJS
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* Google OAuth 2.0
* Multer
* Nodemailer
* Stripe
* PayPal Checkout

---

## Project Structure

```
client/
├── src/
│   ├── app/
│   ├── components/
│   ├── redux/
│   ├── services/
│   ├── styles/
│   └── types/

server/
├── src/
│   ├── auth/
│   ├── products/
│   ├── users/
│   ├── uploads/
│   └── common/
```

---

## Installation

1. Clone repository

```bash
https://github.com/Inlvert/inlvert-Furniture-eCommerce.git
```

2. Navigate to the project directory:

```bash
cd inlvert-Furniture-eCommerce
```
---

## Install dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd server
npm install
```
---

## Environment Variables

### Client (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Server (.env)

```env
JWT_SECRET=your_jwt_secret_key_here
DB_CONNECTION=
JWT_EXPIRES_IN=1d
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
FRONTEND_OAUTH_REDIRECT=http://localhost:3000/login
FRONTEND_BASE_URL=http://localhost:3000

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_ENV=sandbox

GOOGLE_CLIENT_ID_NODEMAILER=
GOOGLE_CLIENT_SECRET_NODEMAILER=
GOOGLE_REDIRECT_URI_NODEMAILER=https://developers.google.com/oauthplayground/
GOOGLE_REFRESH_TOKEN_NODEMAILER=
GOOGLE_MAIL_USER_NODEMAILER=yourmail@gmail.com
```
---

## Run project

### Backend

```bash
npm run start:dev
```

### Frontend

```bash
npm run dev
```

Frontend:

```
http://localhost:3000
```

Backend:

```
http://localhost:5000
```

---

## Product API

### Get products

```
GET /products
```

### Query Parameters

| Parameter     | Description           |
| ------------- | --------------------- |
| page          | Current page          |
| limit         | Products per page     |
| sort          | Sort order            |
| search        | Search text           |
| configuration | Product configuration |

---

## Authentication

* JWT Authentication
* Google OAuth 2.0
* Protected Routes

---

## Search

Products can be searched by:

* Name
* SKU
* Category
* Description

---

## Sorting

Supported sorting options:

* Name (A-Z)
* Name (Z-A)
* Price (Low → High)
* Price (High → Low)
* Date (Newest)
* Date (Oldest)

---

## Filtering

Products can be filtered by configuration, for example:

* L-Shaped
* 2-Seater
* 3-Seater

Filters can be combined with search and sorting.

---

## License

MIT License
