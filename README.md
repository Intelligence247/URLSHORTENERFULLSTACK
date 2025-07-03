# URL Shortener - Full Stack MERN Application

A comprehensive URL shortening service built with the MERN stack, featuring QR code generation, email integration, and analytics.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, memorable links
- **QR Code Generation**: Automatically generate QR codes for shortened URLs
- **Email Integration**: Send shortened URLs via email using Resend
- **Click Analytics**: Track clicks and engagement metrics
- **Modern UI**: Beautiful, responsive design with smooth animations
- **API Documentation**: Complete Swagger documentation
- **Security**: Rate limiting, input validation, and secure data storage

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for HTTP requests
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **nanoid** for generating short codes
- **qrcode** for QR code generation
- **Resend** for email functionality
- **Swagger** for API documentation

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Resend API Key** (for email functionality)

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd url-shortener
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
```

### 4. Environment Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URI=mongodb://localhost:27017/urlshortener
# For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/urlshortener

# Application Configuration
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Security (Optional - for production)
JWT_SECRET=your_jwt_secret_here
```

### 5. Get Required API Keys

#### MongoDB Setup
- **Local MongoDB**: Install MongoDB locally or use MongoDB Compass
- **MongoDB Atlas**: 
  1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
  2. Create a new cluster
  3. Get your connection string
  4. Replace `DATABASE_URI` in `.env`

#### Resend API Key
1. Sign up at [Resend](https://resend.com)
2. Go to API Keys section
3. Generate a new API key
4. Replace `RESEND_API_KEY` in `.env`
5. Verify your domain or use the test domain for development

## 🚀 Running the Application

### 1. Start the Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

### 2. Start the Frontend Development Server
```bash
# In the root directory
npm run dev
```
The frontend will run on `http://localhost:5173`

### 3. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

## 📚 API Documentation

The API is fully documented using Swagger. Once the backend is running, visit:
- **Swagger UI**: http://localhost:5000/api-docs
- **Swagger JSON**: Available in `swagger.json` file

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/shorten` | Shorten a URL |
| GET | `/api/:code` | Redirect to original URL |
| GET | `/api/stats/:code` | Get URL statistics |
| GET | `/health` | Health check |

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: URL validation and sanitization
- **CORS Protection**: Configured for frontend origin
- **Security Headers**: Helmet.js for security headers
- **Error Handling**: Comprehensive error handling

## 📱 Usage

1. **Shorten a URL**:
   - Enter a valid URL in the input field
   - Optionally provide an email address
   - Click "Shorten URL"
   - Get your shortened URL and QR code

2. **Copy & Share**:
   - Click copy buttons to copy URLs to clipboard
   - Download QR code as PNG image
   - Share the shortened URL anywhere

3. **Track Analytics**:
   - View click counts for your URLs
   - See creation and last access dates

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running locally or check Atlas connection string
   - Verify network access and credentials

2. **Email Not Sending**:
   - Check Resend API key is valid
   - Verify the from email domain is verified in Resend

3. **CORS Errors**:
   - Ensure frontend URL matches `FRONTEND_URL` in backend `.env`
   - Check that both servers are running

4. **Port Already in Use**:
   - Change `PORT` in backend `.env` file
   - Kill existing processes using the ports

### Development Tips

- Use `npm run dev` for auto-reload during development
- Check browser console for frontend errors
- Check terminal logs for backend errors
- Use MongoDB Compass to view database contents

## 🚢 Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment variables
2. Use production MongoDB URI
3. Configure proper BASE_URL for your domain
4. Use environment-specific email settings

### Frontend Deployment
1. Update API endpoint in frontend code
2. Build the frontend: `npm run build`
3. Deploy the `dist` folder to your hosting service

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📧 Support

For support and questions, please open an issue in the GitHub repository.