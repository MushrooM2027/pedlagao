const bcrypt = require('bcrypt');
const UserRepository = require('../Repositories/userRepository');
const MediaFile = require('../Models/MediaFiles');
const { sendPasswordResetEmail } = require('../Utils/emailService');

const UserService = {
  register: async (data, profilePictureFile) => {
    const existing = await UserRepository.findByUserName(data.Username);
    if (existing) throw new Error('User already exists');

    if (data.Email) {
      const existingEmail = await UserRepository.findByEmail(data.Email);
      if (existingEmail) throw new Error('Email already in use');
    }

    if (data.Phone) {
      const existingPhone = await UserRepository.findByPhone(data.Phone);
      if (existingPhone) throw new Error('Phone number already in use');
    }

    const hash = await bcrypt.hash(data.Password, 10);
    const user = await UserRepository.create({
      Name: data.Name,
      Username: data.Username,
      Phone: data.Phone,
      Email: data.Email,
      PasswordHash: hash,
      City: data.City
    });

    if (profilePictureFile) {
      await MediaFile.create(
        {
          filePath: `profilePictures/${profilePictureFile.filename}`,
          mimeType: profilePictureFile.mimetype,
          referenceId: user.UserId,
          referenceType: 'User'
        });
    }

    return user;
  },

  login: async (data) => {
    const user = await UserRepository.findByUserNameOrEmail(data.identifier);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(data.Password, user.PasswordHash);
    if (!isMatch) throw new Error('Invalid credentials');

    return { message: 'Login successful', user };
  },

  getAllUsers: async () => {
    return UserRepository.getAll();
  },

  getUserById: async (id) => {
    const user = await UserRepository.getById(id);
    if (!user) throw new Error('User not found');

    const profilePicture = await MediaFile.findOne({
      where: {
        referenceId: id,
        referenceType: 'User'
      }
    });

    // Add profile picture path to the user object
    if (profilePicture) {
      user.profilePicture = `uploads/${profilePicture.filePath}`;
    }
    return user;
  },

  generateResetToken: async (email) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error('User not found');

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await UserRepository.setResetToken(user.UserId, token, expiry);

    await sendPasswordResetEmail(email, token);

    return { message: 'Reset link sent to email' };
  }
};

module.exports = UserService;
