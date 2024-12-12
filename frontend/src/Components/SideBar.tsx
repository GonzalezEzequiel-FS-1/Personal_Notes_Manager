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
  //Used for debugging Session Data
  // const printSessionData = async () =>{
  //  try{
  //   const sessionData = await axios.get('http://localhost:3000/api/sessiontester',{
  //     withCredentials:true
  //  })
  //  console.log(sessionData)
  // }catch(err){
  //   console.error(err.message)
  // }}
  return (
    <Container>
      <DataCont>
        <UserAvatar></UserAvatar>
      </DataCont>
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

  height: 100%;
  width: 20%;
  max-width: 15rem;
  min-width: 15rem;
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
    background-color: red;
    height:20%;
    padding:10%;
  }&:nth-of-type(2){
    height:70%;
    background-color: white;
  }&:nth-of-type(3){
    justify-content: center;
    height:10%;
    background-color: orange;
  }
  `
  const UserAvatar = styled.div`
    border-radius: 50%;
    background-color: hotpink;
    width:100%;
    height:100%;
  `
