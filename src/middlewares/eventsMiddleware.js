import { apiDelete, apiGet, apiPost } from '../config/axiosIntance';

const eventsMiddleware = {
    GetAllEvents: async () => {
        try {
            const response = await apiGet('/event/get-all');
            return response;
        } catch (error) {
            throw error;
        }
    },

    CreateEvent: async (payload) => {
        try {
            const response = await apiPost('/event/create', payload);
            return response;
        } catch (error) {
            throw error;
        }
    },

    DeleteEvent: async (eventId) => {
        try {
            const response = await apiDelete(`/event/delete/${eventId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },


};

export default eventsMiddleware;