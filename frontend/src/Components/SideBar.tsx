import styled from "styled-components";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectedUser } from "../features/usersSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SideBar() {
  const selector = useSelector(selectedUser);
  const userInSession = selector.userName;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const serverURL = "http://localhost:3000/api";

  //Function to load the notes
  const handleGetallNotes = async () => {
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
  const printSessionData = async () => {
    try {
      const sessionData = await axios.get(
        "http://localhost:3000/api/sessiontester",
        {
          withCredentials: true,
        }
      );
      console.log(sessionData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    handleGetallNotes();
  }, [userInSession]);
  return (
    <Container>
      <UserAvatar></UserAvatar>

      <DataCont>
        <UnList>
          {allNotes.map((note: any) => (
            <List key={note.id || note._id || Math.random()}>
              <NoteTitle>{note.title || "Untitled"}</NoteTitle>
              <NoteCont>{note.note || "No content available"}</NoteCont>
            </List>
          ))}
        </UnList>
      </DataCont>
      <DataCont>
        <Button onClick={handleLogout} type="button" text="Log Out" />
        <Button
          onClick={printSessionData}
          type="button"
          text="Print Session Data"
        />
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
  padding: 1rem;
`;
const DataCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;

  &:first-of-type {
    height: 20%;
    padding: 10%;
  }
  &:nth-of-type(2) {
    height: 70%;
    background-color: red;

  }
  &:nth-of-type(3) {
    justify-content: center;
    height: 10%;
  }
`;
const UserAvatar = styled.div`
  border-radius: 50%;
  aspect-ratio: 1/1;
  width: 90%;
`;

const UnList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  background-color: blue;
  width:100%;
`;
const NoteTitle = styled.p`
  color: #f5f5f5;
  font-size: 3rem;
 white-space: nowrap;
 text-align: left;
`;

const NoteCont = styled.p`
  color: #d0d0d0;
  font-size: 2rem;

`;
const List = styled.li`


`;
