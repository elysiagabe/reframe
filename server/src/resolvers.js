const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('./utils/validate.js');
const { SECRET } = require('../config.js');
const Label = require('./models/Label.js');
const Entry = require('./models/Entry.js');
const User = require('./models/User.js');

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
    }, SECRET, { expiresIn: '2h' });
}

module.exports = {
    Query: {
        test: () => "Testing 1-2-3",
        labels: async () => {
            try {
                const labels = await Label.find();
                return labels
            } catch (err) {
                throw new Error(err)
            }
        },
        label: async (_, { id }) => {
            try {
                const label = await Label.findById(id);
                if (label) {
                    return label
                } else {
                    throw new Error('Label not found :(')
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        createLabel: async (_, { name, def, example }) => {
            const newLabel = new Label({
                name,
                def,
                example
            })

            await newLabel.save();
            return newLabel
        },

        login: async (_, { email, password }) => {
            // Validate login data 
            const { errors, valid } = validateLoginInput(email, password);
            if(!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // Check to see if account exists & password is correct 
            const user = await User.findOne({ email })
            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('Account not found', { errors });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Incorrect password';
                throw new UserInputError('Incorrect password', { errors });
            }
            // Create auth token
            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        register: async (_, { registerInput: { email, password, confirmPassword } }) => {
            // Validate user data (make sure to have server validation)
            const { valid, errors } = validateRegisterInput(email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // Make sure user email doesn't already exist in the db
            const acct = (await User.findOne({ email }));
            if (acct) {
                throw new UserInputError(`${email} is taken: ${acct}`, {
                    errors: {
                        email: 'This email is taken'
                    }
                })
            }
            // Hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                password
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}