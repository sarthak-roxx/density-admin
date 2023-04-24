import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  // IconButton,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterByEmail,
  filterByFirstname,
  filterByLastname,
} from "../redux/allUsers/allUsers.slice";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";

const filterModalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const firstNameModalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function FilterComponent() {
  const dispatch = useDispatch();
  const [dateModal, setDateModal] = useState(false);
  const [firstNameModal, setFirstNameModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [lastNameModal, setLastNameModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [filterType, setFilterType] = useState("");

  const toggleDateModal = () => setDateModal(!dateModal);
  const toggleFirstNameModal = () => setFirstNameModal(!firstNameModal);
  const toggleLastNameModal = () => setLastNameModal(!lastNameModal);
  const toggleEmailModal = () => setEmailModal(!emailModal);
  const handleChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 170 }}>
        <FormControl fullWidth>
          <InputLabel id="filter-label">
            <Typography variant="h4">Filter</Typography>
          </InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            value={filterType}
            label="Filter"
            onChange={handleChange}
          >
            <MenuItem onClick={toggleDateModal} value="date">
              <Typography variant="h4">Filter By Date</Typography>
            </MenuItem>
            <MenuItem onClick={toggleFirstNameModal} value="firstName">
              <Typography variant="h4">Filter By First name</Typography>
            </MenuItem>
            <MenuItem onClick={toggleLastNameModal} value="lastName">
              <Typography variant="h4">Filter By Last name</Typography>
            </MenuItem>
            <MenuItem onClick={toggleEmailModal} value="email">
              <Typography variant="h4">Filter By Email</Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Modal open={dateModal} onClose={toggleDateModal}>
        <Box sx={filterModalStyles}>
          <Box display="flex" justifyContent="space-around">
            <Box height="100%">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="From" />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="To" />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained">filter</Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={firstNameModal} onClose={toggleFirstNameModal}>
        <Box sx={firstNameModalStyles}>
          <TextField
            fullWidth
            variant="outlined"
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => {
                dispatch(filterByFirstname(firstName));
                setFirstName("");
                toggleFirstNameModal();
              }}
            >
              filter
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={lastNameModal} onClose={toggleLastNameModal}>
        <Box sx={firstNameModalStyles}>
          <TextField
            fullWidth
            variant="outlined"
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              onClick={() => {
                dispatch(filterByLastname(lastName));
                setLastName("");
                toggleLastNameModal();
              }}
              variant="contained"
            >
              filter
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={emailModal} onClose={toggleEmailModal}>
        <Box sx={firstNameModalStyles}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => {
                dispatch(filterByEmail(email));
                setEmail("");
                toggleEmailModal();
              }}
            >
              filter
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
