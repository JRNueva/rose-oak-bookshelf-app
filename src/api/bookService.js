import axios from 'axios';

// Base API URL
const API = 'https://openlibrary.org';



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

// Format book data with required fields
const formatBookData = (books, isTrending = false) => {
  return books.map((book, index) => ({
    id: book.key || `book-${index}`,
    title: book.title || 'Unknown Title',
    author: book.author_name?.[0] || 'Unknown Author',
    published: book.first_publish_year || book.publish_year?.[0] || 'Unknown',
    rating: (4 + Math.random()).toFixed(1),
    editionCount: book.edition_count || 1,
    ...(isTrending && { trendPosition: index + 1 }),
    coverImage: book.cover_i ? getBookCover(book.cover_i) : null
  }));
};

// Get 12 trending books with formatted data
export const getTrendingBooks = async () => {
  const result = await apiCall(`${API}/trending/daily.json`);
  if (result.data) {
    result.data = formatBookData(result.data.works.slice(0, 12), true);
  }
  return result;
};

// Get books by subject with formatted data
export const getSubjectBooks = async (subject, limit = 6) => {
  const result = await apiCall(`${API}/search.json`, { subject, limit });
  if (result.data) {
    result.data = formatBookData(result.data.docs.slice(0, limit));
  }
  return result;
};

// Search books by query with formatted data
export const searchBooks = async (query, limit = 24) => {
  const result = await apiCall(`${API}/search.json`, { q: query, limit });
  if (result.data) {
    result.data = formatBookData(result.data.docs.slice(0, limit));
  }
  return result;
};

// Search books by subject
export const searchBySubject = async (subject, limit = 6) => {
  const result = await apiCall(`${API}/search.json`, { subject, limit });
  if (result.data) {
    result.data = formatBookData(result.data.docs.slice(0, limit));
  }
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
export const getPopularFiction = () => getSubjectBooks('popular fiction', 6);
export const getScienceTech = () => getSubjectBooks('science & technology', 6);
export const getHistoryBiography = () => getSubjectBooks('history & biography', 6);

// Random page books
export const getRandomBooks = () => getSubjectBooks(getRandomSubject(), 12);