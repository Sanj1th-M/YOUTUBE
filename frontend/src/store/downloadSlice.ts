import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState, PlayerState, Video, Download } from '../types';

// Omitted AuthState, SearchState for brevity, but they are in the full file

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

// Full store configuration follows below in the final write_file call
