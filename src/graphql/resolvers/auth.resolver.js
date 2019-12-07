import userSchema from '../../models/user.model';
import bcrypt from 'bcryptjs';

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
}