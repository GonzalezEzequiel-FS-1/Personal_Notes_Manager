import styled from "styled-components";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/usersSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SideBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handlePrintData = async (e: any) =>{
    e.preventDefault();
    const sessionData = await axios.post('http://localhost:3000/api/print')

  }
  
  const handleLogout = async () => {
    console.log("clearing user");
    dispatch(clearUser())
    console.log('user cleared')
  };
  const printSessionData = async () =>{
    try{
    const data = await axios.post("http://localhost:3000/api/logout")
    console.log(JSON.stringify(data))
    }catch(error: any){
      console.log(error.message)
    }
  }
  return (
    <Container>
      <DataCont></DataCont>
      <DataCont></DataCont>
      <DataCont>

        <Button onClick={handleLogout} type="button" text="Log Out" />
        <Button onClick={handlePrintData} type="button" text="PrintData" />

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
