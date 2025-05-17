# What About Dinner - Deployment Guide

This guide provides step-by-step instructions for deploying the What About Dinner app to production with the domain whataboutdinner.com.

## Table of Contents
1. [Domain Registration and DNS Setup](#domain-registration-and-dns-setup)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [SSL Configuration](#ssl-configuration)
5. [Database Setup](#database-setup)
6. [Monitoring and Maintenance](#monitoring-and-maintenance)

## Domain Registration and DNS Setup

1. Register the domain `whataboutdinner.com` through a domain registrar like Namecheap, GoDaddy, or Google Domains.

2. Set up DNS records:
   - Create an A record pointing to your backend server IP
   - Create a CNAME record for `www` pointing to your frontend deployment
   - Create a CNAME record for `api` pointing to your backend server

Example DNS configuration:
```
whataboutdinner.com.       A       203.0.113.1
www.whataboutdinner.com.   CNAME   whataboutdinner.com.
api.whataboutdinner.com.   CNAME   whataboutdinner.com.
```

## Backend Deployment

### AWS EC2 Setup

1. Launch an EC2 instance:
   - Ubuntu Server 22.04 LTS
   - t2.micro (free tier) or t2.small for production
   - Configure security group to allow HTTP (80), HTTPS (443), and SSH (22)

2. SSH into your instance:
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-instance-ip
   ```

3. Install dependencies:
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm nginx certbot python3-certbot-nginx
   sudo npm install -g pm2
   ```

4. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/whataboutdinner.git
   cd whataboutdinner/backend
   npm install
   ```

5. Create environment variables:
   ```bash
   sudo nano .env
   ```
   
   Add the following:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   FRONTEND_URL=https://whataboutdinner.com
   DOMAIN=whataboutdinner.com
   ```

6. Configure Nginx:
   ```bash
   sudo nano /etc/nginx/sites-available/whataboutdinner
   ```
   
   Add the following:
   ```nginx
   server {
       listen 80;
       server_name api.whataboutdinner.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/whataboutdinner /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. Start the backend server:
   ```bash
   pm2 start server.js --name whataboutdinner-backend
   pm2 startup
   pm2 save
   ```

## Database Setup

### MongoDB Atlas Configuration

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas

2. Create a new cluster (M0 Free Tier is sufficient for starting)

3. Set up database access:
   - Create a database user with password authentication
   - Add your IP address to the IP Access List (or 0.0.0.0/0 for all IPs)

4. Get your connection string:
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string and replace `<password>` with your database user's password
   - Use this string in your backend .env file

5. Create initial collections:
   - Users
   - Parties
   - Votes
   - Orders

## Frontend Deployment

### AWS Amplify Setup

1. Log in to the AWS Management Console and navigate to AWS Amplify

2. Click "New app" > "Host web app"

3. Connect to your GitHub repository

4. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

5. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: https://api.whataboutdinner.com
   - `NEXT_PUBLIC_SOCKET_URL`: https://api.whataboutdinner.com
   - `NEXT_PUBLIC_DOMAIN`: whataboutdinner.com

6. Configure custom domain:
   - Go to "Domain management"
   - Add domain: whataboutdinner.com
   - Verify domain ownership
   - Configure subdomains:
     - Root domain (whataboutdinner.com) -> (main)
     - www -> (main)
     - admin -> (main)

## SSL Configuration

1. For the backend (EC2):
   ```bash
   sudo certbot --nginx -d api.whataboutdinner.com
   ```
   Follow the prompts to complete the SSL setup

2. For the frontend, AWS Amplify automatically provisions SSL certificates through Amazon Certificate Manager

## Monitoring and Maintenance

1. Set up monitoring:
   ```bash
   pm2 install pm2-server-monit
   ```

2. Configure automatic backups for MongoDB Atlas

3. Set up GitHub Actions for CI/CD:
   - Create `.github/workflows/deploy.yml` for automated deployments
   - Configure secrets for AWS credentials

4. Regular maintenance tasks:
   - Monitor server resources
   - Check application logs
   - Update dependencies
   - Perform security audits

## Accessing the Admin Dashboard

After deployment, you can access the admin dashboard at:
```
https://whataboutdinner.com/admin
```

Use the admin credentials to log in and manage:
- Recipes
- Restaurants
- Users
- Appearance settings
- Party data

## Troubleshooting

If you encounter issues:

1. Check application logs:
   ```bash
   pm2 logs whataboutdinner-backend
   ```

2. Verify Nginx configuration:
   ```bash
   sudo nginx -t
   ```

3. Check MongoDB connection:
   ```bash
   mongo "your_connection_string" --eval "db.adminCommand('ping')"
   ```

4. Verify SSL certificates:
   ```bash
   sudo certbot certificates
   ```

For additional support, contact the development team.
