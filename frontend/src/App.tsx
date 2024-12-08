import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import FourOhFour from "./Pages/FourOhFour";
import SignUp from "./Pages/SignUp";


function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<FourOhFour />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display:flex;
  flex-direction: column;
  width:100vw;
`;
