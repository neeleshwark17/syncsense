import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Due from "./Views/Due";
import GrowingCrop from "./Views/GrowingCrop";
import PriceCalc from "./Views/PriceCalc";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" ,
    }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Due Schedules" />
          <Tab label="Growing Crop" />
          <Tab label="Price Calculation" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Due />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GrowingCrop />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PriceCalc />
      </TabPanel>
    </Box>
  );
}
