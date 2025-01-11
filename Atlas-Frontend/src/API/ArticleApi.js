import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// addArticle function
export const addArticle = async (articleData) => {
  try {
    const response = await axios.post(`${API_URL}/add-article`, articleData);
    return response.data;
  } catch (error) {
    console.error('Error adding article details:', error);
    throw error;
  }
};

// updateArticleNo function
export const updateArticleNo = async (RSN, ArticleNo) => {
  try {
    const response = await axios.put(`${API_URL}/update-articleNo/${RSN}`, ArticleNo);
    return response.data;
  } catch (error) {
    console.error('Error updating article number:', error);
    throw error;
  }
};
