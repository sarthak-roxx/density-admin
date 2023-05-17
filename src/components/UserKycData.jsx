/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useCallback, useEffect, useState } from 'react';
import { Box, CardContent, Typography, Button, useMediaQuery } from '@mui/material';
import { makeGetReq } from '../utils/axiosHelper';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation, useParams } from 'react-router-dom';
import { updateKYVStatus } from '../utils/updateKYCStatus';
import UserKYCTabs from './UserKYCTabs';
import ConfirmationRemarkModal from './Modals/ConfirmationRemarkModal';

const adminLogsColumns = [
	{
		field: 'timestamp',
		headerName: 'Timestamp',
		width: 200,
	},
	{
		field: 'action',
		headerName: 'Action',
		width: 200,
	},
	{
		field: 'admin',
		headerName: 'Admin',
		width: 200,
	},
];

export default function UserKycData() {
	const { state } = useLocation();
	const { userID } = useParams();
	const [userKycData, setUserKycData] = useState({});
	const isNotMobile = useMediaQuery('(min-width:768px)');
	const [logs, setLogs] = useState([]);
	const [totalRows, setTotalRows] = useState(0);

	const [showRemarkModal, setShowRemarkModal] = useState(false);
	const [remark, setRemark] = useState('');
	const [errorMessage, setErrorMessage] = useState(false);
	const [userId, setUserId] = useState(0);
	const [action, setAction] = useState('');

	const [paginationModal, setPaginationModal] = useState({
		page: 0,
		pageSize: 5,
	});

	const { page, pageSize } = paginationModal;

	const fetchLogs = useCallback(async () => {
		const response = await makeGetReq(
			`/v1/admin-logs?actionType=KYC&pageNo=${page + 1}&size=${pageSize}&userID=${userID}`
		);
		// setLogs(response.data);
		const logsRows = response?.data?.map((log) => ({
			id: log?.logID,
			timestamp: new Date(log.createdAt)?.toLocaleString(),
			action: log?.actionRemark,
			admin: log?.adminName,
		}));
		setLogs(logsRows);
		setTotalRows(response?.total);
	}, [page, pageSize]);

	const handleConfirmationModal = (option) => {
		if (option === 'no') {
			setErrorMessage(false);
			setRemark('');
			setUserId(0);
			setShowRemarkModal(false);
		} else {
			if (remark === '') {
				setErrorMessage(true);
				setRemark('');
			} else {
				updateKYVStatus(action, userId, remark);
				setErrorMessage(false);
				setRemark('');
				setShowRemarkModal(false);
			}
		}
	};

	useEffect(() => {
		makeGetReq(`v1/users/${userID}/kyc?userID=${userID}`).then(({ data }) => {
			setUserKycData(data);
		});
	}, []);

	const getFieldData = (data) => {
		if (data) {
			return data;
		}
		return '--';
	};

	useEffect(() => {
		fetchLogs();
	}, [fetchLogs]);

	return (
		<Box sx={{ backgroundColor: '#EFF6FF', padding: '20px' }}>
			<Box flexDirection={isNotMobile ? 'row' : 'column'} sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<CardContent>
					<Box sx={{ backgroundColor: '#fff', padding: '3vw' }}>
						<Box padding={1}>
							<Typography>Name</Typography>
							<Typography variant="h4">{getFieldData(userKycData?.documentDetail?.POAData?.name)}</Typography>
						</Box>

						<Box padding={1}>
							<Typography>Email</Typography>
							<Typography variant="h4">
								{isNotMobile ? getFieldData(state?.email) : getFieldData(state?.email).substring(0, 20) + '...'}
							</Typography>
						</Box>

						<Box padding={1}>
							<Typography>DOB</Typography>
							<Typography variant="h4">{getFieldData(userKycData?.documentDetail?.POAData?.DOB)}</Typography>
						</Box>

						<Box padding={1}>
							<Typography>Gender</Typography>
							<Typography variant="h4">
								{userKycData?.documentDetail?.POAData?.gender
									? userKycData?.documentDetail?.POAData?.gender === 'M'
										? 'Male'
										: 'Female'
									: '--'}
							</Typography>
						</Box>

						<Box padding={1}>
							<Typography>Phone</Typography>
							<Typography variant="h4">{getFieldData(state?.phone)}</Typography>
						</Box>

						<Box padding={1}>
							<Typography>Name Match</Typography>
							<Typography variant="h4">
								{userKycData?.documentDetail?.IdentityMatchData
									? (userKycData?.documentDetail?.IdentityMatchData?.nameMatchScore / 5) * 100
									: '--'}{' '}
								%
							</Typography>
						</Box>

						<Box padding={1}>
							<Typography>Selfie Match</Typography>
							<Typography variant="h4">
								{getFieldData(userKycData?.documentDetail?.FaceMatchData?.matchPercentWithPOAImage)}%
							</Typography>
						</Box>

						<Box padding={1}>
							<Typography>Method</Typography>
							<Typography variant="h4">DIGILOCKER/DOCUMENT UPLOAD</Typography>
						</Box>

						{userKycData?.status === 'IN_REVIEW' ? (
							<Box display="flex" justifyContent="space-around" margin={'auto'} width={isNotMobile ? '18%' : '80%'}>
								<Button
									sx={{ padding: '10px 40px', margin: '10px' }}
									color="error"
									variant="contained"
									onClick={() => {
										setUserId(getFieldData(userKycData?.documentDetail?.POAData?.id));
										setShowRemarkModal(true);
										setAction('FAILED');
									}}
								>
									Reject
								</Button>
								<Button
									sx={{ padding: '10px 40px', margin: '10px' }}
									color="success"
									variant="contained"
									onClick={() => {
										setUserId(getFieldData(userKycData?.documentDetail?.POAData?.id));
										setShowRemarkModal(true);
										setAction('VERIFIED');
									}}
								>
									Approve
								</Button>
							</Box>
						) : userKycData?.status === 'VERIFIED' ? (
							<Box display="flex" justifyContent="center" margin={'auto'} width={isNotMobile ? '18%' : '80%'}>
								<Typography sx={{ color: '#2e7d32', fontWeight: '500', fontSize: '28px' }}>Approved</Typography>;
							</Box>
						) : userKycData?.status === 'FAILED' ? (
							<Box display="flex" justifyContent="center" margin={'auto'} width={isNotMobile ? '18%' : '80%'}>
								<Typography sx={{ color: '#d32f2f', fontWeight: '500', fontSize: '28px' }}>Failed</Typography>;
							</Box>
						) : (
							<></>
						)}
					</Box>
				</CardContent>
				<UserKYCTabs />
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
				<Box sx={{ width: '90%', border: '1px solid grey', height: '300px' }}>
					<DataGrid
						sx={{
							'.MuiDataGrid-columnHeaderCheckbox': {
								display: 'none',
							},
							'& .MuiDataGrid-cellCheckbox': {
								display: 'none',
							},
							'&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
								outline: 'none !important',
							},
						}}
						rows={logs}
						columns={adminLogsColumns}
						paginationMode="server"
						paginationModel={paginationModal}
						onPaginationModelChange={(event) => {
							setPaginationModal({
								page: event.page,
								pageSize: event.pageSize,
							});
						}}
						rowCount={totalRows}
						pageSizeOptions={[10]}
						checkboxSelection
						disableRowSelectionOnClick
					/>
				</Box>

				<ConfirmationRemarkModal
					isOpen={showRemarkModal}
					close={() => {
						setShowRemarkModal(false);
						setRemark('');
						setErrorMessage(false);
					}}
					primaryAction={() => handleConfirmationModal('yes')}
					secondaryAction={() => handleConfirmationModal('no')}
					remark={remark}
					setRemark={(e) => setRemark(e.target.value)}
					error={errorMessage}
				/>
			</Box>
		</Box>
	);
}
