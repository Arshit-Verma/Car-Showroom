# SETUP INSTRUCTIONS FOR ARGAR WHEELS PROJECT

## ✅ What Has Been Built

### Backend (Node.js + Express + MongoDB)
- ✅ Express server with security middleware
- ✅ MongoDB Car model with Mongoose
- ✅ API routes for cars (CRUD operations)
- ✅ Gemini AI chatbot integration
- ✅ Database seeding script for 10 cars
- ✅ Rate limiting and security features

### Frontend (HTML + CSS + JavaScript)
- ✅ Updated homepage (inventory section removed)
- ✅ New dedicated vehicles page (vehicles.html)
- ✅ Chatbot UI (bottom-right icon with popup)
- ✅ Contact form with Formspree integration
- ✅ Dynamic vehicle rendering from MongoDB
- ✅ Responsive design

### Configuration
- ✅ package.json with all dependencies installed
- ✅ .gitignore 
- ✅ .env.example template
- ✅ README.md with full documentation

## 🚀 Next Steps - YOU NEED TO DO THESE

### Step 1: Create Your .env File

Create a file named `.env` in the project root with your actual credentials:

```env
PORT=3000
MONGODB_URI=your_actual_mongodb_connection_string
GEMINI_API_KEY=your_actual_gemini_api_key
```

### Step 2: Get Your API Keys

#### MongoDB Atlas (for MONGODB_URI)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<dbname>` with your values

#### Google Gemini API (for GEMINI_API_KEY)
1. Go to https://aistudio.google.com/
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### Step 3: Seed the Database

Once you have MongoDB configured, run:

```bash
npm run seed
```

This will add 10 sample cars to your database.

### Step 4: Start the Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

### Step 5: Open in Browser

Navigate to: `http://localhost:3000`

## 📋 Project Structure

```
PROJECT/
├── server/
│   ├── index.js                 # Main server file
│   ├── models/Car.js            # MongoDB car schema
│   ├── routes/
│   │   ├── cars.js              # Car API endpoints
│   │   └── chat.js              # Chatbot API endpoint
│   └── seed/seedCars.js         # Database seeding script
├── public/
│   ├── index.html               # Homepage (inventory removed)
│   ├── vehicles.html            # All vehicles page
│   ├── styles.css               # All styles
│   └── js/
│       ├── chatbot.js           # Chatbot functionality
│       ├── contact.js           # Contact form with Formspree
│       └── vehicles.js          # Vehicles page logic
├── images/                      # All images required
├── .env                         # YOUR SECRETS (create this!)
├── .env.example                 # Template for .env
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies (installed)
├── README.md                    # Full documentation
└── SETUP_INSTRUCTIONS.md        # This file
```

## 🎯 Features Summary

### 1. Chatbot 
- Small icon in bottom-right corner (using /images/chatbot icon.png)
- Click to open popup chat interface
- Powered by Google Gemini AI
- Context-aware responses about cars and dealership
- Server-side API key protection

### 2. Contact Form 
- Formspree integration (client-side)
- Collects: name, email, subject, message
- Sends email to your Formspree endpoint
- Form validation and error handling
- Success/error notifications

### 3. MongoDB Integration 
- Car model with fields: make, model, year, price, mileage, fuelType, transmission, description, imageFilename, features, color, owners
- CRUD API endpoints
- Seed script with 10 sample cars
- Images reference existing files in /images/

### 4. Vehicles Page (✅ Implemented)
- Main menu "VEHICLES" link opens /vehicles.html (same tab)
- Fetches all cars from MongoDB API
- Displays car grid with images
- "Show Details" button opens modal with full car info
- Responsive design

### 5. Homepage Updates (✅ Implemented)
- "Our Vehicle Inventory" section removed
- Chatbot icon and scripts added
- Contact form connected to Formspree
- Main menu updated to link to vehicles.html

### 6. Security (✅ Implemented)
- .env file in .gitignore
- API keys stored server-side
- Rate limiting on chat and API endpoints
- Helmet.js security headers
- Input validation and sanitization

## 🧪 Testing

### Test Chatbot
1. Look for chatbot icon in bottom-right
2. Click to open chat
3. Type a message like "Tell me about your cars"
4. Should get AI response

### Test Contact Form
1. Scroll to Contact section
2. Fill out all 4 fields
3. Click "Send Message"
4. Should see success message and receive email

### Test Vehicles Page
1. Click "VEHICLES" in main menu
2. Should see grid of 10 cars from database
3. Click "Show Details" on any car
4. Modal should open with full details

## 🐛 Troubleshooting

### "MongoDB connection error"
- Check MONGODB_URI in .env
- Ensure IP is whitelisted in MongoDB Atlas
- Verify username/password

### "Chatbot not responding"
- Verify GEMINI_API_KEY in .env
- Check API quota/limits on Google AI Studio
- Look for errors in terminal

### "Contact form not sending"
- Verify Formspree endpoint is correct
- Check browser console for errors
- Ensure form fields match Formspree field names

### "No cars showing"
- Run `npm run seed` to add sample data
- Check MongoDB connection
- Look for errors in browser console

## 📝 Notes

- The chatbot icon image is at `/images/chatbot icon.png`
- Car images are car1.jpg through car5.webp in /images/
- Server runs on port 3000 by default
- All sensitive data goes in .env (never commit this!)

## ✨ You're All Set!

Once you complete Steps 1-5 above, your car dealership website will be fully functional with:
- AI chatbot
- Email contact form with Formspree
- MongoDB vehicle database
- Dynamic vehicle browsing

Good luck! 🚗💨
