# Value Bid

Value Bid is a professional real-time auction platform where users can list items, place bids, and manage auctions seamlessly. Built with a modern tech stack, it provides a secure and responsive experience for both buyers and sellers.

## 🚀 Tech Stack

### Frontend

- **Framework:** React 19
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM 7
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Icons:** React Icons

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Token (JWT) & bcrypt
- **File Storage:** Cloudinary
- **Automation:** Node-cron (for ending auctions and commission verification)
- **Email:** Nodemailer

## ✨ Features

- **Real-time Bidding:** Seamlessly place and track bids on auction items.
- **Auction Management:** Create, update, delete, and republish auctions.
- **User Dashboard:** Track your auctions, bids, and won items.
- **Admin Panel:** Comprehensive controls for managing users and platform data.
- **Automated Tasks:** Automatic auction ending and commission tracking.
- **Secure Authentication:** Robust user login and registration system.
- **File Uploads:** Image support for auction items via Cloudinary.

## 🛠️ Project Structure

```text
ValueBid/
├── backend/            # Express.js API
│   ├── src/
│   │   ├── automation/   # Cron jobs
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Mongoose schemas
│   │   ├── router/       # API endpoints
│   │   └── utils/        # Helpers
├── frontend/
│   └── auction-bid/    # React application
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── store/     # Redux slices
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18+)
- MongoDB connection string
- Cloudinary account
- SMTP service (e.g., Gmail)

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   COOKIE_EXPIRE=7
   FRONTEND_URL=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_MAIL=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/auction-bid
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `frontend/auction-bid`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📜 Scripts

### Backend

- `npm start`: Runs the production server.
- `npm run dev`: Runs the server with Nodemon for development.
- `npm run prod`: Runs the server in production mode.

### Frontend

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Checks for linting errors.

## 🚀 Quick Start

For a quick setup, run the setup script:

**Windows:**

```bash
setup.bat
```

**Linux/Mac:**

```bash
chmod +x setup.sh
./setup.sh
```

This will:

- Check Node.js and npm installation
- Install all dependencies
- Create `.env` files from examples
- Provide next steps

## 📦 Deployment

Ready to deploy? We've got you covered with comprehensive guides:

### Deployment Options

1. **Platform as a Service (PaaS)** - Easiest option
   - Render (Recommended for beginners)
   - Railway
   - Vercel (Frontend) + Railway (Backend)
   - Heroku

2. **Docker** - Containerized deployment
   - Docker Compose (local/VPS)
   - Docker Swarm
   - Kubernetes

3. **Virtual Private Server (VPS)** - Full control
   - DigitalOcean
   - AWS EC2
   - Google Cloud Platform
   - Azure


### Quick Deploy Links

- **Deploy Backend to Render:** [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)
- **Deploy Frontend to Vercel:** [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Environment variable configuration
- Secure file uploads via Cloudinary
- Input validation and sanitization

## 🛠️ Built With

- **Frontend:** React 19, Redux Toolkit, Tailwind CSS 4, Vite
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **File Storage:** Cloudinary
- **Email:** Nodemailer
- **Automation:** Node-cron

## 📝 License

This project is licensed under the ISC License.

## ✍️ Author

- **Pravin Pagar**

