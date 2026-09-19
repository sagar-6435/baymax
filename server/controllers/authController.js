const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !password || (!email && !phone)) {
      return res.status(400).json({ message: 'Please provide name, password, and either email or phone' });
    }

    // Check if user exists by email (if provided) or phone (if provided)
    const query = [];
    if (email) query.push({ email });
    if (phone) query.push({ phone });

    const userExists = await User.findOne({ $or: query });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with that email or phone' });
    }

    const user = await User.create({
      name,
      email: email || undefined,
      phone: phone || '',
      password,
    });

    if (user) {
      res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          age: user.age,
          onboarding: user.onboarding,
          health: user.health,
          inAppNotifications: user.inAppNotifications,
          aiChatHistory: user.aiChatHistory,
        },
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const identifier = email;

    const user = await User.findOne({ 
      $or: [
        { email: identifier },
        { phone: identifier }
      ]
    });

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          age: user.age,
          onboarding: user.onboarding,
          health: user.health,
          inAppNotifications: user.inAppNotifications,
          aiChatHistory: user.aiChatHistory,
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const googleSignIn = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'Google ID Token is required' });
    }

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: avatar } = payload;

    // Check if user already exists
    let user = await User.findOne({ googleId });

    if (!user) {
      // Create new user if not exists
      user = await User.create({
        googleId,
        email,
        name,
        avatar,
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        age: user.age,
        onboarding: user.onboarding,
        health: user.health,
        inAppNotifications: user.inAppNotifications,
        aiChatHistory: user.aiChatHistory,
      },
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = {
  register,
  login,
  googleSignIn,
};
