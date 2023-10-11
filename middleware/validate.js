const validator = require('../helpers/validate');

const saveCustomer = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        phoneNumber: 'required|numeric' 
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
        number: 'required|numeric',
        date: 'required|date',
        total: 'required|numeric'
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
        name: 'required|string',
        department: 'required|string',
        retailPrice: 'required|numeric',
        cost: 'required|numeric',
        vendorName: 'required|string',
        color: 'required|string',
        qtyInStock: 'required|integer'
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
        name: 'required|string',
        email: 'required|email',
        phoneNumber: 'required|numeric'
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
