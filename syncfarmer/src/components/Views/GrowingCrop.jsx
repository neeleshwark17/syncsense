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
import { Typography } from "@mui/material";

export default function GrowingCrop() {
  const [rows, setRows] = React.useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/growingCrop").then((response) => {
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
              Crop
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Village
            </TableCell>

            <TableCell
              sx={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Sowing Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.farmers.map((row, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {rows.farmerDatas[key] && (
                  <TableCell component="th" scope="row">
                    {row.farmerName}
                  </TableCell>
                )}
                {rows.farmerDatas[key] && (
                  <TableCell align="right">
                    {rows.farmerDatas[key].crop}
                  </TableCell>
                )}
                {rows.farmerDatas[key] && (
                  <TableCell align="right">
                    {rows.farmerDatas[key].village}
                  </TableCell>
                )}
                {rows.farmerDatas[key] && (
                  <TableCell align="right">
                    {rows.farmerDatas[key].sowingDate.substr(
                      0,
                      rows.farmerDatas[key].sowingDate.indexOf("T")
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
