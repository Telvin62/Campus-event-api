const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
let events = [];
let nextId = 1;
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Campus Event API is running' });
});
app.get('/events', (req, res) => {
  res.status(200).json(events);
});
app.post('/events', (req, res) => {
  const { title, date, location } = req.body;
  if (!title || !date || !location) {
    return res.status(400).json({ error: 'title, date, location required' });
  }
  const newEvent = { id: nextId++, title, date, location, organizer: 'TELVIN' };
  events.push(newEvent);
  res.status(201).json(newEvent);
});
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
