import { contentApi } from './apiService';

//============ Fetch API for content ============//
// Updated to use centralized API service
export const fetchContent = async (params = "") => {
  try {
    // Handle different parameter formats
    if (params.startsWith('?category=')) {
      const category = params.replace('?category=', '');
      return {
        data: await contentApi.getByCategory(category)
      };
    } else if (params) {
      return {
        data: await contentApi.getAll(params)
      };
    } else {
      return {
        data: await contentApi.getAll()
      };
    }
  } catch (error) {
    console.error('Error in fetchContent:', error);
    throw error;
  }
};
