const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError, AuthenticationError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('./utils/validate.js');
const checkAuth = require('./utils/checkAuth.js');
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
        },

        entry: async (_, { id }) => {
            try {
                const entry = await Entry.findById(id);
                if(entry) {
                    return entry;
                } else {
                    throw new Error('Entry not found');
                }
            } catch(err) {
                throw new Error(err);
            }
        }, 

        entriesByUser: async (_, __, context) => {
            // Grabs entries for logged in authorized user
            const user = checkAuth(context);
            const userId = user.id
            try {
                const entries = await Entry.find({userId}).sort({ createdAt: -1 });
                if (entries) {
                    return entries
                } else {
                    throw new Error('No entries found for specified user');
                }
            } catch (err) {
                throw new Error(err)
            }
        },

        entriesByLabel: async (_, { label }, context) => {
            const user = checkAuth(context);
            const userId = user.id;
            try {
                const entries = await Entry.find({ $and: [ {userId}, { labels: { $in: [label] } } ] }).sort({ createdAt: -1 });
                if (entries) {
                    return [entries]
                } else {
                    throw new Error('No entries under that label')
                }
            } catch (err) {
                throw new Error(err)
            }
        },

        accountInfo: async(_, __, context) => {
            const user = checkAuth(context);
            const userId = user.id;
            try {
                const foundUser = await User.findOne({ _id: userId });
                if (foundUser) {
                    return foundUser
                } else {
                    throw new Error('User account not found')
            }
                } catch (err) {
                    throw new Error(err)
                }
        },

    },

    Mutation: {
        createEntry: async (_, { thought1, thought2, stress1, stress2, labels }, context) => {
            // middleware to check context...ensure user is authenticated
            const user = checkAuth(context);
            console.log("USER: ", user.id)
            const newEntry = new Entry({
                thought1,
                thought2,
                stress1,
                stress2,
                labels,
                userId: user.id,
                createdAt: new Date().toISOString()
            });

            const entry = await newEntry.save();

            return entry;
        },

        deleteEntry: async (_, { id }, context) => {
            const user = checkAuth(context)
            // make sure logged in user is the one who created the post
            try { 
                const post = await Post.findById(id);
                if(user.id === post.userId) {
                    await post.delete();
                    return 'Post deleted successfully'
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch(err) {
                throw new Error(err)
            }

            
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
                errors.email = 'User not found';
                throw new UserInputError('Account not found', { errors });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.password = 'Incorrect password';
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

        register: async (_, { registerInput: { firstName, lastName, email, password, confirmPassword } }) => {
            // Validate user data (make sure to have server validation)
            const { valid, errors } = validateRegisterInput(firstName, lastName, email, password, confirmPassword);
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
            const rounds = process.env.HASH_ROUNDS || 12;
            password = await bcrypt.hash(password, rounds);

            const newUser = new User({
                firstName,
                lastName,
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
        },

        deleteAcct: async(_, __, context) => {
            const user = checkAuth(context)
            const userId = user.id
            try {
                const foundUser = await User.findById(userId);
                if (foundUser.id === userId) {
                    const entries = await Entry.find({userId})
                    if (entries.length > 0) {
                        await Entry.deleteMany( { userId } )
                        console.log("Entries deleted successfully")
                    } else {
                        console.log("No entries to delete")
                    }
                    await foundUser.delete();
                    return 'Account deleted successfully'
                }
            } catch (err) {
                throw new Error(err)
            }
        },
    }
}