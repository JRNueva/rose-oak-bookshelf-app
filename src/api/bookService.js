import axios from 'axios';

const API = 'https://openlibrary.org';

const subjects = [
  'fiction', 'science', 'history', 
  'mystery', 'romance', 'fantasy', 
  'biography', 'adventure', 'thriller', 
  'comedy', 'drama', 'poetry'];

const apiCall = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return { data: response.data, loading: false, error: null };
  } catch (error) {
    return { data: null, loading: false, error: error.message };
  }
};

const formatBookData = (books, isTrending = false) => {
  return books.map((book, index) => ({
    id: book.key || `book-${index}`,
    title: book.title || 'Unknown Title',
    author: book.author_name?.[0] || 'Unknown Author',
    published: book.first_publish_year || book.publish_year?.[0] || 'Unknown',
    rating: (4 + (book.key ? book.key.charCodeAt(book.key.length - 1) % 10 / 10 : 0.5)).toFixed(1),
    subjects: (book.subject || []).slice(0, 5),
    description: 'No description available.',
    ...(isTrending && { trendPosition: index + 1 }),
    coverImage: book.cover_i ? getBookCover(book.cover_i) : null
  }));
};

export const getTrendingBooks = async () => {
  const result = await apiCall(`${API}/trending/daily.json`);
  if (result.data) {
    result.data = formatBookData(result.data.works.slice(0, 12), true);
  }
  return result;
};

export const getSubjectBooks = async (subject, limit = 6) => {
  const result = await apiCall(`${API}/search.json`, { subject, limit });
  if (result.data) {
    result.data = formatBookData(result.data.docs.slice(0, limit));
  }
  return result;
};

export const searchBooks = async (query, limit = 24) => {
  const result = await apiCall(`${API}/search.json`, { q: query, limit });
  if (result.data) {
    result.data = formatBookData(result.data.docs.slice(0, limit));
  }
  return result;
};

export const getBookDetails = async (bookKey) => {
  if (!bookKey) return { data: null, loading: false, error: 'No book key provided' };
  
  const url = bookKey.startsWith('/works/') ? `${API}${bookKey}.json` : `${API}/books/${bookKey}.json`;
  const result = await apiCall(url);
  return result;
};

export const getBookCover = (coverId, size = 'L') => 
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;

const createSubjectCycler = () => {
  let index = 0;
  return () => {
    const subject = subjects[index];
    index = (index + 1) % subjects.length;
    return subject;
  };
};

const getNextSubject = createSubjectCycler();

export const getPopularFiction = () => getSubjectBooks('fiction', 6);
export const getScienceTech = () => getSubjectBooks('science', 6);
export const getHistoryBiography = () => getSubjectBooks('history', 6);

export const getRandomBooks = () => getSubjectBooks(getNextSubject(), 12);