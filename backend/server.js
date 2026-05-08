const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI && process.env.DB_USER && process.env.DB_PASS) {
    MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kbgngea.mongodb.net/sunnah_stream?retryWrites=true&w=majority`;
} else if (!MONGO_URI) {
    MONGO_URI = 'mongodb://demo:12345/business_db';
}

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(MONGO_URI, clientOptions)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => {
        if (process.env.USE_MOCK_DATA === 'true') {
            console.warn('MongoDB connection failed. Running in MOCK MODE with local JSON data.');
        } else {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        }
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

app.get('/', (req, res) => {
    res.send('E-commerce API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
