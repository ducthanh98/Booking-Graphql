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
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true }
);

export default model('booking', bookingSchema);