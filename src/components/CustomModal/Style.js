export const CONTIANER = {
  maxWidth: { lg: "620px", sm: "600px", xs: "350px" },
  width: "100%",
  pl: "0px !important",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  pr: "0px !important",
  backgroundColor: "#fff",
  "&:focus-visible": {
    outline: "none"
  }
};
export const BUTTONWRAPPER = {
  display: "flex",
  py: 1.5,
  px: 1,
  mt: 0,
  backgroundColor: "#F5F5F5",
  justifyContent: "flex-end",
  gap: "15px"
};

export const PRIMARYBUTTON = {
  color: "black",
  backgroundColor: "#F46151",
  ":hover": {
    bgcolor: "#F46151"
  },
  borderRadius: "0 !important",
  maxWidth: "180px",
  width: "100%"
};
export const SECONDARYBUTTON = {
  color: "#fff",
  backgroundColor: "#27BD67",
  ":hover": {
    bgcolor: "#27BD67"
  },
  width: "100%",
  maxWidth: "180px",
  borderRadius: "0px !important"
};
export const SPACE_BETWEEN = {
  display: "flex",
  justifyContent: "space-between"
};
