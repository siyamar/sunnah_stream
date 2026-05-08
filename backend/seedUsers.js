const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kbgngea.mongodb.net/sunnah_stream?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, { serverApi: { version: '1', strict: true, deprecationErrors: true } })
  .then(async () => {
    console.log('Connected to MongoDB for seeding users');
    
    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@sunnahstream.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@sunnahstream.com',
        password: 'password123',
        role: 'admin'
      });
      console.log('Admin user created successfully');
      console.log('Email: admin@sunnahstream.com');
      console.log('Password: password123');
    } else {
      console.log('Admin user already exists. Email: admin@sunnahstream.com, Password: password123 (or what you changed it to)');
    }
    
    process.exit();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
