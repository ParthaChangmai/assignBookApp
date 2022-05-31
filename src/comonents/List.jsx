import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchInitialData,
	refreshData,
	reset,
} from '../store/slice/getDataSlice';
import { ERROR, LOADING, SUCCESS } from '../store/constants/uiStates';

const List = () => {
	const dispatch = useDispatch();

	const { uiState, data } = useSelector((state) => state.datas);

	useEffect(() => {
		dispatch(fetchInitialData());

		return () => {
			reset();
		};
	}, [dispatch]);
	console.log(data);

	return (
		<div className="min-h-screen grid place-items-center">
			<div>
				<div className="flex items-center justify-center mb-11 text-xl">
					<button
						type="button"
						className="p-3 px-4 rounded-lg bg-slate-800 text-white hover:px-11 hover:shadow-lg hover:bg-slate-700 hover:shadow-indigo-700 transition-all ease-in-out duration-500"
						onClick={() => dispatch(refreshData())}
					>
						Refresh
					</button>
				</div>

				{data && (
					<div className="flex items-center justify-center mb-10 text-2xl">
						Number : {data.number}
					</div>
				)}
				<div>
					{uiState === LOADING && (
						<div className="text-3xl font-bold">Loading...</div>
					)}
					{uiState === SUCCESS && (
						<div className="m-5">
							<table className="text-2xl w-[550px] h-[300px] mx-auto">
								<thead>
									<tr className="border-b-2 border-gray-600">
										<th className="pb-4">Id</th>
										<th className="pb-4">Employee Name</th>
										<th className="pb-4">Role</th>
									</tr>
								</thead>
								<tbody className="place-items-center">
									{data.data.map(({ Id, empName, role }, no) => (
										<tr className="text-center text-gray-300" key={Id}>
											<td>{Id}</td>
											<td>{empName}</td>
											<td>{role}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
					{uiState === ERROR && <div className="text-3xl font-bold">Error</div>}
				</div>
			</div>
		</div>
	);
};

export default List;
