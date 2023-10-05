import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setError } from './errorSlice';
import { RootState } from './store';

export const SORT_PHOTOS = 'SORT_PHOTOS';
type SortingCriteriaProperty = 'id' | 'title';
type SortingCriteriaDirection = 'ASC' | 'DESC';
type SortingCriteria = {
  property: SortingCriteriaProperty;
  direction: SortingCriteriaDirection;
};

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotoState {
  photos: Photo[];
  searchQuery: string;
}

const initialState: PhotoState = {
  photos: [],
  searchQuery: '',
};

export const getPhotos = createAsyncThunk(
  'photos/getPhotos',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const { photos, searchQuery } = getState() as PhotoState;
    if (photos.length > 0) {
      return photos;
    }
    try {
      const response = await axios.get('/jso/photos');
      return response.data;
    } catch (error: any) {
      // Handle the error and dispatch it to the error slice
      console.log(JSON.stringify(error.message));
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export function sortPhotosFn(sortCriteria: SortingCriteria) {
  return {
    type: SORT_PHOTOS,
    payload: sortCriteria,
  } as const;
}

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    addPhoto: (state, action: PayloadAction<Photo>) => {
      state.photos = [...state.photos, action.payload];
    },
    deletePhoto: (state, action: PayloadAction<number>) => {
      state.photos = state.photos.filter(
        (photo) => photo.id !== action.payload
      );
    },

    sortPhotos: (state, action: PayloadAction<SortingCriteria>) => {
      const { direction, property } = action.payload;
      state.photos.sort((a, b) => {
        let comparison = 0;
        if (a[property] > b[property]) {
          comparison = 1;
        } else if (a[property] < b[property]) {
          comparison = -1;
        }
        return direction === 'ASC' ? comparison : -comparison; // Invert for DESC
      });
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.photos = action.payload;
    });
    // ... other cases ...
  },
});

export const { addPhoto, deletePhoto, sortPhotos, setSearchQuery } =
  photosSlice.actions;
export const selectSearchQuery = (state: RootState) => state.photos.searchQuery;
export default photosSlice.reducer;
