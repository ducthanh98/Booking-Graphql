import eventResolver from './event.resolver';
import bookingResolver from './booking.resolver';
import authResolver from './auth.resolver';
export default {
    ...authResolver,
    ...bookingResolver,
    ...eventResolver
}