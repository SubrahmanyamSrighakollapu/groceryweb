import api from './api';

// Agent Management API Services
export const agentService = {
  // Get All Agents
  getAllAgents: async () => {
    return await api.get('/agents/getAllAgentDetails');
  },

  // Create Agent
  createAgent: async (agentData) => {
    return await api.post('/agents/create', agentData);
  },

  // Onboard Agent (with file uploads)
  onboardAgent: async (formData) => {
    return await api.post('/agents/onboardAgent', formData);
  },

  // Update Agent
  updateAgent: async (agentId, agentData) => {
    return await api.put(`/agents/update/${agentId}`, agentData);
  },

  // Update Agent Status
  updateAgentStatus: async (userId, payload) => {
    return await api.post(`/auth/users/updateUserStatus/${userId}`, payload);
  },

  // Submit/Update Bank Details
  submitUpdateBankDetails: async (bankData) => {
    return await api.post('/agents/submitUpdateBankDetails', bankData);
  },

  // Delete Agent
  deleteAgent: async (agentId) => {
    return await api.delete(`/agents/delete/${agentId}`);
  },
};

export default agentService;