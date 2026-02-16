const API_KEY = '2ecd8fe0'; //API Key
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (keyword, type) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${keyword}&type=${type}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getMovieDetail = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching detail:", error);
    return null;
  }
};