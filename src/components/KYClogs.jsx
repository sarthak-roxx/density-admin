/* eslint-disable  */

import React, {useCallback, useState, useEffect} from "react"
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { makeGetReq } from "../utils/axiosHelper";
import { styled } from "@mui/material/styles";
import {
  Button
} from "@mui/material";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const ShowButton = styled(Button)(({ theme }) => ({
  backgroundColor: "lightblue",
  borderRadius: "4px",
  border: "1px solid blue",
}));



const KYClogs = () => {

  const session = useSessionContext();
  
  const kycLogsColumns = [
    {
      field: "createdOn",
      headerClassName: "kyc-column-header",
      headerName: "Created On",
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      width: 150,
    },
    {
      field: "firstName",
      headerClassName: "kyc-column-header",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerClassName: "kyc-column-header",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "email",
      headerClassName: "kyc-column-header",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phone",
      headerClassName: "kyc-column-header",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "kycStatus",
      headerClassName: "kyc-column-header",
      headerName: "Kyc Status",
      width: 150,
    },
    {
      field: "view",
      headerClassName: "kyc-column-header",
      headerName: "Show KYC Data",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <ShowButton
              onClick={() => {
                navigate(`/kycData/${params.id}`);
              }}
            >
              View
            </ShowButton>
          </>
        );
      },
    },
    {
      field: "admin",
      headerClassName: "kyc-column-header",
      headerName: "Admin",
      width: 150,
    },
    {
      field: "remarks",
      headerClassName: "kyc-column-header",
      headerName: "Remarks",
      width: 150,
    },
  ];
  const [paginationModal, setPaginationModal] = useState({
    page: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [logs, setLogs] = useState([]);

  const {page,pageSize} =paginationModal;
  const fetchLogs = useCallback(async () =>{
    console.log(session);
    if(!session.userId) return;
    const response = await makeGetReq(`/v1/admin-logs?actionType=KYC&pageNo=${page+1}&size=${pageSize}&adminID=${session.userId}`)
    // setLogs(response.data);
    const logsRows = response?.data?.map((log) => ({
        id: log?.logID,
        createdOn: new Date(log.createdAt)?.toLocaleString(),
        kycStatus: log?.action?.log?.Status,
        admin: log?.adminName,
        email: log?.email,
        phone: log?.phone,
        firstName: log?.userFirstName ? logs?.userFirstName : "--",
        lastName: log?.userLastName ? logs?.userLasttName : "--",
        remarks: log?.action?.log?.Remark?.at(0).length > 0 ? log?.action?.log?.Remark?.at(0) : "--"

    }));
    setLogs(logsRows);
    setTotalRows(response?.total);
  },[page,pageSize,session.userId])

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs])

  return (
    <DataGrid
      columns={kycLogsColumns}
      rows={[...logs]}
      sx={{
        ".MuiDataGrid-columnHeaderCheckbox": {
          display: "none",
        },
        "& .MuiDataGrid-cellCheckbox": {
          display: "none",
        },
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
        border: 2,
      }}
      rowCount={totalRows}
      paginationMode="server"
      paginationModel={paginationModal}
      onPaginationModelChange={(event) => {
        setPaginationModal({ page: event.page , pageSize : event.pageSize});
      }}
    />
  )
}

export default KYClogs