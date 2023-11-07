const { getProductById, getAllProducts } = require('../controllers/productController/productController'); // Replace with the correct module path

// Mock the database module
describe('getProductById Function', () => {
    it('should return a product when a valid product ID is provided', async () => {
        const mockReq = {
            params: {
                id: 1, // Replace with a valid product ID from your database
            },
        };

        const mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn(),
        };

        await getProductById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalled();
    });

    it('should return a 404 error when an invalid product ID is provided', async () => {
        const mockReq = {
            params: {
                id: -1, // Replace with an invalid product ID that doesn't exist in your database
            },
        };

        const mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn(),
        };

        await getProductById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    // Add more test cases as needed
});

describe('getAllProducts Function', () => {
    it('should return an array of products when products exist in the database', async () => {
        const mockReq = {};
        const mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn(),
        };

        await getAllProducts(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(Array.isArray(mockRes.json.mock.calls[0][0])).toBe(true);
    });
});
afterAll(async () => {
    await require('../config/databaseConnection').end();
});

