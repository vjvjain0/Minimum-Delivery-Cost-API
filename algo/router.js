const router = require('express').Router();
const calculateCost = require('./controller');

router.get('/',(req,res) =>{
	calculateCost(req,res);
});

module.exports = router;