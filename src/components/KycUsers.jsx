/* eslint-disable  */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmationRemarkModal from './ConfirmationRemarkModal';
// import useSWR from "swr";
import {
	Box,
	Button,
	Paper,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	Modal,
	IconButton,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	TextField,
	Card,
	CardContent,
	useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { resetFilter } from '../redux/allUsers/allUsers.slice';
import { useNavigate } from 'react-router-dom';

import { makeGetReq } from '../utils/axiosHelper';
import { MobileView, BrowserView } from 'react-device-detect';
import FilterComponent from './FilterComponent';
import dayjs from 'dayjs';
import KYClogs from './KYClogs';
import { updateKYVStatus } from '../utils/updateKYCStatus';

const ShowButton = styled(Button)(({ theme }) => ({
	borderRadius: '4px',
	color: '#fff',
	backgroundColor: theme.palette.info.main,
	'&:hover': {
		backgroundColor: theme.palette.info.dark,
	},
}));

const ApproveButton = styled(Button)(({ theme }) => ({
	borderRadius: '4px',
	color: '#fff',
	backgroundColor: theme.palette.success.main,
	'&:hover': {
		backgroundColor: theme.palette.success.dark,
	},
}));
const RejectButton = styled(Button)(({ theme }) => ({
	borderRadius: '4px',
	color: '#fff',
	backgroundColor: theme.palette.error.main,
	'&:hover': {
		backgroundColor: theme.palette.error.dark,
	},
}));

const FailedTile = styled(Box)(({ theme }) => ({
	backgroundColor: '#ffcccb',
	borderRadius: '4px',
}));

const SuccessTile = styled(Box)(({ theme }) => ({
	backgroundColor: 'lightgreen',
	borderRadius: '4px',
}));

const InProgressTile = styled(Typography)(({ theme }) => ({
	color: '#FFB61E',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
	'& .MuiToggleButtonGroup-grouped': {
		margin: theme.spacing(0.5),
		border: 0,
		'&.Mui-disabled': {
			border: 0,
		},
		'&:not(:first-of-type)': {
			borderRadius: theme.shape.borderRadius,
		},
		'&:first-of-type': {
			borderRadius: theme.shape.borderRadius,
		},
	},
}));

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: '#EFF6FF',
	border: '2px solid #000',
	borderRadius: '5px',
	boxShadow: 24,
	p: 4,
};

const accordionItems = [
	{
		id: 1,
		createdOn: '24/1/2022',
		firstName: 'Jon',
		lastName: 'Snow',
		email: 'jon.snow@gmail.com',
		phone: 8585858585,
		kycStatus: 'Pending',
		bankVerifyStatus: 'Yes',
	},
	{
		id: 2,
		createdOn: '14/5/2022',
		firstName: 'Jane',
		lastName: 'Doe',
		email: 'jane.doe@gmail.com',
		phone: 9393939393,
		kycStatus: 'Pending',
		bankVerifyStatus: 'Yes',
	},
	{
		id: 3,
		createdOn: '24/1/2022',
		firstName: 'Jon',
		lastName: 'Snow',
		email: 'mike.tyson@gmail.com',
		phone: 8585858585,
		kycStatus: 'awaiting',
		bankVerifyStatus: 'Yes',
	},
	{
		id: 4,
		createdOn: '5/1/2022',
		firstName: 'Sarthak',
		lastName: 'Verma',
		email: 'verma.sarthak@gmail.com',
		phone: 8585858585,
		kycStatus: 'done',
		bankVerifyStatus: 'Yes',
	},
];

