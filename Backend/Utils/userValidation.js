const Joi = require('joi');

const registerSchema = Joi.object({
    Name: Joi.string().min(3).required().pattern(/^[A-Za-z]+$/).message({ 'string.pattern.base': 'Name can only contain letters.' }),
    Username: Joi.string().min(3).required().pattern(/^[a-zA-Z0-9._-]+$/).messages({
        'string.pattern.base': 'Username can only contain letters, numbers, dots (.), underscores (_), and hyphens (-).',
        'string.min': 'Username must be at least 3 characters long.',
        'any.required': 'Username is required.'
    }),
    Phone: Joi.string().length(10).optional().pattern(/^[0-9]{10}$/).allow(``, null),
    Email: Joi.string().required().email(),
    Password: Joi.string().min(8).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ).message({
        'string.pattern.base': 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (@, $, !, %, *, ?, &).',
        'any.required': 'Password is required.'
    }),
    City: Joi.string().optional().allow(``, null),
    ProfilePicture: Joi.string().uri().optional().allow(``, null)
});

const loginSchema = Joi.object({
    Email: Joi.string().required(),
    Password: Joi.string().required()
})

module.exports = { registerSchema, loginSchema };
