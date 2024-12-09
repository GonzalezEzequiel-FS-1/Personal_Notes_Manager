import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import FourOhFour from "./Pages/FourOhFour";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ProtectedRoutes from "./Authentication/ProtectedRoutes";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<FourOhFour />} />
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;