export default function KycUsers() {
	const [showLogs, setShowLogs] = useState(false);
	const isMobile = useMediaQuery('(min-width:768px)');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [filterByKycStatus, setFilterByKycStatus] = useState('');
	const [filterByEmail, setFilterByEmail] = useState('');
	const [bankDetail, setBankDetail] = useState([]);
	const [userRows, setUserRows] = useState([]);
	const [bankModal, setBankModal] = useState(false);
	const [paginationModal, setPaginationModal] = useState({
		page: 0,
		pageSize: 5,
	});
	const [totalRows, setTotalRows] = useState(0);

	//Accordion states for kyc details
	const [mobilePaginationModal, setMobilePaginationModal] = useState({
		page: 0,
		pageSize: 10,
	});
	const [kycUsersMobile, setKycUsersMobile] = useState([]);
	const [totalKycMobile, setTotalKycMobile] = useState(null);
	const [pageID, setPageID] = useState(null);
	const [nextPageID, setNextPageID] = useState(null);

	const [showRemarkModal, setShowRemarkModal] = useState(false);
	const [remark, setRemark] = useState('');
	const [errorMessage, setErrorMessage] = useState(false);
	const [userId, setUserId] = useState(0);
	const [action, setAction] = useState('');

	const toggleBankModal = () => setBankModal(!bankModal);

	const usersColumns = [
		{
			field: 'createdOn',
			headerClassName: 'kyc-column-header',
			headerName: 'Created On',
			valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
			width: 150,
			left: 0,
			position: 'sticky',
		},
		{
			field: 'firstName',
			headerClassName: 'kyc-column-header',
			headerName: 'First name',
			width: 150,
		},
		{
			field: 'lastName',
			headerClassName: 'kyc-column-header',
			headerName: 'Last name',
			width: 150,
		},
		{
			field: 'email',
			headerClassName: 'kyc-column-header',
			headerName: 'Email',
			width: 200,
		},
		{
			field: 'phone',
			headerClassName: 'kyc-column-header',
			headerName: 'Phone',
			width: 150,
		},
		{
			field: 'kycStatus',
			headerClassName: 'kyc-column-header',
			headerName: 'KYC Status',
			width: 150,
			renderCell: (params) => {
				if (params.row.kycStatus === 'FAILED') return <FailedTile>{params.row.kycStatus}</FailedTile>;
				else if (params.row.kycStatus === 'VERIFIED') return <SuccessTile>{params.row.kycStatus}</SuccessTile>;
				else return <InProgressTile>{params.row.kycStatus}</InProgressTile>;
			},
		},
		{
			field: 'view',
			headerClassName: 'kyc-column-header',
			headerName: 'Show KYC Data',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<ShowButton
							onClick={() => {
								navigate(`/kycData/${params.id}`, {
									state: {
										email: params?.row?.email,
										phone: params?.row?.phone,
									},
								});
							}}
						>
							View
						</ShowButton>
					</>
				);
			},
		},
		{
			field: 'bankVerifyStatus',
			headerClassName: 'kyc-column-header',
			headerName: 'Bank Verification Status',
			width: 200,
		},
		{
			field: 'bankDetails',
			headerClassName: 'kyc-column-header',
			headerName: 'Bank Details',
			width: 150,
			renderCell: (params) => {
				// console.log(params.row.id);
				return (
					<>
						<ShowButton
							onClick={async () => {
								await fetchBankDetailsByID(params.row.id);
								toggleBankModal();
							}}
						>
							Bank Details
						</ShowButton>
					</>
				);
			},
		},
		{
			field: 'approve',
			headerClassName: 'kyc-column-header',
			headerName: 'Approve',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<ApproveButton
							onClick={() => {
								setUserId(params.row.id);
								setShowRemarkModal(true);
								setAction('VERIFIED');
							}}
						>
							Approve
						</ApproveButton>
					</>
				);
			},
		},
		{
			field: 'reject',
			headerClassName: 'kyc-column-header',
			headerName: 'Reject',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<RejectButton
							onClick={() => {
								setUserId(params.row.id);
								setShowRemarkModal(true);
								setAction('FAILED');
							}}
						>
							Reject
						</RejectButton>
					</>
				);
			},
		},
	];
	const changePagination = (event) => {
		// console.log(event);
		setPaginationModal({ page: event.page, pageSize: event.pageSize });
	};
	const handleAlignment = async (event, newAlignment) => {
		setFilterByKycStatus(newAlignment);
		// setPaginationModal(paginationModal => ({ page: 1, pageSize : paginationModal.pageSize}))
	};
	const fetchAllUsers = useCallback(async () => {
		// const data = await makeGetReq("/v1/kyc/query-kyc?status=FAILED");
		const { data, total } = await makeGetReq(
			`/v1/kyc/query-kyc?status=IN_REVIEW&pageSize=${paginationModal.pageSize}&pageNo=${paginationModal.page + 1}`
		);
		const rows = data.map((user) => ({
			id: user.id,
			createdOn: user.created,
			email: user.email,
			firstName: user.firstName || '---',
			lastName: user.lastName || '---',
			kycStatus: user.kycStatus,
			phone: user.mobileNumber || '---',
			bankVerifyStatus: user.pennyDropStatus,
		}));
		setUserRows([...rows]);
		setTotalRows(total);
	}, [paginationModal.page, paginationModal.pageSize, filterByKycStatus]);

	const fetchAllUsersMobile = useCallback(async () => {
		const { data, total, pageID, nextPageID } = await makeGetReq(
			`v1/kyc/query-kyc?status=IN_REVIEW&pageSize=${mobilePaginationModal.pageSize}&pageNo=${
				mobilePaginationModal.page + 1
			}`
		);
		const rows = data.map((user) => ({
			id: user.id,
			createdOn: new Date(user.createdAt).toLocaleDateString(),
			email: user.email,
			firstName: user.firstName || '---',
			lastName: user.lastName || '---',
			kycStatus: user.kycStatus,
			phone: user.mobileNumber || '---',
			bankVerifyStatus: user.pennyDropStatus,
		}));
		setKycUsersMobile(rows);
		setTotalKycMobile(total);
		setPageID(pageID);
		setNextPageID(nextPageID);
	}, [mobilePaginationModal.page, mobilePaginationModal.pageSize]);

	const fetchBankDetailsByID = async (userID) => {
		const { data } = await makeGetReq(`v1/bank-accounts?userID=${userID}`);
		console.log(data);
		setBankDetail(data);
	};

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
		fetchAllUsers();
	}, [fetchAllUsers]);

	useEffect(() => {
		fetchAllUsersMobile();
	}, [fetchAllUsersMobile]);

	return (
		<Box sx={{ backgroundColor: '#EFF6FF' }}>
			{/* <Box m={2} display="flex" justifyContent="center" marginBottom={1}>
          <Box display="flex" gap={"1rem"}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                flexWrap: "wrap",
                width: "fit-content",
              }}
            >
              <StyledToggleButtonGroup
                size="small"
                value={filterByKycStatus}
                exclusive
                onChange={handleAlignment}
              >
                <ToggleButton value="">
                  <Typography variant="h4">All Users</Typography>
                </ToggleButton>
                <ToggleButton value="IN_PROGRESS">
                  <Typography variant="h4">In_Progress KYC</Typography>
                </ToggleButton>
                <ToggleButton value="IN_REVIEW">
                  <Typography variant="h4">IN_REVIEW</Typography>
                </ToggleButton>
              </StyledToggleButtonGroup>
            </Paper>
            <Box
              sx={{
                "& .MuiButtonBase-root": {
                  height: "45.83px",
                },
              }}
              display="flex"
              justifyContent="flex-end"
            >
              <FilterComponent />
            </Box>
            <Button onClick={() => dispatch(resetFilter())} variant="contained">
              Reset filter
            </Button>
          </Box>
        </Box> */}
			{isMobile ? (
				<Box>
					<Box sx={{ p: 2, height: 500, width: '100%' }}>
						<DataGrid
							rows={[...userRows]}
							columns={usersColumns}
							paginationModel={paginationModal}
							rowCount={totalRows}
							pageSizeOptions={[5, 10]}
							paginationMode="server"
							onPaginationModelChange={changePagination}
							checkboxSelection
							disableRowSelectionOnClick
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
								backgroundColor: '#FFF',
							}}
						/>
					</Box>
				</Box>
			) : (
				<Box sx={{ m: 1 }}>
					{kycUsersMobile.map((kyc) => (
						<Accordion sx={{ border: '1px solid black' }} key={kyc.id}>
							<AccordionSummary>
								<Typography variant="h4">{kyc.email}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography variant="h4">Created On: {kyc.createdOn}</Typography>
								<Typography variant="h4">Email: {kyc.email}</Typography>
								<Typography variant="h4">First Name: {kyc.firstName}</Typography>
								<Typography variant="h4">Last Name: {kyc.lastName}</Typography>
								<Typography variant="h4">Kyc Status: {kyc.kycStatus}</Typography>
								<Typography variant="h4">Phone: {kyc.phone}</Typography>
								<Typography variant="h4">Bank Verification Status: {kyc.bankVerifyStatus}</Typography>
								<Box mt={1}>
									<Button
										variant="contained"
										fullWidth
										onClick={() => {
											// console.log(params);
											navigate(`/kycData/${kyc.id}`, {
												state: {
													email: kyc?.row?.email,
													phone: kyc?.row?.phone,
												},
											});
										}}
									>
										View KYC details
									</Button>
								</Box>
							</AccordionDetails>
						</Accordion>
					))}
				</Box>
			)}

			<Box display="flex" justifyContent="center">
				<Typography variant="h2">KYC Logs</Typography>
			</Box>
			<Box sx={{ p: 2, height: 650, width: '100%' }}>
				<KYClogs />
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

			<Modal open={bankModal} onClose={toggleBankModal}>
				<Box sx={style}>
					<IconButton onClick={toggleBankModal} sx={{ position: 'absolute', top: 0, right: 0 }}>
						<CloseIcon />
					</IconButton>

					<Box display="flex" justifyContent="center" marginBottom={2}>
						<Typography variant="h3">Bank Details</Typography>
					</Box>
					<Box>
						<Box display="flex" gap={1}>
							<Typography color="grey" variant="h4">
								Account No.:
							</Typography>
							<Typography variant="h4">{bankDetail.length !== 0 ? bankDetail[0]?.accountNumber : '---'}</Typography>
						</Box>
						<Box display="flex" gap={1}>
							<Typography color="grey" variant="h4">
								IFSC No.:
							</Typography>
							<Typography variant="h4">{bankDetail.length !== 0 ? bankDetail[0]?.IFSC : '---'}</Typography>
						</Box>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
}
