const Joi = require('joi');
const { validateRequest } = require('../utils/validateRequest');

const createSchema = (req, res, next) => {
    const locationSchema = Joi.object({
        location: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        pincode: Joi.number().required(),

    });
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        fathersName: Joi.string().required(),
        standard: Joi.number().required(),
        contact: Joi.string().required(),
        address: locationSchema
    });
    validateRequest(req, next, schema);
}

module.exports = {
    createSchema
}