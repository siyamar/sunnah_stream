const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kbgngea.mongodb.net/sunnah_stream?retryWrites=true&w=majority`;

const products = [
  { name: 'Minimalist Watch', description: 'A sleek and modern minimalist watch.', price: 299, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', category: 'Accessories', stock: 50, isFeatured: true },
  { name: 'Leather Tote', description: 'Premium leather tote bag.', price: 180, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', category: 'Bags', stock: 30, isFeatured: true },
  { name: 'Oversized Blazer', description: 'Comfortable oversized blazer.', price: 240, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800', category: 'Apparel', stock: 20, isFeatured: true },
  { name: 'Canvas Sneakers', description: 'Everyday canvas sneakers.', price: 120, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800', category: 'Footwear', stock: 100, isFeatured: true },
  { name: 'Classic Sunglasses', description: 'UV protection classic sunglasses.', price: 85, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800', category: 'Accessories', stock: 45, isFeatured: true },
  { name: 'Denim Jacket', description: 'Vintage style denim jacket.', price: 150, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800', category: 'Apparel', stock: 60, isFeatured: false },
  { name: 'Silk Scarf', description: 'Elegant silk scarf.', price: 45, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800', category: 'Accessories', stock: 80, isFeatured: false },
  { name: 'Running Shoes', description: 'Lightweight running shoes.', price: 130, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', category: 'Footwear', stock: 120, isFeatured: false },
  { name: 'Wool Fedora', description: 'Classic wool fedora hat.', price: 75, image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=800', category: 'Accessories', stock: 25, isFeatured: false },
  { name: 'Leather Belt', description: 'Genuine leather belt.', price: 55, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800', category: 'Accessories', stock: 90, isFeatured: false },
  { name: 'Cotton T-Shirt', description: 'Basic cotton t-shirt.', price: 25, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', category: 'Apparel', stock: 200, isFeatured: false },
  { name: 'Chino Pants', description: 'Slim fit chino pants.', price: 65, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800', category: 'Apparel', stock: 150, isFeatured: false },
  { name: 'Winter Coat', description: 'Warm winter coat.', price: 320, image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800', category: 'Apparel', stock: 40, isFeatured: false },
  { name: 'Ankle Boots', description: 'Stylish ankle boots.', price: 160, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800', category: 'Footwear', stock: 70, isFeatured: false },
  { name: 'Backpack', description: 'Durable travel backpack.', price: 110, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800', category: 'Bags', stock: 85, isFeatured: false },
  { name: 'Crossbody Bag', description: 'Compact crossbody bag.', price: 95, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800', category: 'Bags', stock: 65, isFeatured: false },
  { name: 'Silver Necklace', description: 'Sterling silver necklace.', price: 125, image: 'https://images.unsplash.com/photo-1599643478524-fb66f7ca2b6e?auto=format&fit=crop&q=80&w=800', category: 'Accessories', stock: 35, isFeatured: false },
  { name: 'Gold Ring', description: '14k gold minimal ring.', price: 210, image: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&q=80&w=800', category: 'Accessories', stock: 20, isFeatured: false },
  { name: 'Polo Shirt', description: 'Classic polo shirt.', price: 45, image: 'https://images.unsplash.com/photo-1586363104862-3a5e222ee513?auto=format&fit=crop&q=80&w=800', category: 'Apparel', stock: 110, isFeatured: false },
  { name: 'Workout Leggings', description: 'High-waist workout leggings.', price: 60, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800', category: 'Apparel', stock: 130, isFeatured: false },
  { name: 'Formal Shoes', description: 'Men\'s formal leather shoes.', price: 190, image: 'https://images.unsplash.com/photo-1614252235316-8ba613f1d3c0?auto=format&fit=crop&q=80&w=800', category: 'Footwear', stock: 50, isFeatured: false },
  { name: 'Beanie', description: 'Warm knit beanie.', price: 20, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800', category: 'Accessories', stock: 250, isFeatured: false }
];

mongoose.connect(MONGO_URI, { serverApi: { version: '1', strict: true, deprecationErrors: true } })
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    await Product.deleteMany({});
    console.log('Cleared existing products');
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);
    process.exit();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
