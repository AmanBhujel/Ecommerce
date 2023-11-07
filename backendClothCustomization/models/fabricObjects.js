const db = require('../config/databaseConnection');

//------more info left to add------------
// order_id
//  user_id
//  margins
//  dimensions


const createFabricObjectTable = async () => {
    try {
        await db.execute(`CREATE TABLE fabric_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            data TEXT
        );`)
        console.log('fabricObjects table created.');

    } catch (error) {
        console.log(error);
    }
};
module.exports = createFabricObjectTable;
