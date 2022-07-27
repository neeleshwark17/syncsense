import {
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ScheduleDataForm() {
  const [errors, setErrors] = useState("");
  const [schedulePhoneNumber, setPhoneNumberSchedule] = useState();
  const [fertilizerType, setFertilizerType] = useState("solid");
  const [fertilizers, setFertilizers] = React.useState("Urea");
  const [unit, setUnit] = React.useState("");
  const [alerts, setAlerts] = React.useState(false);

  const handleToggleFertilizerType = (event) => {
    setFertilizerType(event.target.value);
  };

  const handleChange = (event) => {
    setFertilizers(event.target.value);
  };

  const handleChangeUnit = (event) => {
    setUnit(event.target.value);
  };

  const resets = () => {
    document.getElementById("forms").reset();
    setPhoneNumberSchedule("");
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
      afterSowing: document.getElementById("afterSowing").value,
      phoneNumber: schedulePhoneNumber,
      fertilizer: { name: fertilizers, type: fertilizerType },
      quantity: `${document.getElementById("fertilizerAmount").value}${unit}`,
    };

    axios
      .post("http://localhost:4000/createScheduleData", reqObj)
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

  useEffect(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById("afterSowing").setAttribute("min", today);
  }, []);

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
        id="forms"
        onSubmit={handleSubmit}
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
          value={schedulePhoneNumber}
          onChange={setPhoneNumberSchedule}
        />
        <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
          After Sowing
        </Typography>
        <input
          type="date"
          required
          className="inputs"
          placeholder="11/Dec/2022"
          id="afterSowing"
        />

        {/* Language */}
        <Typography variant="body1" sx={{ mt: 3 }}>
          fertilizer
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fertilizers}
          label="Age"
          onChange={handleChange}
          required
          sx={{ background: "white", px: "1rem", height: "2.5rem", my: 2 }}
        >
          <MenuItem value={"Urea"}>Urea</MenuItem>
          <MenuItem value={"Natural"}>Natural</MenuItem>
          <MenuItem value={"Organic"}>Organic</MenuItem>
        </Select>

        <ToggleButtonGroup
          color="primary"
          value={fertilizerType}
          exclusive
          onChange={handleToggleFertilizerType}
          sx={{ background: "white" }}
        >
          <ToggleButton value="solid">Solid</ToggleButton>
          <ToggleButton value="liquid">Liquid</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
          Quantity
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <input
            type="number"
            required
            className="inputs"
            step="any"
            placeholder="0"
            id="fertilizerAmount"
          />
          {fertilizerType == "solid" ? (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={unit}
              label="Age"
              onChange={handleChangeUnit}
              required
              sx={{ background: "white", height: "2rem", mx: 2 }}
            >
              <MenuItem value={" ton"}>Ton</MenuItem>
              <MenuItem value={" kg"}>Kg</MenuItem>
              <MenuItem value={" g"}>g</MenuItem>
            </Select>
          ) : (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={unit}
              label="Age"
              onChange={handleChangeUnit}
              required
              sx={{ background: "white", height: "2rem", mx: 2 }}
            >
              <MenuItem value={" L"}>L</MenuItem>
              <MenuItem value={" ml"}>mL</MenuItem>
            </Select>
          )}
        </Box>

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
