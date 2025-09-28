import { publicApiGet, authApiPost, authApiDelete } from '../config/axiosIntance';

const eventsMiddleware = {
	// Public API - no authentication required (used on home page)
	GetAllEvents: async () => {
		try {
			const response = await publicApiGet('/event/get-all');
			return response;
		} catch (error) {
			throw error;
		}
	},

	// Public API - get single event by id
	GetSingleEvent: async (id) => {
		try {
			const response = await publicApiGet(`/event/get-single/${id}`);
			return response;
		} catch (error) {
			throw error;
		}
	},

	// Authenticated API - requires JWT token (admin only)
	CreateEvent: async (payload) => {
		try {
			const response = await authApiPost('/event/create', payload);
			return response;
		} catch (error) {
			throw error;
		}
	},

	// Authenticated API - requires JWT token (admin only)
	DeleteEvent: async (eventId) => {
		try {
			const response = await authApiDelete(`/event/delete/${eventId}`);
			return response;
		} catch (error) {
			throw error;
		}
	},
};

export default eventsMiddleware;