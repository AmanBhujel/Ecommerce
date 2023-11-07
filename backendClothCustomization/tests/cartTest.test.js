// cartController.test.js
const {
    addToCart,
    deleteFromCart,
    getCartItems,
    updateCart,
} = require('../controllers/cartController');

jest.mock('../config/databaseConnection', () => ({
    execute: jest.fn(),
}));

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Cart Controller Tests', () => {
    describe('addToCart', () => {
        it('should add an item to the cart successfully', async () => {
            const req = {
                body: {
                    userId: 1,
                    productId: 2,
                    quantity: 3,
                },
            };
            const res = mockResponse();

            // // Mock the database response for execute function
            // require('../config/databaseConnection').execute.mockResolvedValueOnce([

            // ]);

            await addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Item added to cart successfully' });
        });

        // Add more test cases for error scenarios if needed
    });

    describe('deleteFromCart', () => {
        it('should remove an item from the cart successfully', async () => {
            const req = {
                body: {
                    userId: 1,
                    productId: 2,
                },
            };
            const res = mockResponse();

            await deleteFromCart(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Item removed from cart successfully' });
        });
    });

    describe('getCartItems', () => {
        it('should fetch cart items successfully', async () => {
            const req = {
                body: {
                    userId: 1,
                },
            };
            const res = mockResponse();

            const mockDbExecute = require('../config/databaseConnection').execute;
            mockDbExecute.mockResolvedValueOnce([
                {
                    "cart_id": 2,
                    "user_id": 1,
                    "product_id": 2,
                    "quantity": 1,
                    "created_at": "2023-10-07T02:01:39.000Z"
                }
            ]);

            await getCartItems(req, res);

            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledWith(
                {
                    "cart_id": 2,
                    "user_id": 1,
                    "product_id": 2,
                    "quantity": 1,
                    "created_at": "2023-10-07T02:01:39.000Z"
                }
            );
        });
    });

    describe('updateCart', () => {
        it('should update cart item quantity successfully', async () => {
            const req = {
                body: {
                    userId: 1,
                    productId: 2,
                    quantity: 5,
                },
            };
            const res = mockResponse();

            require('../config/databaseConnection').execute.mockResolvedValueOnce([
                {
                    "cart_id": 1,
                    "user_id": 1,
                    "product_id": 2,
                    "quantity": 1,
                    "created_at": "2023-10-07T02:01:39.000Z"
                }
            ]);

            await updateCart(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Cart item updated successfully' });
        });

    });
});
