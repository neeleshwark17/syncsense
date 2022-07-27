import { Alert, Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import PhoneInput from "react-phone-number-input";

export default function FarmerDataForm() {
  const [errors, setErrors] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [alerts, setAlerts] = React.useState(false);

  const toggleErrors = (msg) => {
    setErrors(msg);
    setTimeout(() => {
      setErrors("");
    }, 5000);
  };

  const resets = () => {
    document.getElementById("forms").reset();
    setPhoneNumber("");
  };

  const toggleAlert = () => {
    setAlerts(true);
    setTimeout(() => {
      setAlerts(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let reqObj = {
      sowingDate: document.getElementById("sowingDate").value.trim(),
      phoneNumber: phoneNumber,
      village: document.getElementById("village").value.trim() ,
      crop:document.getElementById("crop").value.trim() ,
    };
    axios
      .post("http://localhost:4000/createFarmerData", reqObj)
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

  useEffect(()=>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    
    if (dd < 10) {
       dd = '0' + dd;
    }
    
    if (mm < 10) {
       mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("sowingDate").setAttribute("min", today);
  
  },[])
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
          Record Inserted!
        </Alert>
      )}
      <form
        onSubmit={handleSubmit}
        id='forms'
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "80%",
        }}
      >
        {/* Phone */}
        <Typography variant="body1" sx={{ mt: 3, mb: 1 }}>
          Enter Your Registered PhoneNumber
        </Typography>
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
        <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
          Village
        </Typography>
        <input
          type="text"
          required
          className="inputs"
          placeholder="Village"
          id="village"
        />

        <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
          Crop
        </Typography>
        <input
          type="text"
          required
          className="inputs"
          placeholder="Rice"
          id="crop"
        />
        <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
          Sowing  
        </Typography>
        <input
          type="date"
          required
          className="inputs"
          placeholder="11/12/2022"
          id="sowingDate"
        />

        <Typography
          variant="h6"
          sx={{
            color: errors == "Updated" ? "green" : "red",
            mt: 3,
            fontWeight: "bold",
          }}
        >
          {errors && errors}
        </Typography>
        <Button
          type="submit"
          sx={{ alignSelf: "end", my: 3 }}
          variant="contained"
        >
          Upload
        </Button>
      </form>
    </Box>
  );
}
