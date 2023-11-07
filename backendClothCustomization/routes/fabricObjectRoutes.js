const express=require('express');
const router=express.Router();
const {getFabricObject,storeFabricObject}=require('../controllers/fabricObjectsController')

router.post('/store-fabric-objects',storeFabricObject);
router.get('/get-fabric-objects', getFabricObject);

module.exports=router;
