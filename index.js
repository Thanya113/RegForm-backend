const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8081;
const mongoURI = 'mongodb+srv://thanyagovindaraji:tr9MLYCbBdrLS1hq@cluster0.pjuh9ny.mongodb.net/reg-form?retryWrites=true&w=majority';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new UserModel({ username, email, password });

    await newUser.save();

    res.json({ success: true, message: 'User registered successfully', data: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.json({ success: false, message: 'Error registering user' });
  }
});

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error('Error connecting to the database:', err));
