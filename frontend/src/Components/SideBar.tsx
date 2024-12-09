import styled from "styled-components";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/usersSlice";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    console.log("clearing user");
    dispatch(clearUser())
    console.log('user cleared')
    navigate('/signin')
  };
  return (
    <Container>
      <DataCont></DataCont>
      <DataCont></DataCont>
      <DataCont>
        <Button onClick={handleLogout} type="button" text="Log Out" />
      </DataCont>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 20%;
  background-color: #222222;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #55555550;
  padding:1rem;
`;
const DataCont = styled.div`
  width:100%;
  `
