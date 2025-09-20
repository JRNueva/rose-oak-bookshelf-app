import axios from 'axios';

const API = 'https://openlibrary.org';
const addRating = (books) => books.map(book => ({ ...book, rating: Math.floor(Math.random() * 6) }));
const subjects = ['fiction', 'science', 'history', 'mystery', 'romance', 'fantasy', 'biography', 'adventure', 'thriller', 'comedy', 'drama', 'poetry'];

const apiCall = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return { data: response.data, loading: false, error: null };
  } catch (error) {
    return { data: null, loading: false, error: error.message };
  }
};

export const getTrendingBooks = async () => {
  const result = await apiCall(`${API}/trending/daily.json`);
  if (result.data) {
    const booksWithRating = addRating(result.data.works.slice(0, 12));
    result.data = booksWithRating.map((book, index) => ({ ...book, trendPosition: index + 1 }));
  }
  return result;
};

export const getSubjectBooks = async (subject, limit = 6) => {
  const result = await apiCall(`${API}/search.json`, { subject, limit });
  if (result.data) result.data = addRating(result.data.docs);
  return result;
};

export const searchBooks = async (query) => {
  const result = await apiCall(`${API}/search.json`, { q: query });
  if (result.data) result.data = addRating(result.data.docs);
  return result;
};

export const searchBySubject = async (subject, limit = 10) => {
  const result = await apiCall(`${API}/search.json`, { subject, limit });
  if (result.data) result.data = addRating(result.data.docs);
  return result;
};

export const getBookDetails = async (bookKey) => {
  return apiCall(`${API}${bookKey}.json`);
};

export const getBookCover = (coverId, size = 'L') => 
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;

export const getRandomSubject = () => subjects[Math.floor(Math.random() * subjects.length)];