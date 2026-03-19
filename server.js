const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://Worldclassshipingg:GDC9TkUd3tW5VYIZ@cluster0.wqutkjs.mongodb.net/worldclassshipingg?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Order Schema
const orderSchema = new mongoose.Schema({
  package: { type: String, required: true },
  uid: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// API Routes
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { package, uid, code } = req.body;
    const newOrder = new Order({ package, uid, code });
    await newOrder.save();
    res.json({ message: 'Order saved!', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ message: 'Updated!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ FIXED: Use dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
