import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30053223-4606077d2ff36cbc858d0fd80';
const OPTIONS = 'image_type=photo&orientation=horizontal&per_page=12';

export async function fetch(query, page) {
  try {
    const response = await axios.get(
      `?q=${query}&page=${page}&key=${API_KEY}&${OPTIONS}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
