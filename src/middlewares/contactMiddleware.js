import { apiDelete, apiGet, apiPost } from '../config/axiosIntance';

const contactMiddleware = {
    SendMessage: async (payload) => {
        try {
            const response = await apiPost('/message/create', payload);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default contactMiddleware;