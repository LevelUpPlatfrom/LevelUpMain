// frontend/client/src/services/courseService.js
import api from '../utils/api';

const getFeaturedCourses = async () => {
  const response = await api.get('/api/courses/featured');
  return response.data;
};

const getSolanaCourses = async () => {
    const response = await api.get('/api/courses/solana');
    return response.data;
};

const getCourseDetails = async (courseId) => {
  // Token added automatically by interceptor
  const response = await api.get(`/api/courses/${courseId}`);
  return response.data; // Should contain { course: {...}, tasks: [...] }
};

const completeTask = async (taskId, xpReward, taskType) => {
    // Token added automatically by interceptor
    const response = await api.post('/auth/complete-task', { taskId, xpReward, taskType });
    return response.data; // Should contain { message: '...', user: {...} }
};

// --- Placeholder for Payment ---
const createCheckoutSession = async (priceId) => {
    console.log("Attempting to create checkout session for price:", priceId);
    // Token added automatically
    // const response = await api.post('/api/payments/create-checkout-session', { priceId });
    // return response.data; // Should contain { sessionId: '...' }
    throw new Error("Payment endpoint not implemented on backend yet."); // Placeholder
};
// --- End Placeholder ---

const courseService = {
  getFeaturedCourses,
  getSolanaCourses,
  getCourseDetails,
  completeTask,
  createCheckoutSession // Export payment function
};

export default courseService;