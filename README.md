# MERN Full-Stack Application

A production-grade full-stack MERN application with a public landing page and secure admin panel.

## Features

- Public landing page with dynamic content
- Secure admin panel with JWT authentication
- Image upload and processing (cropped to 450×350)
- Contact form submission
- Newsletter subscription
- Responsive and modern UI

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer + Sharp (Image processing)
- Cloudinary (Image storage)

### Frontend
- React.js
- React Router
- Axios
- Modern CSS

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   └── utils/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── utils/
    └── package.json
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=http://localhost:3000
```

4. Create an admin user:
```bash
npm run create-admin [username] [password]
```

Default credentials: username: `admin`, password: `admin123`

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

## API Endpoints

### Public Endpoints
- `GET /api/public/projects` - Get all projects
- `GET /api/public/clients` - Get all clients
- `POST /api/public/contact` - Submit contact form
- `POST /api/public/newsletter` - Subscribe to newsletter

### Admin Endpoints (Protected)
- `POST /api/auth/login` - Admin login
- `POST /api/admin/projects` - Add project
- `GET /api/admin/projects` - Get all projects (paginated)
- `POST /api/admin/clients` - Add client
- `GET /api/admin/clients` - Get all clients (paginated)
- `GET /api/admin/contacts` - Get all contacts (paginated)
- `GET /api/admin/newsletters` - Get all subscribers (paginated)

## Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Set environment variables in your hosting platform
2. Ensure MongoDB Atlas connection string is configured
3. Deploy the backend directory

### Frontend Deployment (Vercel/Netlify)

1. Set `REACT_APP_API_URL` to your deployed backend URL
2. Build the project: `npm run build`
3. Deploy the build folder

## Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT expiration time
- `BACKEND_URL` - Backend URL for image URLs (default: http://localhost:5000)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name (optional)
- `CLOUDINARY_API_KEY` - Cloudinary API key (optional)
- `CLOUDINARY_API_SECRET` - Cloudinary API secret (optional)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend
- `REACT_APP_API_URL` - Backend API URL

## Notes

- Image uploads are automatically cropped to 450×350 pixels
- Admin routes are protected with JWT authentication
- All forms include validation
- Responsive design for mobile and desktop

