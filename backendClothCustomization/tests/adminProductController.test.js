const { addProduct, deleteProduct, updateProduct } = require('../controllers/productController/adminProductController');

// Mocking the database connection
jest.mock('../config/databaseConnection', () => ({
    execute: jest.fn(),
}));

// Mocking the Express response object
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

//Testing adding products
describe('adding products', () => {
    it('should add products in database', async () => {
        require('../config/databaseConnection').execute.mockResolvedValue([[]]);

        const req = {
            body: {
                name: 'Akatsuki Itachi Hoodie',
                stock: 6,
                description: `The cotton premium hoodie is a must-have addition to your wardrobe. Crafted from top-quality, soft cotton fabric, it provides unparalleled comfort that you'll love wearing all day. With its classic design, complete with a front kangaroo pocket and a snug hood, it's not only cozy but also stylish.`,
                features: [
                    'Premium Quality Fabric',
                    'Modern Fit',
                    'Ideal for All Seasons',
                ],
                price: 2700,
                images: [
                    '/akatsukiHoodie.png',
                    '/itachiHoodie.png',
                ],
                designable: false,
                colors: ['black'],
                sizes: ['S', 'M', 'L', 'XL'],
                fabric: ['Cotton', 'Polyester Blend']
            },
        };

        const res = mockResponse();
        await addProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Product added successfully' });
    })
});

//Testing deleting products
describe('deleting products', () => {
    it('should delete products in database', async () => {
        require('../config/databaseConnection').execute.mockResolvedValue([[
            {
                id: 1,
                name: 'Akatsuki Itachi Hoodie',
                stock: 6,
                description: `The cotton premium hoodie is a must-have addition to your wardrobe. Crafted from top-quality, soft cotton fabric, it provides unparalleled comfort that you'll love wearing all day. With its classic design, complete with a front kangaroo pocket and a snug hood, it's not only cozy but also stylish.`,
                features: [
                    'Premium Quality Fabric',
                    'Modern Fit',
                    'Ideal for All Seasons',
                ],
                price: 2700,
                images: [
                    '/akatsukiHoodie.png',
                    '/itachiHoodie.png',
                ],
                designable: false,
                colors: ['black'],
                sizes: ['S', 'M', 'L', 'XL'],
                fabric: ['Cotton', 'Polyester Blend']
            }
        ]]);

        const mockReq = {
            params: {
                id: 1,
            },
        };
        const res = mockResponse();
        await deleteProduct(mockReq, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ message: "Deleted successfully." });
    })
});

//Testing updating products
describe('updateProduct Function', () => {
    it('should update a product in the database', async () => {
        const mockReq = {
            body: {
                id: 1, // Replace with an existing product ID
                name: 'Updated Product Name',
                stock: 10,
                description: 'Updated product description',
                price: 999.99,
                designable: true,
                features: ['Updated Feature 1', 'Updated Feature 2'],
                images: ['/updated_image1.jpg', '/updated_image2.jpg'],
                colors: ['Updated Color 1', 'Updated Color 2'],
                sizes: ['Updated Size 1', 'Updated Size 2'],
                fabric: ['Updated Fabric 1', 'Updated Fabric 2'],
            },
        };

        const mockDbResponse = [
            {
                id: 1,
                name: 'Original Product Name',
                stock: 5,
                description: 'Original product description',
                price: 499.99,
                designable: false,
            },
        ];

        require('../config/databaseConnection').execute.mockResolvedValue([mockDbResponse]);
        const mockRes = mockResponse();
        await updateProduct(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Product updated successfully' });
    });
});