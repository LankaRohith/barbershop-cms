# 🚀 Complete Deployment Guide for Non-Technical Users

This guide walks you through deploying the Barber Shop CMS step by step. Take your time — no rush.

---

## 📋 BEFORE YOU START

**What you'll need:**
- Email address (Gmail recommended)
- About 30-45 minutes of time
- A computer with internet
- The project files I created for you

**What this will cost:**
- $0 for everything (or $12/year if you want a custom domain like "downtowncuts.com")

---

## STEP 1: Create MongoDB Database (10 minutes)

MongoDB stores all your data (services, employees, photos). We'll use their free tier.

### 1.1 Sign Up for MongoDB Atlas

1. Open your browser and go to: **https://www.mongodb.com/cloud/atlas**
2. Click the **"Try Free"** button (big green button in top right)
3. You'll see a sign-up form. Fill it out:
   - **Email**: Use your regular email
   - **Password**: Create a strong password you'll remember
   - **Company Name**: Type "BarberShop" (doesn't matter really)
   - Click **"Get Started Free"**
4. Check your email for a verification code
5. Enter the code and click **"Verify"
6. On the "Tell us a few things about your project" screen:
   - Select: **"JavaScript"** for preferred language (don't worry, it's compatible)
   - Goal: Check "Build a new application"
   - Click **"Finish"

### 1.2 Create Your Database Cluster

1. After finishing sign-up, you'll see "Create New Cluster" page
2. The **M0 Sandbox** (free tier) should already be selected
3. Keep everything default and click **"Create Deployment"** (green button)
4. It will ask about IP Access List — for now, select **"Allow access from anywhere"** (we'll secure this later)
5. Click **"Add Entry"**
6. Create a Database User:
   - Username: `barberadmin` (or any name you want)
   - Password: Click **"Autogenerate Secure Password"** — **IMPORTANT**: Copy this password and save it in a text file!
   - Click **"Create Database User"**
7. Click **"Finish and Close"**

### 1.3 Get Your Database Connection String

1. On your dashboard, look for your cluster (might be called "Cluster0")
2. Click the **"Connect"** button
3. Select **"Drivers"** from the popup
4. Under "Select your driver and version":
   - Driver: **Python**
   - Version: **4.0 or later**
5. You'll see a connection string like this:
   ```
   mongodb+srv://barberadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
6. **Click the "Copy" button** next to the string
7. **Paste this into a text file and SAVE IT**
8. **IMPORTANT**: Replace `<password>` with the actual password you saved earlier

**Example of what it should look like after adding your password:**
```
mongodb+srv://barberadmin:MySecretPass123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

✅ **STEP 1 COMPLETE!** You have your MongoDB URI. Save this somewhere safe.

---

## STEP 2: Create Cloudinary Account (5 minutes)

Cloudinary stores your photos (gallery images, employee photos).

### 2.1 Sign Up

1. Go to: **https://cloudinary.com**
2. Click **"Sign up for free"** (top right)
3. Fill out the form:
   - Email: Your email
   - First/Last name
   - Password
   - Check "I'm not a robot"
4. Click **"Create Account"**
5. Check your email and click the verification link

### 2.2 Get Your API Credentials

1. After verifying, you'll be on your Dashboard
2. Look for the section called **"Account Details"**
3. You'll see these details:
   - **Cloud Name**: Something like `dxxxxxxxxx` (starts with 'd')
   - **API Key**: A long number like `123456789012345`
   - **API Secret**: A long string of letters and numbers
4. **Copy all three of these and save them** in your text file

✅ **STEP 2 COMPLETE!** You have your Cloudinary credentials.

---

## STEP 3: Prepare Your Project Files

You need to get the project files onto GitHub so Render and Vercel can access them.

### 3.1 Create GitHub Account (if you don't have one)

1. Go to: **https://github.com**
2. Click **"Sign up"**
3. Enter your email → Create password → Username
4. Complete verification steps

### 3.2 Create a New Repository

1. Once logged into GitHub, click the **"+"** icon (top right)
2. Click **"New repository"**
3. Name it: `barbershop-cms`
4. Make it **Public** (free sites need public repos)
5. Click **"Create repository"**

### 3.3 Upload Your Files

**Option A: Using GitHub Website (Easiest for beginners)**

1. On your new repository page, click **"uploading an existing file"**
2. You'll see "Drag files here..."
3. On your computer, open the folder with the project files
4. ZIP the entire project folder (right-click → Compress)
5. But actually, let's do this folder by folder to make it easier

**Better approach - Upload folder by folder:**

1. In your GitHub repo, click **"Add file"** → **"Upload files"**
2. Navigate to your project folder on your computer
3. First, upload the `README.md` file
4. Click **"Commit changes"**
5. Now click **"Add file"** again → **"Upload files"**
6. Navigate to the `backend` folder and select ALL files
7. **IMPORTANT**: Before clicking commit, add `backend/` in front of the filename path
8. Click **"Commit changes"**
9. Do the same for the `frontend` folder

**Option B: Using Command Line (if you're comfortable)**

```bash
# Navigate to your project folder
cd path/to/Barber\ Site

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/barbershop-cms.git

# Push
git branch -M main
git push -u origin main
```

✅ **STEP 3 COMPLETE!** Your code is on GitHub.

---

## STEP 4: Deploy Backend to Render (15 minutes)

Render hosts your backend server for free.

### 4.1 Create Render Account

1. Go to: **https://render.com**
2. Click **"Get Started"** (green button)
3. Click **"GitHub"** to sign up with your GitHub account
4. Authorize Render to access your GitHub

### 4.2 Create Web Service

1. After connecting GitHub, you'll see your repos
2. Find `barbershop-cms` and click **"Connect"**
3. Configure the service:

   **Basic Info:**
   - Name: `barbershop-api` (or any name)
   - Region: Choose closest to your customers (e.g., "Oregon (US West)")
   - Branch: `main`
   - Root Directory: `backend` ← **IMPORTANT!**
   - Runtime: `Python 3`

   **Build & Start Commands:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. Click **"Advanced"** to expand it
5. Click **"Add Environment Variable"**

### 4.3 Add Environment Variables

Add these one by one (click "Add" after each):

| Variable Name | Value |
|--------------|-------|
| `MONGODB_URI` | Paste your MongoDB connection string from Step 1 |
| `JWT_SECRET_KEY` | Create a random long string (30+ characters) - just mash your keyboard |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name from Step 2 |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key from Step 2 |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret from Step 2 |
| `CORS_ORIGINS` | `["*"]` (we'll update this later) |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | Choose a password for the barber |

### 4.4 Deploy

1. Scroll down and click **"Create Web Service"**
2. Render will start building your app
3. Wait for the build to complete (2-3 minutes)
4. You'll see a URL like: `https://barbershop-api.onrender.com`
5. **SAVE THIS URL!** This is your backend API URL

✅ **STEP 4 COMPLETE!** Your backend is live at `https://your-app.onrender.com`

---

## STEP 5: Deploy Frontend to Vercel (10 minutes)

Vercel hosts your website frontend for free.

### 5.1 Create Vercel Account

1. Go to: **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### 5.2 Import Project

1. After signing in, click **"Add New Project"**
2. You'll see your GitHub repos
3. Find `barbershop-cms` and click **"Import"**
4. Configure:
   - **Framework Preset**: Select **"Vite"** from dropdown
   - **Root Directory**: `frontend` ← **IMPORTANT!**
   - Build Command: `npm run build` (should be pre-filled)
   - Output Directory: `dist` (should be pre-filled)

5. Expand **"Environment Variables"**
6. Click **"Add"** and add:
   - Name: `VITE_API_URL`
   - Value: Your Render backend URL from Step 4 (e.g., `https://barbershop-api.onrender.com`)

7. Click **"Deploy"**

### 5.3 Wait for Deployment

1. Vercel will build your site (1-2 minutes)
2. You'll get a URL like: `https://barbershop-cms-xxx.vercel.app`
3. **SAVE THIS URL!** This is your public website

✅ **STEP 5 COMPLETE!** Your website is live!

---

## STEP 6: Update CORS (IMPORTANT!)

Now that both are deployed, we need to secure the connection between them.

### 6.1 Get Your Vercel URL

From Step 5, you should have your Vercel URL like:
```
https://barbershop-cms-abc123.vercel.app
```

### 6.2 Update Render Environment Variable

1. Go back to **https://dashboard.render.com**
2. Click on your `barbershop-api` service
3. Click **"Environment"** tab
4. Find `CORS_ORIGINS` and click **Edit** (pencil icon)
5. Change the value from `["*"]` to:
   ```
   ["https://barbershop-cms-abc123.vercel.app"]
   ```
   (Use YOUR actual Vercel URL)
6. Click **"Save Changes"**
7. Your service will restart automatically

✅ **STEP 6 COMPLETE!** Your frontend and backend are securely connected.

---

## STEP 7: Set Up Cron Job (Prevents Sleep) (5 minutes)

Render's free tier goes to sleep after 15 minutes of no activity. This makes it wake up.

### 7.1 Create Cron-Job Account

1. Go to: **https://cron-job.org**
2. Click **"Sign up"** (top right)
3. Fill in:
   - Username: Choose any
   - Email: Your email
   - Password: Create password
4. Check your email and click verification link

### 7.2 Create Cron Job

1. Log in to cron-job.org
2. Click **"Create cronjob"** (green button)
3. Configure:
   - **Title**: `Barbershop API Ping`
   - **Address**: Paste your Render backend URL + `/health`
     - Example: `https://barbershop-api.onrender.com/health`
   - **Schedule**: Select **"Every 10 minutes"** from dropdown
4. Click **"Create"**

### 7.3 Test It

1. In the cronjob list, find your new job
2. Click the **"Play"** icon (triangle)
3. It should show green checkmark if successful

✅ **STEP 7 COMPLETE!** Your backend will stay awake 24/7.

---

## STEP 8: Test Everything (5 minutes)

### 8.1 Test Public Website

1. Open your Vercel URL in browser
2. You should see the barber shop homepage
3. Click around: Services, Gallery, Contact
4. Make sure all pages load

### 8.2 Test Admin Panel

1. Go to: `https://your-vercel-url.vercel.app/admin`
2. You should see a login page
3. Login with:
   - Username: `admin`
   - Password: (whatever you set in Render env vars, or `barber123` if you didn't change it)
4. You should see the Admin Dashboard

### 8.3 Test Adding Content

1. In admin panel, click **"Services"**
2. Click **"Add Service"**
3. Fill in:
   - Name: `Classic Haircut`
   - Price: `25`
   - Description: `Traditional haircut with scissors and clippers`
4. Click **"Save"**
5. Go back to public website
6. Refresh the Services page — you should see your new service!

✅ **STEP 8 COMPLETE!** Everything is working!

---

## STEP 9: Hand Over to Barber

### 9.1 Create Simple Instructions Document

Create a document with this info:

```
BARBER SHOP WEBSITE - ADMIN INSTRUCTIONS

Your Website: https://your-vercel-url.vercel.app
Admin Login: https://your-vercel-url.vercel.app/admin

Login Details:
Username: admin
Password: [the password you set]

HOW TO EDIT SERVICES:
1. Go to [your website]/admin
2. Login
3. Click "Services" in the sidebar
4. Click "Add Service" to add new
5. Or click the pencil icon to edit existing
6. Click "Save"
7. Changes appear instantly on the website!

HOW TO EDIT EMPLOYEES:
1. Go to Admin panel
2. Click "Employees"
3. Click "Add Employee" or edit existing
4. Fill in name, role, and bio
5. Save

HOW TO ADD PHOTOS:
1. Go to Admin panel
2. Click "Gallery"
3. Click "Choose File" and select a photo
4. Add caption (optional)
5. Click "Upload Image"

TIPS:
- Photos should be JPG or PNG, under 5MB
- You can use your phone to take and upload photos
- All changes save instantly
- Website works on phones, tablets, and computers

NEED HELP?
Call: [your number]
```

### 9.2 Bookmark the Admin Page

On the barber's phone/computer:
1. Open the admin login page
2. Bookmark it as "Edit My Website"

### 9.3 Optional: Buy Custom Domain

If the barber wants a professional domain (like `downtowncuts.com`):

1. Go to **https://namecheap.com** or **https://domains.google.com**
2. Search for available domain
3. Purchase (~$12/year)
4. In Vercel dashboard:
   - Go to your project
   - Click **"Settings"** → **"Domains"**
   - Add your custom domain
   - Follow Vercel's DNS instructions

---

## 🎉 YOU'RE DONE!

### What You Have Now:

✅ Live website anyone can visit
✅ Admin panel barber can log into
✅ Ability to edit services, employees, gallery
✅ Image uploads working
✅ Free hosting (or $12/year with custom domain)

### Your URLs:
- **Public Website**: `https://[your-name].vercel.app`
- **Admin Panel**: `https://[your-name].vercel.app/admin`
- **Backend API**: `https://[your-name].onrender.com`

### If Something Breaks:

**Website not loading:**
- Check Vercel dashboard for errors
- Make sure backend is running (check Render status)

**Admin login not working:**
- Check that `CORS_ORIGINS` in Render matches your Vercel URL exactly
- Make sure backend URL in Vercel env vars is correct

**Images not uploading:**
- Check Cloudinary credentials in Render
- Make sure images are under 5MB

**Backend sleeping:**
- Check that cron-job.org job is running
- Manually ping the health endpoint

---

## 📞 Quick Reference

| Service | Website | Purpose |
|---------|---------|---------|
| MongoDB Atlas | mongodb.com | Database |
| Cloudinary | cloudinary.com | Image storage |
| Render | render.com | Backend hosting |
| Vercel | vercel.com | Frontend hosting |
| Cron-Job | cron-job.org | Keeps backend awake |

---

**Questions? Take a screenshot of any error message and ask for help!**
