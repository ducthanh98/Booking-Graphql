import userSchema from '../../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export default {
    createUser: async (args) => {
        try {
            let user = await userSchema.findOne({ email: args.userInput.email });
            if (user) {
                throw new Error('Email already exist ');
            }
            const salt = await bcrypt.genSalt();
            const hashedPass = await bcrypt.hash(args.userInput.password, salt);
            user = new userSchema({
                email: args.userInput.email,
                password: hashedPass
            })
            const result = await user.save();
            return { ...result._doc, _id: result._doc._id.toString() }
        } catch (err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        try {
            const user = await userSchema.findOne({ email });
            if (!user) {
                throw new Error('User does not exist');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('Password is not correct');
            }
            const token = jwt.sign({ userId: user._id, email: user.email }, 'secret', { expiresIn: '1d' })
            return {
                userId: user._id, token: token, tokenExpiration: 86400 // = (1 * 24 * 60 *60)
            }
        } catch (error) {
            throw error;
        }
    }
}