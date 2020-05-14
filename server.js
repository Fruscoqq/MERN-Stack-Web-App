const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connectong DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// Serve React in production
if (process.env.NODE.ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// Define Routes
// app.use('/api/home', require('./routes/home'))
app.use('/api/register', require('./routes/register'))
app.use('/api/teachers', require('./routes/teachers'))
app.use('/api/students', require('./routes/students'))
app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})