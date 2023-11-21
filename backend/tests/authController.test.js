const { signUp, login } = require('../controllers/authController');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Mocking the database connection
jest.mock('../config/databaseConnection', () => ({
  execute: jest.fn(),
}));

describe('User Authentication Tests', () => {
  // Mocking bcrypt functions
  jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
  }));

  // Mocking jwt.sign function
  jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
  }));

  // Mocking the Express response object
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  // Helper function to sign up a user
  const signUpUser = async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      },
    };

    const res = mockResponse();

    require('../config/databaseConnection').execute.mockResolvedValue([[]]);
    require('bcrypt').hash.mockResolvedValue('hashed-password');
    await signUp(req, res);
    return res;
  };


  // Test sign up function
  describe('signUp', () => {
    it('should sign up a new user', async () => {
      const res = await signUpUser();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
    });
  });

  // Test login function
  describe('login', () => {
    it('should log in a user with valid credentials', async () => {
      const req = {
        body: {
          email: 'johndoe@example.com',
          password: 'password123',
        },
      };

      const res = mockResponse();

      bcrypt.compare = jest.fn(async (password, hashedPassword) => {
        return true;
      });
      const expectedToken = jwt.sign({ userId: 1, email: req.body.email }, process.env.JWT_TOKEN_KEY);
      require('jsonwebtoken').sign.mockReturnValue(expectedToken);

      require('../config/databaseConnection').execute.mockResolvedValue([
        [{
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'hashed-password',
        }]
      ]);

      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', token: expectedToken });
    });

  });

  // Add more test cases, such as handling invalid credentials and user not found.
  it('should handle user not found', async () => {
    const req = {
      body: {
        email: 'nonexistent@example.com',
        password: 'password123',
      },
    };
    const res = mockResponse();
    require('../config/databaseConnection').execute.mockResolvedValue([[]]);
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });
});

