const validator = require('../helpers/validate');

const saveCustomer = (req, res, next) => {
    const validationRule = {

        //ADD MAPPING HERE
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
       
        //ADD MAPPING HERE
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
       
        //ADD MAPPING HERE
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
       
        //ADD MAPPING HERE
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
