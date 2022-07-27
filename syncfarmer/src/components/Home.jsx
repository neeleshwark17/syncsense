import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormsContainer from "./FormsContainer";
import Views from "./Views";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        widhth: "100%",
        height: "100%    ",
        display: "flex",
        p: 8,
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: "max-content" }}
        >
          <Tab label="Register/ Entry" />
          <Tab label=" Fetch Data " />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box width="80vw" height="90vh">
            <FormsContainer />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            width="80vw"
            height="100%"
          >
            <Views />
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
}
