# E-Commerce

## Link: https://ecommerce-lime-delta.vercel.app/

 A Full-Stack E-Commerce platform with cloth customization powered by Fabric.js and boosted by Redis for rapid optimization, our platform ensures a swift and responsive user experience. Tech stacks include MySQL for robust database management, Next.js 13 for a cutting-edge frontend, Sonner for delightful toasting experiences, and Nodemailer for seamless email notifications – especially handy when signing up for our newsletter.
 
## Tech Stacks Used

- Frontend: Next.js,Fabric js, Vanilla Tilt,Swiper js,Sonner 
- Backend: Node.js, Express.js,Redis,NodeMailer
- Database: My-SQL
- Authentication: JWT(Json-Web-Token)

## Functions

- Browse and search for products
- View product details
- Add products to the shopping cart
- User authentication and authorization
-Cloth-Customization feature using Fabric Js;

## How to Clone and Run

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AmanBhujel/Ecommerce.git
   cd eCommerce

2. **Install Dependencies:**
   ```bash
   # Install Backend Dependencies
   cd backend
   npm install

   # Install Frontend Dependencies
   cd frontend
   npm install

3. **Set Up Environment Variables:**
   Create .env file inside backend directory and create these variables:

  PORT=5000
  DB_HOST=your_mysql_db_host
  DB_PORT=3306
  DB_USER=your_db_user
  DB_PASSWORD=your_db_password
  DB_DATABASE=your_db_name
  EMAIL_SERVICE=your_email_service_provider
  EMAIL_USERNAME=your_email_username
  EMAIL_PASSWORD=your_email_password
  JWT_TOKEN_KEY=your_jwt_token_key
  REDIS_URL=your_redis_url(Create free from render.com)
  
  # Application Environment
  NODE_ENV=production

4.**Run the Application:**
 ```bash
   # Install Backend Dependencies
   cd backend
   node index.js

   # Install Frontend Dependencies
   cd frontend
   npm run dev


   
