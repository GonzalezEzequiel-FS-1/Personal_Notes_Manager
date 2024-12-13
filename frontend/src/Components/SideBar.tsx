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
//  Used for debugging Session Data
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
  
        <UserAvatar></UserAvatar>

      <DataCont></DataCont>
      <DataCont>
        <Button onClick={handleLogout} type="button" text="Log Out" />
        <Button onClick={printSessionData} type="button" text="Print Session Data" />
      </DataCont>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 15%;
  min-width: 20rem;
  
  background-color: #222222;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #55555550;
  padding:1rem;
`;
const DataCont = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  
  align-items: center;
  
  &:first-of-type{

    height:20%;
    padding:10%;
  }&:nth-of-type(2){
    height:70%;

  }&:nth-of-type(3){
    justify-content: center;
    height:10%;

  }
  `
  const UserAvatar = styled.div`
  border-radius: 50%;

  aspect-ratio: 1/1;
  width:90%;


  `
