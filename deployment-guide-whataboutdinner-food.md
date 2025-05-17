# Deployment Guide for What About Dinner (whataboutdinner.food)

This guide provides comprehensive instructions for deploying the What About Dinner application to production with the domain whataboutdinner.food.

## Table of Contents
1. [Domain Registration](#domain-registration)
2. [Backend Deployment](#backend-deployment)
3. [Database Setup](#database-setup)
4. [Frontend Deployment](#frontend-deployment)
5. [SSL Configuration](#ssl-configuration)
6. [Monitoring and Maintenance](#monitoring-and-maintenance)

## Domain Registration

### Registering whataboutdinner.food
1. Visit a domain registrar that supports the .food TLD (e.g., GoDaddy, Namecheap)
2. Search for and purchase "whataboutdinner.food"
3. After purchase, access your domain's DNS settings

### DNS Configuration
Configure the following DNS records:
- **A Record**: Point `@` (root domain) to your backend server IP
- **CNAME Record**: Point `www` to `@` (root domain)
- **CNAME Record**: Point `api` to your backend server domain or IP
- **CNAME Record**: Point `admin` to your frontend deployment URL

Example DNS configuration:
```
Type    Name    Value               TTL
A       @       [Your Server IP]    3600
CNAME   www     whataboutdinner.food 3600
CNAME   api     [Backend Server]    3600
CNAME   admin   [Frontend URL]      3600
```

## Backend Deployment

### Server Requirements
- Ubuntu 20.04 LTS or newer
- Node.js 16+ and npm
- MongoDB 5.0+
- Nginx
- Let's Encrypt for SSL

### Deployment Steps

1. **Provision a server** (AWS EC2, DigitalOcean, etc.)
   ```bash
   # Update system packages
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js and npm
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install Nginx
   sudo apt install -y nginx
   
   # Start and enable Nginx
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/what-about-dinner.git
   cd what-about-dinner/backend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Configure environment variables**
   Create a `.env` file with the following content:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=[Your MongoDB Connection String]
   JWT_SECRET=whataboutdinner_food_jwt_secret_key_2025
   JWT_EXPIRE=30d
   FRONTEND_URL=https://whataboutdinner.food
   DOMAIN=whataboutdinner.food
   ```

5. **Set up PM2 for process management**
   ```bash
   # Install PM2
   sudo npm install -g pm2
   
   # Start the application
   pm2 start server.js --name "what-about-dinner-backend"
   
   # Configure PM2 to start on boot
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx as a reverse proxy**
   Create a new Nginx configuration file:
   ```bash
   sudo nano /etc/nginx/sites-available/api.whataboutdinner.food
   ```
   
   Add the following configuration:
   ```nginx
   server {
       listen 80;
       server_name api.whataboutdinner.food;
       
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
   
   Enable the configuration:
   ```bash
   sudo ln -s /etc/nginx/sites-available/api.whataboutdinner.food /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## Database Setup

### MongoDB Atlas Setup
1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is sufficient for starting)
3. Configure network access to allow connections from your backend server
4. Create a database user with read/write permissions
5. Get your connection string from the Atlas dashboard

### Database Initialization
1. Connect to your MongoDB instance
   ```bash
   cd /path/to/backend
   node
   ```

2. Run the initialization script
   ```javascript
   require('dotenv').config();
   const mongoose = require('mongoose');
   const User = require('./models/User');
   
   mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true
   });
   
   async function createAdminUser() {
     try {
       const adminUser = new User({
         name: 'Admin User',
         email: 'admin@whataboutdinner.food',
         password: 'securepassword123',
         role: 'admin'
       });
       
       await adminUser.save();
       console.log('Admin user created successfully');
     } catch (error) {
       console.error('Error creating admin user:', error);
     } finally {
       mongoose.disconnect();
     }
   }
   
   createAdminUser();
   ```

## Frontend Deployment

### AWS Amplify Deployment
1. Log in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to AWS Amplify
3. Click "New app" > "Host web app"
4. Connect to your GitHub repository
5. Configure build settings using the provided `amplify.yml` file
6. Add the following environment variables:
   - `NEXT_PUBLIC_API_URL`: https://api.whataboutdinner.food
   - `NEXT_PUBLIC_SOCKET_URL`: https://api.whataboutdinner.food
   - `NEXT_PUBLIC_DOMAIN`: whataboutdinner.food

7. Configure custom domain:
   - Add domain: whataboutdinner.food
   - Add subdomains: www, admin
   - Follow the verification steps provided by AWS

## SSL Configuration

### Backend SSL with Let's Encrypt
1. Install Certbot
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. Obtain SSL certificate
   ```bash
   sudo certbot --nginx -d api.whataboutdinner.food
   ```

3. Configure auto-renewal
   ```bash
   sudo systemctl status certbot.timer
   ```

### Frontend SSL
AWS Amplify automatically provisions and manages SSL certificates for your custom domain.

## Monitoring and Maintenance

### Backend Monitoring
1. Set up basic monitoring with PM2
   ```bash
   pm2 monitor
   ```

2. Configure log rotation
   ```bash
   sudo nano /etc/logrotate.d/what-about-dinner
   ```
   
   Add the following configuration:
   ```
   /home/ubuntu/.pm2/logs/*.log {
       daily
       rotate 7
       compress
       delaycompress
       missingok
       notifempty
       create 0640 ubuntu ubuntu
   }
   ```

### Database Backups
1. Set up automated backups in MongoDB Atlas
   - Navigate to your cluster
   - Go to "Backup" tab
   - Enable continuous backups or scheduled snapshots

### Update Procedure
1. Pull latest changes
   ```bash
   cd /path/to/backend
   git pull origin main
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Restart the application
   ```bash
   pm2 restart what-about-dinner-backend
   ```

4. For frontend updates, AWS Amplify automatically deploys changes when you push to your repository

## Admin Access

After deployment, you can access the admin dashboard at:
https://admin.whataboutdinner.food

Use the following credentials:
- Email: admin@whataboutdinner.food
- Password: securepassword123 (change this immediately after first login)

From the admin dashboard, you can:
- Manage recipes
- Configure restaurant options
- Manage users
- Customize appearance settings
- View analytics

## Troubleshooting

### Common Issues

1. **Backend not accessible**
   - Check if the server is running: `pm2 status`
   - Verify Nginx configuration: `sudo nginx -t`
   - Check firewall settings: `sudo ufw status`

2. **Database connection issues**
   - Verify MongoDB Atlas network access settings
   - Check connection string in .env file
   - Ensure MongoDB user has correct permissions

3. **Frontend deployment failures**
   - Check build logs in AWS Amplify console
   - Verify environment variables are correctly set
   - Ensure repository has the latest code

For additional support, refer to the documentation or contact the development team.
