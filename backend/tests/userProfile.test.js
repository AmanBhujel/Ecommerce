const { createUserProfile } = require('../controllers/userProfileController');
const fs = require('fs');
const db = require('../config/databaseConnection');

// Mock the database connection and response object
jest.mock('../config/databaseConnection');
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mock fs.unlink to avoid actual file deletion during tests
jest.mock('fs');
const mockFsUnlink = jest.fn();
fs.unlink = mockFsUnlink;


describe('createUserProfile', () => {
    //updating user profile
    it('should create a user profile', async () => {
        db.execute.mockResolvedValueOnce([
            [
                {
                    id: 1,
                    name: 'Existing User',
                    phone: '1234567890',
                    address: '123 Old St',
                    email: 'test@example.com',
                    image: 'userProfiles/oldImage.jpg',
                },
            ],
        ]);
        db.execute.mockResolvedValueOnce([
            {
                affectedRows: 1,
            },
        ]);

        const req = {
            body: {
                name: 'Test User',
                phone: '1234567890',
                address: '123 Main St',
                email: 'test@example.com',
            },
            file: {
                filename: 'testImage.jpg',
            },
        };

        const res = mockResponse();

        await createUserProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'User profile is created' });
    });

    //if there is no email
    it('should handle the case when email does not exist', async () => {
        db.execute.mockResolvedValueOnce([]);
        const req = {
            body: {
                name: 'Test User',
                phone: '1234567890',
                address: '123 Main St',
                email: 'nonexistent@example.com',
            },
            file: {
                filename: 'testImage.jpg',
            },
        };
        const res = mockResponse();
        await createUserProfile(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Email does not exist' });
    });
});
