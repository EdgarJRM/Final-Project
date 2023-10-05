const router = require('express').Router();

router.use('/', require('./swagger'));

//console.log('test');
router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Welcome to the Awesom Mart API.');});

router.use('/customers',require('./customers'));

router.use('/orders',require('./orders'));

router.use('/products',require('./products'));

router.use('/vendors',require('./vendors'));

module.exports = router;