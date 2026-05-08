const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kbgngea.mongodb.net/sunnah_stream?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, { serverApi: { version: '1', strict: true, deprecationErrors: true } })
  .then(async () => {
    console.log('Connected to MongoDB for seeding orders');

    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.error('No admin user found. Please run seedUsers.js first.');
      process.exit(1);
    }

    const products = await Product.find({});
    if (products.length === 0) {
      console.error('No products found. Please run seed.js first.');
      process.exit(1);
    }

    await Order.deleteMany({});
    console.log('Cleared existing orders');

    const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    const ordersToInsert = [];

    for (let i = 0; i < 25; i++) {
      // Randomize date within the last 6 months
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 180));

      // Pick 1 to 3 random products
      const numItems = Math.floor(Math.random() * 3) + 1;
      const items = [];
      let totalAmount = 0;

      for (let j = 0; j < numItems; j++) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 2) + 1;
        items.push({
          product: randomProduct._id,
          quantity,
          price: randomProduct.price
        });
        totalAmount += randomProduct.price * quantity;
      }

      ordersToInsert.push({
        user: adminUser._id,
        items,
        totalAmount,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        shippingAddress: {
          street: '123 Sunnah St',
          city: 'Mecca',
          state: 'Makkah',
          zip: '24231',
          country: 'Saudi Arabia'
        },
        paymentStatus: 'Paid',
        createdAt: pastDate
      });
    }

    await Order.insertMany(ordersToInsert);
    console.log(`Successfully seeded ${ordersToInsert.length} orders`);
    process.exit();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
