const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        dob: user.dob,
        age: user.age,
        bloodGroup: user.bloodGroup,
        gender: user.gender,
        address: user.address,
        onboarding: user.onboarding,
        height: user.height,
        weight: user.weight,
        health: user.health,
        emergencyContacts: user.emergencyContacts,
        inAppNotifications: user.inAppNotifications,
        aiChatHistory: user.aiChatHistory,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.avatar = req.body.avatar || user.avatar;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      user.dob = req.body.dob !== undefined ? req.body.dob : user.dob;
      user.age = req.body.age !== undefined ? req.body.age : user.age;
      user.bloodGroup = req.body.bloodGroup !== undefined ? req.body.bloodGroup : user.bloodGroup;
      user.gender = req.body.gender !== undefined ? req.body.gender : user.gender;
      user.address = req.body.address !== undefined ? req.body.address : user.address;
      
      if (req.body.onboarding) user.onboarding = req.body.onboarding;
      if (req.body.height) user.height = req.body.height;
      if (req.body.weight) user.weight = req.body.weight;
      
      if (req.body.health) {
        user.health = req.body.health;
      }
      
      if (req.body.emergencyContacts) {
        user.emergencyContacts = req.body.emergencyContacts;
      }
      
      if (req.body.inAppNotifications) {
        user.inAppNotifications = req.body.inAppNotifications;
      }

      if (req.body.aiChatHistory) {
        user.aiChatHistory = req.body.aiChatHistory;
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        phone: updatedUser.phone,
        dob: updatedUser.dob,
        age: updatedUser.age,
        bloodGroup: updatedUser.bloodGroup,
        gender: updatedUser.gender,
        address: updatedUser.address,
        onboarding: updatedUser.onboarding,
        height: updatedUser.height,
        weight: updatedUser.weight,
        health: updatedUser.health,
        emergencyContacts: updatedUser.emergencyContacts,
        inAppNotifications: updatedUser.inAppNotifications,
        aiChatHistory: updatedUser.aiChatHistory,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile };
