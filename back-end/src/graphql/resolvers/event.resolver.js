
import eventSchema from '../../models/event.model';
import userSchema from '../../models/user.model';

export default {
    events: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error('Forbidden');
            }
            const result = await eventSchema.find().populate('creator');
            result.map((event) => {
                return { ...event._doc, _id: event._doc._id.toString() }
            });
            return result;
        } catch (err) {
            throw err;
        }

    },
    createEvent: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error('Forbidden');
            }
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
}