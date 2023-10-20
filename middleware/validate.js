const validator = require('../helpers/validate');

const saveCustomer = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        shippingStreet: 'required|string',
        shippingCity: 'required|string',
        shippingState: 'required|string',
        shippingPostalCode: 'required|integer',
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
        listUnitPrice: 'required|numeric',
        unitDiscountAmount: 'required|integer',
        netUnitPrice: 'required|numeric',  
        customerId: 'required|string',
        qty: 'required|integar',
        orderTotal: 'required|numeric'
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
        listPrice: 'required|integer',
        qytOnHand: 'required|integer',
        rating: 'required|integer',
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
