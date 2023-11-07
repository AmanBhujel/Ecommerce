const db = require('../config/databaseConnection');

//---------How to use in frontend---------
// get fabricObjects from the route path
// display as image on top of cloth image and you can even save margins and image width height all neccessary measurements  to display exactly on top of cloth


// storing fabric design as image in frontend
const storeFabricObject=async()=>{
    try {
        const {fabricURL} = req.body;
        console.log(fabricURL)
        await db.execute('INSERT INTO fabric_data (data) VALUES (?)',[fabricURL]);


        console.log('Stored fabric data');
        res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
        console.error('Error storing fabric data:', error);
        res.status(500).json({ error: 'Error storing data' });
    }
};

// getting fabric design as image in frontend
const getFabricObject=async()=>{
    try {
        // Retrieve the serialized JSON data from the database
        const [rows] = await db.execute('SELECT * FROM fabric_data where id=2');

        if (rows.length === 0) {
            res.status(404).json({ error: 'No fabric data found' });
        } else {
            const serializedData = rows[0].data;

            // Parse the JSON string back into an array
            const fabricObjects = serializedData;
            res.status(200).json(fabricObjects);
        }
    } catch (error) {
        console.error('Error retrieving fabric data:', error);
        res.status(500).json({ error: 'Error retrieving data' });
    }
}
module.exports={storeFabricObject,getFabricObject};