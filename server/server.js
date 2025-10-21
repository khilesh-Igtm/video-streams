const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
const cors = require('cors')
const authRoutes = require('./routes/authRoutes.js')
const videoRoutes = require('./routes/videoRoutes.js')

dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // your frontend
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes)



// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
