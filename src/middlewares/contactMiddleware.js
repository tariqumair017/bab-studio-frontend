import { publicApiPost } from '../config/axiosIntance';

const contactMiddleware = {
    // Public API - no authentication required (contact form)
    SendMessage: async (payload) => {
        try {
            const response = await publicApiPost('/message/create', payload);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default contactMiddleware;