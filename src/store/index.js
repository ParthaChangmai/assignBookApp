import { configureStore } from '@reduxjs/toolkit';
import getDataSlice from './slice/getDataSlice';

const createStore = () =>
	configureStore({
		reducer: {
			datas: getDataSlice,
		},
	});

export default createStore;
