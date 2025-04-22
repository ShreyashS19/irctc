const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


const trainSchema = new mongoose.Schema({
  name: String,
  from: String,
  to: String,
  departure: String,
  arrival: String,
  duration: String,
  price: String,
});

const Train = mongoose.model('Train', trainSchema);


const ticketSchema = new mongoose.Schema({
  id: String,
  train: String,
  from: String,
  to: String,
  date: String,
  time: String,
  seat: String,
  price: String,
});

const Ticket = mongoose.model('Ticket', ticketSchema);


const seedTrains = async () => {
  const trainsCount = await Train.countDocuments();
  if (trainsCount === 0) {
    const initialTrains = [
      {
        name: "Express 101",
        from: "Solapur",
        to: "Pune",
        departure: "08:00 AM",
        arrival: "12:30 PM",
        duration: "4h 30m",
        price: "₹650",
      },
      {
        name: "Superfast 202",
        from: "Solapur",
        to: "Pune",
        departure: "11:00 AM",
        arrival: "03:45 PM",
        duration: "4h 45m",
        price: "₹720",
      },
      {
        name: "Intercity 303",
        from: "Solapur",
        to: "Pune",
        departure: "02:15 PM",
        arrival: "06:30 PM",
        duration: "4h 15m",
        price: "₹600",
      },
      {
        name: "Night Train 404",
        from: "Pune",
        to: "Solapur",
        departure: "10:00 PM",
        arrival: "02:30 AM",
        duration: "4h 30m",
        price: "₹700",
      },
    ];
    await Train.insertMany(initialTrains);
    console.log('Initial train data seeded:', initialTrains);
  } else {
    console.log('Train data already seeded, count:', trainsCount);
    const allTrains = await Train.find();
    // console.log('Current trains in DB:', allTrains); 
  }
};
seedTrains();


app.get('/api/trains', async (req, res) => {
  const trains = await Train.find();
  console.log('All trains fetched:', trains); // Debug log
  res.json(trains);
});

// Search trains by from, to, and date (simplified to return all for now)
app.get('/api/trains/search', async (req, res) => {
  const { from, to, date } = req.query;
  console.log('Search params:', { from, to, date }); // Debug log
  const trains = await Train.find(); // Return all trains for testing
  console.log('All trains returned for search:', trains); // Debug log
  res.json(trains);
});

// Book a ticket
app.post('/api/tickets', async (req, res) => {
  const ticket = new Ticket({ ...req.body, id: `TCKT${Date.now()}` });
  await ticket.save();
  res.status(201).json(ticket);
});

// Get all tickets
app.get('/api/tickets', async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

// Delete a ticket
app.delete('/api/tickets/:id', async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));