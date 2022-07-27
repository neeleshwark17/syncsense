import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import './index.css'

function App() {
  return (
    <Router>
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
