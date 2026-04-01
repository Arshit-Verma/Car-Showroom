# Argar Wheels - Premium Car Dealer Website

A full-stack car dealership website with AI chatbot, MongoDB integration, and email functionality.

## Features

1. **AI Chatbot** - Gemini-powered chatbot for customer assistance
2. **Contact Form** - Formspree integration for sending messages
3. **Vehicle Management** - MongoDB database for storing and displaying vehicles
4. **Responsive Design** - Mobile-friendly interface
5. **Dynamic Vehicle Pages** - Browse and view detailed vehicle information

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Google Generative AI (Gemini)

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

## Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- Google Gemini API key

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` file:

```env
# Server Configuration
PORT=3000

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string_here

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Getting API Keys

#### MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string from "Connect" > "Connect your application"
4. Format: `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>`

#### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

### 4. Seed the Database

Add 10 sample cars to your database:

```bash
npm run seed
```

### 5. Start the Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

The server will start at `http://localhost:3000`

## Project Structure

```
PROJECT/
├── server/
│   ├── index.js              # Express server setup
│   ├── models/
│   │   └── Car.js            # Car schema
│   ├── routes/
│   │   ├── cars.js           # Car CRUD endpoints
│   │   └── chat.js           # Gemini chatbot endpoint
│   └── seed/
│       └── seedCars.js       # Database seeding script
├── public/
│   ├── index.html            # Homepage
│   ├── vehicles.html         # All vehicles page
│   ├── styles.css            # Styles
│   ├── js/
│   │   ├── chatbot.js        # Chatbot UI logic
│   │   ├── contact.js        # Contact form handler
│   │   └── vehicles.js       # Vehicles page logic
├── images/                   # Car images
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies
└── README.md                 # This file
```

## API Endpoints

### Cars
- `GET /api/cars` - Get all available cars
- `GET /api/cars/:id` - Get single car details
- `POST /api/cars` - Create new car (for admins)
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

### Chat
- `POST /api/chat` - Send message to chatbot
  - Body: `{ "message": "your question" }`
  - Response: `{ "success": true, "reply": "bot response" }`

## Usage

1. **Homepage** - Browse featured vehicles, services, and reviews
2. **Vehicles Page** - Click "VEHICLES" in menu to see all cars
3. **View Details** - Click "Show Details" on any car to see full information
4. **Chatbot** - Click the chatbot icon (bottom right) to ask questions
5. **Contact Form** - Fill out the contact form to send an email

## Features Breakdown

### 1. Chatbot (Bottom Right)
- Powered by Google Gemini AI
- Context-aware responses about cars and dealership
- Rate-limited to prevent abuse
- Beautiful popup interface

### 2. Contact Form
- Client-side Formspree integration
- Form validation
- Success/error notifications
- Sends to your configured Formspree email

### 3. Vehicle Management
- Cars stored in MongoDB
- Dynamic rendering from database
- Image support
- Detailed specifications
- Modal popup for full details

### 4. Responsive Design
- Mobile-friendly navigation
- Adaptive layouts
- Touch-optimized interactions

## Security Features

- Environment variables for sensitive data
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet.js security headers

## Troubleshooting

### MongoDB Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas
- Check connection string format
- Verify username/password

### Chatbot Not Working
- Verify Gemini API key is valid
- Check API quota/limits
- Look for errors in server console

### Images Not Loading
- Ensure images are in `/images` folder
- Check image filenames match database entries
- Verify file extensions (.jpg, .webp)

## Development

To add more cars:
1. Use the POST `/api/cars` endpoint, or
2. Modify `server/seed/seedCars.js` and re-run seed

## License

ISC

## Support

For issues or questions, contact: info@argarwheels.com
