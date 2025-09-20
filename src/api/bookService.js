import axios from 'axios';

// Base API URL
const API = 'https://openlibrary.org';

// Add random rating (0-5) to each book
const addRating = (books) => books.map(book => ({ ...book, rating: Math.floor(Math.random() * 6) }));

// Available subjects for cycling
const subjects = [
  'fiction', 'science', 'history', 
  'mystery', 'romance', 'fantasy', 
  'biography', 'adventure', 'thriller', 
  'comedy', 'drama', 'poetry'];

// Generic API call handler
const apiCall = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return { data: response.data, loading: false, error: null };
  } catch (error) {
    return { data: null, loading: false, error: error.message };
  }
};

// Get 12 trending books with trend positions
export const getTrendingBooks = async () => {
  const result = await apiCall(`${API}/trending/daily.json`);
  if (result.data) {
    const booksWithRating = addRating(result.data.works.slice(0, 12));
    result.data = booksWithRating.map((book, index) => ({ ...book, trendPosition: index + 1 }));
  }
  return result;
};

// Get books by subject with limit
export const getSubjectBooks = async (subject, limit = 6) => {
  const result = await apiCall(`${API}/search.json`, { subject, limit });
  if (result.data) result.data = addRating(result.data.docs);
  return result;
};

// Search books by query (max 24 for browse page)
export const searchBooks = async (query, limit = 24) => {
  const result = await apiCall(`${API}/search.json`, { q: query, limit });
  if (result.data) result.data = addRating(result.data.docs);
  return result;
};

// Search books by subject
export const searchBySubject = async (subject, limit = 10) => {
  const result = await apiCall(`${API}/search.json`, { subject, limit });
  if (result.data) result.data = addRating(result.data.docs);
  return result;
};

// Get individual book details
export const getBookDetails = async (bookKey) => {
  return apiCall(`${API}${bookKey}.json`);
};

// Generate book cover URL
export const getBookCover = (coverId, size = 'L') => 
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;

// Get random subject from cycling array
export const getRandomSubject = () => subjects[Math.floor(Math.random() * subjects.length)];

// Trending page sections
export const getPopularFiction = () => getSubjectBooks('fiction', 6);
export const getScienceTech = () => getSubjectBooks('science', 6);
export const getHistoryBiography = () => getSubjectBooks('history', 6);

// Random page books
export const getRandomBooks = () => getSubjectBooks(getRandomSubject(), 12);