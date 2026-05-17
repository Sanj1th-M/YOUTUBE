import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState, PlayerState, Video, Download } from '../types';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialAuthState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    }
  },
});

export interface SearchState {
  query: string;
  results: Video[];
  suggestions: string[];
  recentSearches: string[];
  loading: boolean;
  error: string | null;
}

const initialSearchState: SearchState = {
  query: '',
  results: [],
  suggestions: [],
  recentSearches: JSON.parse(localStorage.getItem('recentSearches') || '[]'),
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<Video[]>) => {
      state.results = action.payload;
      state.loading = false;
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const filtered = state.recentSearches.filter(s => s !== action.payload);
      state.recentSearches = [action.payload, ...filtered].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
    },
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.suggestions = [];
    }
  },
});

export interface DownloadState {
  items: Download[];
  loading: boolean;
  error: string | null;
}

const initialDownloadState: DownloadState = {
  items: [],
  loading: false,
  error: null,
};

const downloadSlice = createSlice({
  name: 'downloads',
  initialState: initialDownloadState,
  reducers: {
    setDownloads: (state, action: PayloadAction<Download[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    addDownload: (state, action: PayloadAction<Download>) => {
      state.items = [action.payload, ...state.items];
    },
    updateDownload: (state, action: PayloadAction<Partial<Download> & { id: string }>) => {
      const index = state.items.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    removeDownload: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(d => d.id !== action.payload);
    },
    setDownloadLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDownloadError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

const initialUIState: UIState = {
  isSidebarOpen: true,
  isMiniPlayerVisible: false,
  activeCategory: 'All',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
  },
});

const initialPlayerState: PlayerState = {
  currentVideo: null,
  isPlaying: false,
  isMinimized: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  playbackRate: 1,
  isBuffering: false,
  isFullscreen: false,
  error: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState: initialPlayerState,
  reducers: {
    setVideo: (state, action: PayloadAction<Video>) => {
      state.currentVideo = action.payload;
      state.isPlaying = true;
      state.isMinimized = false;
      state.error = null;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setMinimized: (state, action: PayloadAction<boolean>) => {
      state.isMinimized = action.payload;
    },
    updateTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    updateDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    setPlaybackRate: (state, action: PayloadAction<number>) => {
      state.playbackRate = action.payload;
    },
    setBuffering: (state, action: PayloadAction<boolean>) => {
      state.isBuffering = action.payload;
    },
    setFullscreen: (state, action: PayloadAction<boolean>) => {
      state.isFullscreen = action.payload;
    },
    setPlayerError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    closePlayer: (state) => {
      state.currentVideo = null;
      state.isPlaying = false;
    }
  },
});

export const { authStart, authSuccess, authFailure, logoutSuccess, updateToken } = authSlice.actions;
export const { setSearchQuery, setSearchResults, setSuggestions, addRecentSearch, setSearchLoading, setSearchError, clearSearch } = searchSlice.actions;
export const { setDownloads, addDownload, updateDownload, removeDownload, setDownloadLoading, setDownloadError } = downloadSlice.actions;
export const { toggleSidebar, setSidebarOpen, setCategory } = uiSlice.actions;
export const { setVideo, togglePlay, setPlaying, setMinimized, updateTime, updateDuration, setVolume, setMuted, setPlaybackRate, setBuffering, setFullscreen, setPlayerError, closePlayer } = playerSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    player: playerSlice.reducer,
    search: searchSlice.reducer,
    downloads: downloadSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
