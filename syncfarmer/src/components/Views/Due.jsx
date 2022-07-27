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

export default function Due() {
  const [rows, setRows] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState("");
  const [tomorrow, setTomorrow] = React.useState("");

  const returnToday = () => {
    var date = new Date();
    var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    setCurrentDate(dateString);
  };

  const returnTomorrow = () => {
    let x = new Date(
      +new Date().setHours(0, 0, 0, 0) + 86400000
    ).toLocaleDateString("fr-CA");
    setTomorrow(x);
  };

  useEffect(() => {
    axios.get("http://localhost:4000/allRecords").then((response) => {
      if (!response) {
        console.log("%cFailed", "font-size:1.3rem;color:red", response);
      } else {
        if (response.data.msg == "ok") {
          console.log("%cRES", "font-size:2rem;color:pink", response.data.obj);
          setRows(response.data.obj);
          returnToday();
          returnTomorrow();
        } else {
          console.log("----<>");
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
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>
              Phone Number
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Sowing Date
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              After Sowing
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Due Today
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", color: "white" }}
              align="right"
            >
              Due Tomorrow
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.farmers &&
            rows.farmers.map((row, key) => (
              <TableRow
                key={key}
                sx={{ "&:sslast-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.farmerName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.phoneNumber}
                </TableCell>
                {rows.farmerDatas[key] ? (
                  <TableCell align="right">
                    {rows.farmerDatas[key].sowingDate.substr(
                      0,
                      rows.farmerDatas[key].sowingDate.indexOf("T")
                    )}
                  </TableCell>
                ) : (
                  <TableCell align="right">Pending Record</TableCell>
                )}
                {rows.schedule[key] ? (
                  <TableCell align="right">
                    {rows.schedule[key].afterSowing.substr(
                      0,
                      rows.schedule[key].afterSowing.indexOf("T")
                    )}
                  </TableCell>
                ) : (
                  <TableCell align="right">Pending Record</TableCell>
                )}

                {rows.schedule[key] && (
                  <TableCell align="right">
                    {currentDate ==
                    rows.schedule[key].afterSowing.substr(
                      0,
                      rows.schedule[key].afterSowing.indexOf("T")
                    ) ? (
                      <Typography sx={{ fontWeight: "bold", color: "red" }}>
                        Due Today
                      </Typography>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                )}
                {rows.schedule[key] && (
                  <TableCell align="right">
                    {tomorrow &&
                    currentDate &&
                    (parseInt(tomorrow.slice(-2)) ==
                      // parseInt(
                      //   rows.schedule[key].afterSowing
                      //     .substr(
                      //       0,
                      //       rows.schedule[key].afterSowing.indexOf("T")
                      //     )
                      //     .slice(-2)
                      // )
                      rows.schedule[key].afterSowing
                        .substr(0, rows.schedule[key].afterSowing.indexOf("T"))
                        .slice(-2)) ==
                      1 ? (
                      <Typography sx={{ fontWeight: "bold", color: "red" }}>
                        Due Tomorrow
                      </Typography>
                    ) : (
                      "-"
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
