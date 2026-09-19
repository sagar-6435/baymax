const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    phone: { type: String, default: '' },
    dob: { type: String, default: '' },
    age: { type: Number },
    bloodGroup: { type: String, default: '' },
    gender: { type: String, default: '' },
    address: { type: String, default: '' },
    onboarding: {
      completed: { type: Boolean, default: false },
      skipped: { type: Boolean, default: false }
    },
    height: {
      value: { type: Number },
      unit: { type: String, default: 'cm' }
    },
    weight: {
      value: { type: Number },
      unit: { type: String, default: 'kg' }
    },
    health: {
      allergies: [{ type: String }],
      otherAllergy: { type: String, default: '' },
      chronicConditions: [{ type: String }],
      otherHealthCondition: { type: String, default: '' },
      medications: [
        {
          name: { type: String, required: true },
          dosage: { type: String, default: '' },
          frequency: { type: String, default: '' },
          time: { type: String, default: '' }
        }
      ],
      diet: { type: String, default: '' }
    },
    emergencyContacts: [
      {
        name: { type: String, required: true },
        relation: { type: String, required: true },
        phone: { type: String, required: true }
      }
    ],
    inAppNotifications: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        message: { type: String, required: true },
        time: { type: String, required: true },
        type: { type: String, default: 'system' }, // medical, health, learning, system
        read: { type: Boolean, default: false }
      }
    ],
    aiChatHistory: [
      {
        id: { type: String, required: true },
        role: { type: String, required: true }, // 'user' or 'bot'
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
