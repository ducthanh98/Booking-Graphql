import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'event'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    { timestamps: true }

});

export default model('booking', bookingSchema);