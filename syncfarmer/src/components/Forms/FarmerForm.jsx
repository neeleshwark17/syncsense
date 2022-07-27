import { Alert, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";

export default function FarmerForm() {
  const [errors, setErrors] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [languages, setLanguages] = React.useState("English");
  const [alerts, setAlerts] = React.useState(false);

  const handleChange = (event) => {
    setLanguages(event.target.value);
  };

  const resets = () => {
    document.getElementById("forms").reset();
    setPhoneNumber("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toggleAlert = () => {
      setAlerts(true);
      setTimeout(() => {
        setAlerts(false);
      }, 5000);
    };

    const toggleErrors = (msg) => {
      setErrors(msg);
      setTimeout(() => {
        setErrors("");
      }, 5000);
    };
    let reqObj = {
      farmerName: document.getElementById("fName").value.trim(),
      phoneNumber: phoneNumber,
      language: languages,
    };
    axios
      .post("http://localhost:4000/createFarmer", reqObj)
      .then((response) => {
        if (!response) {
          toggleErrors("Failed!!!");
          resets();
        } else {
          if (response.data.msg == "ok") {
            toggleAlert();
            resets();
          } else {
            toggleErrors(response.data.msg);
            resets();
          }
        }
      });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
      {alerts && (
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "1.5rem",
          }}
        >
          Registered!
        </Alert>
      )}
      <form
        id="forms"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "80%",
        }}
      >
        {/* Name */}
        <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
          Name
        </Typography>
        <input
          type="text"
          required
          className="inputs"
          placeholder="John Doe"
          id="fName"
        />
        {/* Phone */}
        <Typography variant="body1" sx={{ mt: 3, mb: 1 }}>
          Phone
        </Typography>
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
        {/* Language */}
        <Typography variant="body1" sx={{ mt: 3 }}>
          Language
        </Typography>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={languages}
          label="Age"
          onChange={handleChange}
          required
          sx={{ background: "white", px: "1rem", height: "2.5rem", my: 2 }}
        >
          <MenuItem value={"English"}>English</MenuItem>
          <MenuItem value={"Hindi"}>Hindi</MenuItem>
          <MenuItem value={"Chinese"}>Chinese</MenuItem>
          <MenuItem value={"French"}>French</MenuItem>
          <MenuItem value={"Russian"}>Russian</MenuItem>
        </Select>
        <Typography variant="h6" sx={{ color: "red" }}>
          {errors && errors}
        </Typography>
        <Button
          type="submit"
          sx={{ alignSelf: "end", my: 3 }}
          variant="contained"
        >
          Register
        </Button>
      </form>
    </Box>
  );
}
