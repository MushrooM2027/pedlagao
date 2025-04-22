const express = require('express');
const router = express.Router();
const UserService = require('../Services/userService');
const { registerSchema, loginSchema } = require('../Utils/userValidation');
const upload = require('../Utils/multer');
const User = require('../Models/Users')


router.post('/register', upload.single('profilePicture'), async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error:
        error.details[0].message
    })
  }
  try {
    const user = await UserService.register(req.body, req.file);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { identifier, Password } = req.body;

  if (!identifier || !Password) {
    return res.status(400).json({ error: 'Identifier and password are required' });
  }
  try {
    const user = await UserService.login({ identifier, Password });
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user along with their profile picture URL
    res.json({
      user,
      profilePicture: user.profilePicture ? `http://localhost:3000/${user.profilePicture}` : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/coinBalance/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Query the Users table to get the coin balance for the specific user
    const user = await User.findOne({
      where: { UserId: userId },
      attributes: ['Coins'], // Only fetch the Coins column
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user's coin balance
    res.json({ coinBalance: user.Coins });
  } catch (error) {
    console.error("Error fetching coin balance:", error);
    res.status(500).json({ message: "Error fetching coin balance" });
  }
});

// In userRouter.js
// router.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ error: 'Email is required' });
//   }

//   try {
//     // Check if the user exists
//     const user = await UserService.getUserByEmail(email);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Generate password reset token
//     const token = await UserService.generatePasswordResetToken(user);

//     // Send email with the token link (you can use nodemailer here)
//     // Assume you have a function `sendResetEmail` that sends an email with the link
//     const resetLink = `http://localhost:3000/reset-password/${token}`;
//     await sendResetEmail(user.email, resetLink);

//     res.status(200).json({ message: 'Password reset link sent' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


module.exports = router;