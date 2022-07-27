import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";

export default function PriceCalc() {
  const [rows, setRows] = React.useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/priceCalc").then((response) => {
      if (!response) {
        console.log("Failed");
      } else {
        if (response.data.msg == "ok") {
          setRows(response.data.obj);
        } else {
          console.log("");
        }
      }
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Box width="fit-content" m={3}>
        <Grid container>
          <Grid item xs={6}>
            1mL
          </Grid>
          <Grid item xs={6}>
            ₹10/-
          </Grid>
          <Grid item xs={6}>
            1L
          </Grid>
          <Grid item xs={6}>
            ₹100/-
          </Grid>
          <Grid item xs={6}>
            1g
          </Grid>
          <Grid item xs={6}>
            ₹10/-
          </Grid>
          <Grid item xs={6}>
            1kG
          </Grid>
          <Grid item xs={6}>
            ₹100/-
          </Grid>
          <Grid item xs={6}>
            1ton
          </Grid>
          <Grid item xs={6}>
            ₹1000/-
          </Grid>
        </Grid>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ background: "black" }}>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              Farmer
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Fertilizer Name
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Fertilizer Type
            </TableCell>

            <TableCell
              sx={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Quantity
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.schedule.map((row, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {rows.farmers[key].farmerName}
                </TableCell>

                <TableCell align="right">{row.fertilizer.name}</TableCell>
                <TableCell align="right">{row.fertilizer.type}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">
                  ₹{" "}
                  {row.quantity.split(" ")[1] == "ml" &&
                    parseFloat(row.quantity.split(" ")[0]) * Number(10)}
                  {row.quantity.split(" ")[1] == "l" &&
                    parseFloat(row.quantity.split(" ")[0]) * Number(100)}
                  {row.quantity.split(" ")[1] == "kg" &&
                    parseFloat(row.quantity.split(" ")[0]) * Number(100)}
                  {row.quantity.split(" ")[1] == "ton" &&
                    parseFloat(row.quantity.split(" ")[0]) * Number(1000)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
