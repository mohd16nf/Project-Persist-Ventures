// src/redux/articlesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '5e5a760b6a2e49cb87057109d72881b9';
const BASE_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology', 'all'];

const categorizeArticles = (articles) => {
  const categorizedArticles = categories.reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {});

  articles.forEach(article => {
    let categorized = false;
    for (const category of categories) {
      if (
        (typeof article.title === 'string' && article.title.toLowerCase().includes(category)) ||
        (typeof article.description === 'string' && article.description.toLowerCase().includes(category))
      ) {
        categorizedArticles[category].push(article);
        categorized = true;
        break;
      }
    }
    if (!categorized) {
      categorizedArticles['general'].push(article);
    }
  });

  return categorizedArticles;
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async ({ category = '', page = 1, pageSize = 10 }) => {
  const url = category ? `${BASE_URL}&q=${category}&page=${page}&pageSize=${pageSize}` : `${BASE_URL}&q=tesla&from=2024-05-21&sortBy=publishedAt&page=${page}&pageSize=${pageSize}`;
  try {
    const response = await axios.get(url);
    const articles = response.data.articles;
    return categorizeArticles(articles);
  } catch (error) {
    throw Error('Failed to fetch articles');
  }
});

export const searchArticles = createAsyncThunk('articles/searchArticles', async ({ query, page = 1, pageSize = 10 }) => {
  try {
    const response = await axios.get(`${BASE_URL}&q=${query}&page=${page}&pageSize=${pageSize}`);
    const articles = response.data.articles;
    return categorizeArticles(articles);
  } catch (error) {
    throw Error('Failed to search articles');
  }
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [], // Ensure this is initialized as an empty array
    status: 'idle',
    error: null,
    selectedCategory: 'all',
    searchTerm: '',
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setPage } = articlesSlice.actions;

export default articlesSlice.reducer;
