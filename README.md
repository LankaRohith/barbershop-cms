# Classic Cuts Barber Shop CMS

A full-stack CMS for barber shops with FastAPI backend, React frontend, MongoDB database, JWT authentication, and Cloudinary image storage.

## Features

- **Public Website**: Home, Services, Gallery, Contact pages
- **Admin Panel**: Secure login, manage services, employees, and gallery
- **Image Uploads**: Cloudinary integration for optimized image storage
- **Responsive Design**: Dark, masculine theme with Tailwind CSS
- **RESTful API**: FastAPI with Beanie ODM for MongoDB
- **Authentication**: JWT tokens with 24h expiration
- **Soft Delete**: Data is marked inactive rather than deleted

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | FastAPI + Beanie ODM |
| Database | MongoDB |
| Auth | JWT + bcrypt |
| Images | Cloudinary |
| Hosting | Render (backend) + Vercel (frontend) |

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── routers/      # API route handlers
│   │   ├── __init__.py
│   │   ├── auth.py       # JWT utilities
│   │   ├── cloudinary.py # Image upload
│   │   ├── config.py     # Settings
│   │   ├── database.py   # MongoDB init
│   │   ├── main.py       # FastAPI app
│   │   └── models.py     # Beanie models
│   ├── requirements.txt
│   ├── Procfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI
│   │   ├── context/      # React context
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Public pages
│   │   │   └── admin/    # Admin pages
│   │   ├── api/          # API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Local Development

### Prerequisites

- Python 3.10+
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (free tier)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Run server
uvicorn app.main:app --reload
```

Backend runs at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API URL

# Run dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Environment Variables

**Backend `.env`**:
```
MONGODB_URI=mongodb://localhost:27017/barbershop
JWT_SECRET_KEY=your-super-secret-key-min-32-characters
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
ADMIN_USERNAME=admin
ADMIN_PASSWORD=barber123
```

**Frontend `.env`**:
```
VITE_API_URL=http://localhost:8000
```

### Initial Admin User

The first admin user is auto-created on startup:
- Username: `admin`
- Password: `barber123` (change in production!)

## Deployment

### MongoDB Setup (MongoDB Atlas - Free Tier)

1. Create account at [mongodb.com](https://mongodb.com)
2. Create new cluster (M0 Sandbox - free)
3. Create database user
4. Allow IP access (0.0.0.0/0 for all, or your Render IP)
5. Copy connection string to `MONGODB_URI`

### Cloudinary Setup (Free Tier)

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → API Keys
3. Copy credentials to environment variables

### Backend Deployment (Render)

1. Push code to GitHub
2. Create account at [render.com](https://render.com)
3. Click "New Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables from `.env`
7. Deploy

**Prevent Spin-Down (Important for free tier):**

Set up cron job to ping your server every 10 minutes:

1. Go to [cron-job.org](https://cron-job.org) (free)
2. Create account → "Create cronjob"
3. URL: `https://your-app.onrender.com/health`
4. Schedule: Every 10 minutes
5. This keeps the free tier awake 24/7

### Frontend Deployment (Vercel)

1. Push code to GitHub (same or separate repo)
2. Create account at [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repo
5. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`
7. Deploy

### Custom Domain (Optional - ~$12/year)

For professional appearance:
1. Buy domain from Namecheap or Google Domains
2. Add to Vercel: Project Settings → Domains
3. Configure DNS records as instructed

## API Endpoints

### Public (No Auth)
```
GET  /services           → List active services
GET  /employees         → List active employees
GET  /gallery            → List gallery images
GET  /health             → Health check (for cron jobs)
```

### Authentication
```
POST /auth/login         → Get JWT token
```

### Admin (JWT Required)
```
GET    /admin/services      → List all services
POST   /admin/services      → Create service
PATCH  /admin/services/{id}  → Update service
DELETE /admin/services/{id}  → Soft delete

GET    /admin/employees     → List all employees
POST   /admin/employees     → Create employee
PATCH  /admin/employees/{id} → Update employee
DELETE /admin/employees/{id} → Soft delete

GET    /admin/gallery       → List all images
POST   /admin/gallery/upload → Upload image
DELETE /admin/gallery/{id}   → Delete image
```

## Handover to Barber

1. **Create custom login credentials**:
   - Change the default `admin` / `barber123` password
   - Or create a new admin user via API/database

2. **Provide simple instructions**:
   - Go to `yoursite.com/admin`
   - Login with provided credentials
   - Navigate to Services/Employees/Gallery to edit
   - Changes appear instantly on the public site

3. **Bookmark the admin URL** on their phone/computer

## Troubleshooting

**CORS errors**: Check `CORS_ORIGINS` includes your frontend URL

**Upload fails**: Verify Cloudinary credentials and file size (<5MB)

**JWT expires**: Token expires after 24 hours, user must re-login

**Database connection**: Ensure MongoDB IP whitelist includes Render's IP

## Security Notes

- Change default admin password immediately
- Use strong `JWT_SECRET_KEY` (32+ characters)
- Enable MongoDB auth in production
- Regular backups of MongoDB data
- Cloudinary upload preset restrictions recommended

## License

MIT - Free to use for personal or commercial projects.

## Support

For issues or questions, check:
- FastAPI docs: https://fastapi.tiangolo.com
- Beanie docs: https://beanie-odm.dev
- Render docs: https://render.com/docs
- Vercel docs: https://vercel.com/docs
