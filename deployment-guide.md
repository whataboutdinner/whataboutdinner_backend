# Production Deployment Guide for WhatsForDinner.com

This guide outlines the steps to deploy the WhatsForDinner app to production with the custom domain whatsfordinner.com.

## Prerequisites

1. Domain name (whatsfordinner.com) purchased from a domain registrar
2. AWS account for hosting (or alternative cloud provider)
3. MongoDB Atlas account for database hosting
4. SSL certificate for secure HTTPS connections

## Backend Deployment

### 1. Set up MongoDB Atlas

1. Create a new MongoDB Atlas cluster
2. Configure network access to allow connections from your deployment servers
3. Create a database user with appropriate permissions
4. Get the MongoDB connection string

### 2. Deploy Backend to AWS EC2

1. Launch an EC2 instance (t2.micro or larger recommended)
   - Select Ubuntu Server 22.04 LTS
   - Configure security groups to allow HTTP (80), HTTPS (443), and SSH (22)

2. SSH into your EC2 instance:
   ```
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. Install Node.js and npm:
   ```
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. Install PM2 for process management:
   ```
   sudo npm install -g pm2
   ```

5. Clone the repository:
   ```
   git clone https://github.com/yourusername/food-voting-app.git
   cd food-voting-app/backend
   ```

6. Create .env file with production settings:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   JWT_EXPIRE=30d
   FRONTEND_URL=https://whatsfordinner.com
   ```

7. Install dependencies and start the server:
   ```
   npm install
   pm2 start server.js --name "whatsfordinner-backend"
   pm2 startup
   pm2 save
   ```

### 3. Set up Nginx as a reverse proxy

1. Install Nginx:
   ```
   sudo apt-get install nginx
   ```

2. Create Nginx configuration:
   ```
   sudo nano /etc/nginx/sites-available/whatsfordinner
   ```

3. Add the following configuration:
   ```
   server {
       listen 80;
       server_name api.whatsfordinner.com;

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

4. Enable the site and restart Nginx:
   ```
   sudo ln -s /etc/nginx/sites-available/whatsfordinner /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Frontend Deployment

### 1. Build the Next.js application

1. Update environment variables in .env.production:
   ```
   NEXT_PUBLIC_API_URL=https://api.whatsfordinner.com
   ```

2. Build the application:
   ```
   npm run build
   ```

### 2. Deploy to AWS Amplify

1. Log in to AWS Management Console and navigate to AWS Amplify
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
5. Configure environment variables:
   - NEXT_PUBLIC_API_URL=https://api.whatsfordinner.com

6. Deploy the app

### 3. Set up custom domain in AWS Amplify

1. In the Amplify Console, go to "Domain Management"
2. Click "Add Domain"
3. Enter your domain name: whatsfordinner.com
4. Follow the instructions to verify domain ownership
5. Configure subdomains:
   - whatsfordinner.com -> (main domain)
   - www.whatsfordinner.com -> (redirect to main domain)

## SSL Configuration

### 1. Set up SSL for backend (EC2)

1. Install Certbot:
   ```
   sudo apt-get update
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. Obtain SSL certificate:
   ```
   sudo certbot --nginx -d api.whatsfordinner.com
   ```

3. Configure auto-renewal:
   ```
   sudo systemctl status certbot.timer
   ```

### 2. SSL for frontend (AWS Amplify)

AWS Amplify automatically provisions and manages SSL certificates for custom domains.

## DNS Configuration

1. Log in to your domain registrar
2. Update DNS records:
   - A record: whatsfordinner.com -> AWS Amplify IP
   - CNAME record: www.whatsfordinner.com -> AWS Amplify domain
   - CNAME record: api.whatsfordinner.com -> EC2 instance IP

## Monitoring and Maintenance

1. Set up CloudWatch for monitoring EC2 instance
2. Configure PM2 monitoring:
   ```
   pm2 monitor
   ```

3. Set up regular database backups in MongoDB Atlas

## Deployment Verification

1. Test frontend: https://whatsfordinner.com
2. Test backend API: https://api.whatsfordinner.com/api/auth/me
3. Test WebSocket connection
4. Verify mobile responsiveness

## Troubleshooting

- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Check PM2 logs: `pm2 logs`
- Check MongoDB Atlas connection
- Verify security group settings in AWS EC2
