import styled from "styled-components";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectedUser } from "../features/usersSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { RootState } from "../features/store";
export default function SideBar() {
  const selector = useSelector(selectedUser);
  const userInSession = selector.userName;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const serverURL = "http://localhost:3000/api";
  const isUpdating = useSelector((state:RootState)=>state.update.isUpdating)

  //Function to load the notes
  const handleGetallNotes = async () => {
    console.log(`Is Updating value before try: ${JSON.stringify(isUpdating)}`)
    try {
      const response = await axios.get(
        `${serverURL}/fetchnotes/${userInSession}`,
        {
          withCredentials: true,
        }
      );

      // Check if the response contains data
      if (!response.data) {
        console.log("No data in server response");
        setError("No data in server response");
        return;
      }
      console.log(`Is Updating value after axios: ${JSON.stringify(isUpdating)}`)
      // Update the notes state
      setAllNotes(response.data.notes);
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    }
  };

  //Function to handle the logout sequence
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/logout");
      if (!response) {
        return console.log("No Session Data on file");
      } else {
        if (response.data.success === true) {
          dispatch(clearUser());
          navigate("/");
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  //  Used for debugging Session Data
  useEffect(() => {
    handleGetallNotes()
  },[isUpdating]);
  return (
    <Container>
      <UserAvatar>
        <Text>USER PIC</Text>
      </UserAvatar>

   
        <UnList>
          {allNotes.map((note: any) => (
            <List key={note.id || note._id || Math.random()}>
              <NoteTitle>{note.title || "Untitled"}</NoteTitle>
              <NoteCont>{note.note || "No content available"}</NoteCont>
            </List>
          ))}
        </UnList>

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
  gap:2rem;
  height: 100%;
  width: 15%;
  min-width: 20rem;

  background-color: #222222;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #55555550;
  padding: 1rem;
`;
const DataCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:2rem;
`;
const UserAvatar = styled.div`
  border-radius: 50%;
  aspect-ratio: 1/1;
  width: 40%;
  display:flex;
  align-items: center;
  justify-content: center;
  background-color:  #656565;
`;

const UnList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: scroll;
`;
const NoteTitle = styled.p`
  color: #f5f5f5;
  font-size: 3rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  text-transform: capitalize;
`;

const NoteCont = styled.p`
  color: #d0d0d0;
  font-size: 2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const List = styled.li``;

const Text = styled.h1`
  color:white;
  font-size:2rem;
  overflow: hidden;
  text-align: center;
`