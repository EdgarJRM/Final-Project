const { number } = require('yargs');
const validator = require('../helpers/validate');
const { Decimal128 } = require('bson');

const saveCustomer = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        shippingStreet: 'required|string',
        shippingCity: 'required|string',
        shippingState: 'required|string',
        shippingPostalCode: 'required|number',
        birthday: 'required|date' 
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};  

const saveOrder = (req, res, next) => {
    const validationRule = {
        productCode: 'required|string',
        listUnitPrice: 'required|currency',
        unitDiscountAmount: 'required|number',
        netUnitPrice: 'required|currency',  
        customerId: 'required|string',
        qty: 'required|number',
        orderTotal: 'required|currency'
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

const saveProduct = (req, res, next) => {
    const validationRule = {
        productName: 'required|string',
        productCode: 'required|string',
        listPrice: 'required|Decimal128',
        qytOnHand: 'required|integar',
        rating: 'required|integar',
        bin: 'required|string',
        vendor: 'required|string'
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

const saveVendor = (req, res, next) => {    
    const validationRule = {
        companyName:'require/string',
        hqState: 'require/string',
        phone: 'require/string',
        email: 'require/email',
        contractStartDate: 'require/date', 
        contractEndDate: 'require/date',
        mainContact: 'require/string' 
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};


module.exports = {
    saveCustomer,
    saveOrder,
    saveProduct,
    saveVendor
};
