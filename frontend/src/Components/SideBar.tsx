import styled from "styled-components";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/usersSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SideBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const handleLogout = async ()=>{
    try{
      const response = await axios.get('http://localhost:3000/api/logout')
      if(!response){
        return console.log('No Session Data on file')
      }else{
        if (response.data.success === true){
          dispatch(clearUser())
          navigate('/')
        }
      }

    }catch(err: any){
      console.log(err.message)
    }
  }
  const printSessionData = async () =>{
   try{
    const sessionData = await axios.get('http://localhost:3000/api/sessiontester',{
      withCredentials:true
   })
   console.log(sessionData)
  }catch(err){
    console.error(err.message)
  }}
  return (
    <Container>
      <DataCont></DataCont>
      <DataCont></DataCont>
      <DataCont>

        <Button onClick={handleLogout} type="button" text="Log Out" />
        <Button onClick={printSessionData} type="button" text="PrintData" />

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
