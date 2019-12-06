import eventSchema from '../../models/event.model';
import userSchema from '../../models/user.model';
import bcrypt from 'bcryptjs';

export default {
    events: async () => {
        try {
            const result = await eventSchema.find().populate('creator')
            result.map((event) => {
                return { ...event._doc, _id: event._doc._id.toString() }
            });
            return result;
        } catch (err) {
            throw err;
        }

    },
    createEvent: async (args) => {
        try {
            const event = new eventSchema({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '5dea0ab4e99782107c1d40bb'
            })
            const result = await event.save()
            return { ...result._doc, _id: result._doc._id.toString() }
        } catch (err) {
            throw err;

        }

    },
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
    }
}