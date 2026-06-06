# NEXUS 2026: Deployment & Setup Guide

This guide details instructions for setting up the database, running migrations, seeding content, and launching the application in local development or production environments.

---

## 1. Local Environment Setup

### Prerequisites
- **Node.js** (v18+ recommended, v25.2.1 installed)
- **NPM** (v9+ recommended, v11.1.0 installed)
- **Docker / Docker Desktop** (for running PostgreSQL locally)

### Step A: Configure Environment Variables
Verify your `.env` file in the project root contains your database connection details and auth secrets. The default is pre-configured for the local Docker compose postgres service:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ieee_website?schema=public"
JWT_SECRET="nexus_secret_key_2026_super_secure_hash"
NODE_ENV="development"
```

### Step B: Launch Local PostgreSQL Database
Run the following command to start PostgreSQL in a detached background container:
```bash
docker-compose up -d
```
*This starts a PostgreSQL instance listening on port `5432` with username `postgres`, password `postgres`, and database name `ieee_website`.*

### Step C: Run Database Migrations
Create database tables and sync the Prisma schema with your PostgreSQL instance:
```bash
npx prisma db push
```
*(Alternatively, you can run `npx prisma migrate dev --name init` if you want to track migration logs)*.

### Step D: Seed Initial Data
Seed the database with default landing page content (tracks, stats, committee members, gallery pictures) and register the default **Admin Login credentials**:
```bash
npm run db:seed
```
* **Default Admin Email:** `admin@nexus2026.com`
* **Default Admin Password:** `admin123`

### Step E: Run Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the website. Navigate to `http://localhost:3000/admin/login` to sign in to the Admin Dashboard.

---

## 2. Production Build Check

Compile the application to check TypeScript, assets, and route optimizations:
```bash
npm run build
```
Launch the compiled next production server locally:
```bash
npm run start
```

---

## 3. Remote Cloud Hosting (Vercel & Supabase/Neon)

To launch this full-stack web application in a production environment:

### Step 1: Provision a cloud PostgreSQL Database
1. Create a free PostgreSQL database instance on **Neon.tech** or **Supabase**.
2. Copy the connection string (it will look similar to `postgresql://[user]:[password]@[host]/[dbname]?sslmode=require`).

### Step 2: Set Environment Variables on Vercel
Create a new project on **Vercel** linking your GitHub repository, and configure the following env variables under Project Settings:
- `DATABASE_URL`: Your cloud PostgreSQL connection string.
- `JWT_SECRET`: A long, random secure hash key.
- `NODE_ENV`: `production`

### Step 3: Run Database Migrations on Cloud DB
To push the database structure to your live database instance, run the following locally (after replacing the environment `DATABASE_URL` momentarily or setting it temporarily in your terminal environment):
```bash
npx prisma db push
```
Then run the seeding script to create the initial admin user and tracks:
```bash
npm run db:seed
```

### Step 4: Deploy on Vercel
Click **Deploy** in Vercel. The platform automatically triggers `npm run build`, compiles all server API paths, client pages, asset optimizations, and deploys it live.
