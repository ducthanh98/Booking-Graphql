import bookingSchema from '../../models/booking.model';

export default {
    bookings: async () => {
        try {
            const bookings = await bookingSchema.find().populate('event').populate('user');
            bookings.map((booking) => {
                return {
                    ...booking._doc,
                    _id: booking._id.toString(),
                    created: new Date(booking.created).toISOString(),
                    updated: new Date(booking.updated).toISOString(),
                }
            })
            return bookings;
        } catch (error) {
            throw error;
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Forbidden');
        }
        const booking = new bookingSchema({
            user: '5dea0ab4e99782107c1d40bb',
            event: args.eventId,
        });
        const event = await booking.save();
        return {
            ...event._doc,
            _id: event._id.toString(),
            created: new Date(event.created).toISOString(),
            updated: new Date(event.updated).toISOString(),
        }
    },
    cancelBooking: async args => {
        try {
            if (!req.isAuth) {
                throw new Error('Forbidden');
            }
            const booking = await bookingSchema.findById(args.bookingId);
            if (!booking) {
                throw new Error('ID is not match with any Booking')
            }
            const result = bookingSchema.deleteOne({ id: args.bookingId });
            return booking;
        } catch (error) {
            throw e;
        }

    }
}