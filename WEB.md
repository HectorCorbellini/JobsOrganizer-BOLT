# Web Deployment Guide

This document provides a step-by-step guide to deploying the JobTracker application to the web using free, robust hosting services. This process involves deploying the frontend (React) and the backend (Node.js API and PostgreSQL database) to separate providers and configuring them to communicate with each other.

---

## Recommended Free Hosting Providers

*   **Frontend**: **[Vercel](https://vercel.com)** - Offers seamless deployment for modern frontend frameworks.
*   **Backend & Database**: **[Render](https://render.com)** - A modern, all-in-one platform for web services and databases.

---

## Step 1: Deploy the Backend & Database to Render

It's best to start with the backend, as the frontend will need its URL.

1.  **Sign Up**: Go to [Render](https://dashboard.render.com/register) and sign up using your GitHub account.

2.  **Create the Database**:
    *   From the dashboard, click **New +** and select **PostgreSQL**.
    *   Give your database a name (e.g., `jobtracker-db`).
    *   Ensure the free tier is selected.
    *   Click **Create Database**. It may take a few minutes to initialize.
    *   Once it's ready, go to the database's **Info** page and copy the **Internal Connection String**. You will need this for the backend service.

3.  **Create the Web Service (Backend API)**:
    *   Click **New +** again and select **Web Service**.
    *   Connect your GitHub account and select the `JobsOrganizer-BOLT` repository.
    *   Give your service a unique name (e.g., `jobtracker-api`).
    *   Under the **Settings** section:
        *   **Root Directory**: Set this to `server/`.
        *   **Build Command**: Set this to `npm install && npm run build && npx prisma migrate deploy`.
        *   **Start Command**: Set this to `npm start`.
    *   Scroll down to the **Environment** section and click **Add Environment Variable**:
        *   **Key**: `DATABASE_URL`
        *   **Value**: Paste the **Internal Connection String** you copied from your Render database.
    *   Ensure the **Free** instance type is selected.
    *   Click **Create Web Service**.

Render will now build and deploy your backend. Once it's live, it will have a public URL like `https://jobtracker-api.onrender.com`. Copy this URL for the next step.

---

## Step 2: Deploy the Frontend to Vercel

1.  **Sign Up**: Go to [Vercel](https://vercel.com/signup) and sign up using your GitHub account.

2.  **Create a New Project**:
    *   From your dashboard, click **Add New...** and select **Project**.
    *   Import your `JobsOrganizer-BOLT` GitHub repository.

3.  **Configure the Project**:
    *   Vercel will automatically detect that you're using Vite.
    *   Expand the **Root Directory** section and change it to `frontend/`.
    *   Expand the **Environment Variables** section and add a new variable:
        *   **Key**: `VITE_API_URL`
        *   **Value**: Paste the URL of your live backend service from Render (e.g., `https://jobtracker-api.onrender.com`).

4.  **Deploy**: Click the **Deploy** button.

Vercel will now build and deploy your frontend. Once complete, your application will be live on the web!

---

## Final Check

Once both services are deployed, visit your Vercel URL. The frontend should load, and it should be able to communicate with your backend API on Render to fetch and display your job data. Congratulations!
