const db = require('../config/databaseConnection');
const fs = require('fs');

//creating user profile 
const createUserProfile = async (req, res) => {
  try {
    const { phone, address, email } = req.body;
    const imagePath = req.file ? `userProfiles/${req.file.filename}` : 'userProfiles/defaultUserAvatar.png';
    if (req.file) {
      await deleteOldProfilePhoto(email);
    }
    try {
      const [existingUserData] = await db.execute(
        'SELECT email FROM users WHERE email = ?',
        [email]
      );
      await db.execute(
        `UPDATE users
               SET phone = ?, address = ?, image = ?
               WHERE email = ?`,
        [phone, address, imagePath, email]
      );
      res.status(201).json({ message: 'User profile is created' });
    } catch (error) {
      console.log('Email does not exist');
      return res.status(404).json({ error: 'Email does not exist' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to delete a photo by its file path
const deletePhoto = (filePath) => {
  fs.unlink(`public/${filePath}`, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
    } else {
      console.log(`File deleted: ${filePath}`);
    }
  });
};

// Function to delete old profile photo when a user updates their picture
const deleteOldProfilePhoto = async (email) => {
  try {
    const [existingUserData] = await db.execute(
      'SELECT image FROM users WHERE email = ?',
      [email]
    );

    if (existingUserData) {
      const oldPhotoPath = existingUserData[0].image;
      if (oldPhotoPath) {
        deletePhoto(oldPhotoPath);
      }
    }
  } catch (error) {
    console.error(`Error deleting old profile photo: ${error.message}`);
  }
};

const getUserProfile = async (req, res) => {
  const { userId } = req.user;
  const sql = 'SELECT id, name, email, phone, address FROM users WHERE id = ?';
  try {
    const [userData] = await db.execute(sql, [userId]);
    console.log(userData);

    res.json(userData).status(200);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// const getUserImage = async (req, res) => {
//   const { userId } = req.user;
//   const sql = 'SELECT image FROM users WHERE id = ?';
//   try {
//     const [userImage] = await db.execute(sql, [userId]);
//     console.log(userImage);
//     res.json(userImage).status(200);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }



module.exports = { createUserProfile, getUserProfile }