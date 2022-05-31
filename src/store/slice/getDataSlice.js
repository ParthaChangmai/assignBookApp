import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import data from '../../api/data';
import { ERROR, IDLE, LOADING, SUCCESS } from '../constants/uiStates';

export const fetchInitialData = createAsyncThunk('data/fetchAll', async () => {
	try {
		const apiData = await data.post();
		return apiData.data;
	} catch (error) {
		return error.response;
	}
});

export const refreshData = createAsyncThunk('data/refresh', async () => {
	try {
		const apiData = await data.post();
		return apiData.data;
	} catch (error) {
		return error.response;
	}
});

const initialState = {
	uiState: IDLE,
	data: null,
};

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		reset: () => {
			return initialState;
		},
	},
	extraReducers: {
		[fetchInitialData.pending]: (state, _) => {
			state.uiState = LOADING;
		},
		[fetchInitialData.fulfilled]: (state, action) => {
			state.uiState = SUCCESS;
			state.data = action.payload;
		},
		[fetchInitialData.rejected]: (state, action) => {
			state.uiState = ERROR;
			state.data = action.payload;
		},
		[refreshData.pending]: (state, _) => {
			state.uiState = LOADING;
		},
		[refreshData.fulfilled]: (state, action) => {
			state.uiState = SUCCESS;
			if (state.data !== null && action.payload.number % 2 === 0) {
				state.data = action.payload;
			}
		},
		[refreshData.rejected]: (state, _) => {
			state.uiState = ERROR;
		},
	},
});

export const { reset } = dataSlice.actions;

export default dataSlice.reducer;
