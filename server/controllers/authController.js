const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/index.js');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');


// REGISTER
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    // check existing user
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email=$1 OR username=$2',
      [email, username]
    );

    if (existingUser.rows.length > 0)
      return res.status(409).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const result = await pool.query(
      'INSERT INTO users (id, username, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, role',
      [id, username, email, hashed, 'user']
    );

    return res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);

    if (result.rows.length === 0)
      return res.status(401).json({ message: 'Invalid credentials' });

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in prod
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const profileController = async(req,res)=>{
   try {
    const result = await pool.query(
      'SELECT id, username, email, role FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'User not found' });

    res.json(result.rows[0]); // 👈 same format as login response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports ={
  registerUser, loginUser, profileController
}