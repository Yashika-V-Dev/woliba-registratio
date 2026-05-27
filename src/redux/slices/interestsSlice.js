import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { interestsService } from '../../services/interestsService'

export const fetchInterests = createAsyncThunk(
  'interests/fetchInterests',
  async (_, { rejectWithValue }) => {
    try {
      const data = await interestsService.getWellnessInterests()
      return data
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch interests')
    }
  }
)

export const fetchPillars = createAsyncThunk(
  'interests/fetchPillars',
  async (_, { rejectWithValue }) => {
    try {
      const data = await interestsService.getWellbeingPillars()
      return data
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch pillars')
    }
  }
)

const interestsSlice = createSlice({
  name: 'interests',
  initialState: {
    interests: [],
    pillars: [],
    loadingInterests: false,
    loadingPillars: false,
    error: null,
  },
  reducers: {
    clearInterestsError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterests.pending, (state) => {
        state.loadingInterests = true
        state.error = null
      })
      .addCase(fetchInterests.fulfilled, (state, action) => {
        state.loadingInterests = false
        state.interests = action.payload
      })
      .addCase(fetchInterests.rejected, (state, action) => {
        state.loadingInterests = false
        state.error = action.payload
      })
      .addCase(fetchPillars.pending, (state) => {
        state.loadingPillars = true
        state.error = null
      })
      .addCase(fetchPillars.fulfilled, (state, action) => {
        state.loadingPillars = false
        state.pillars = action.payload
      })
      .addCase(fetchPillars.rejected, (state, action) => {
        state.loadingPillars = false
        state.error = action.payload
      })
  },
})

export const { clearInterestsError } = interestsSlice.actions
export default interestsSlice.reducer
