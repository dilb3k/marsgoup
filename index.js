const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbPassword = 'dilbek1233';
const dbURI = `mongodb+srv://dilbek:${dbPassword}@cluster0.e4cc6t9.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`;

async function connectToDatabase() {
    try {
        await mongoose.connect(dbURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        });
        console.log('MongoDBga ulandi ✅');
        return true;
    } catch (err) {
        console.error('MongoDB ulanmasligi ❌:', err.message);
        return false;
    }
}

// Schemas
const userSchema = new mongoose.Schema({
    id: String,
    fullname: String,
    gmail: String,
    password: String,
    favoriteItems: [String],
    orders: [Object],
    historyOfOrders: [Object],
    creditCard: [Object],
    locations: [Object],
    notifications: [Object]
});

const chatSchema = new mongoose.Schema({
    id: String,
    send_at: String,
    user_id: String,
    admin_id: String,
    status: String,
    text: String,
});

const productSchema = new mongoose.Schema({
    id: String,
    img: String,
    title: String,
    price: String,
    rating: String,
    categories: String,
    about: String,
    reviews: [{
        id: String,
        rating: String,
        comment: String,
        userName: String,
        date: String
    }],
    sizes: [{
        id: String,
        size: String,
        count: String
    }]
});

// Models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Chat = mongoose.model('Chat', chatSchema);

// === USER ROUTES ===
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) return res.status(404).json({ message: 'User topilmadi' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndReplace({ id: req.params.id }, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.patch('/api/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'User o‘chirildi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// === PRODUCT ROUTES ===
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) return res.status(404).json({ message: 'Product topilmadi' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndReplace({ id: req.params.id }, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.patch('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Product o‘chirildi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// === CHAT ROUTES ===
app.get('/api/chats', async (req, res) => {
    try {
        const chats = await Chat.find();
        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/chats/:id', async (req, res) => {
    try {
        const chat = await Chat.findOne({ id: req.params.id });
        if (!chat) return res.status(404).json({ message: 'Chat topilmadi' });
        res.json(chat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/chats', async (req, res) => {
    try {
        const newChat = new Chat(req.body);
        await newChat.save();
        res.status(201).json(newChat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.patch('/api/chats/:id', async (req, res) => {
    try {
        const updatedChat = await Chat.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.json(updatedChat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/chats/:id', async (req, res) => {
    try {
        await Chat.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Chat o‘chirildi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// === SERVER START ===
const PORT = process.env.PORT || 3001;

async function startServer() {
    const connected = await connectToDatabase();
    if (connected) {
        app.listen(PORT, () => {
            console.log(`🚀 Server http://localhost:${PORT} da ishlayapti`);
        });
    } else {
        console.log('❌ Serverni ishga tushirib bo‘lmadi: MongoDB ulanmagan');
    }
}

startServer();
