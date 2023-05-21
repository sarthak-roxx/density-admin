import React from "react";
import { Card, Typography, CardContent, Box, useMediaQuery, } from "@mui/material";
import PropTypes from "prop-types";

export default function DashboardCards({title, content, backgroundColor}) {
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <Card sx={{ width: isMobile ? "90%" : "30%", maxWidth: "300px", margin: "20px", backgroundColor: {backgroundColor}}}>
      <CardContent>
        <Box sx={{height: "80px"}}>
          <Typography variant="h4">
            {title}
          </Typography>
        </Box>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Typography variant="h1" mb={1}>
            {content}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

DashboardCards.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  backgroundColor:PropTypes.string,
};
