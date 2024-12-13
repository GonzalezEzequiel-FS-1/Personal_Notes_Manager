import styled from "styled-components";
import SideBar from "./SideBar";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";

export default function NotePad() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleSaveNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !note.trim()) {
      alert("Title and Note cannot be empty");
      return;
    }

    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const currentTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

    const user = localStorage.getItem("user")
    const fullNote = {
      title,
      note,
      createdOn: formattedDate,
      at: currentTime,
      belongsTo:user
    };

    try {
      const sentNote = await axios.post(
        "http://localhost:3000/api/createnote",
        fullNote,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      


      console.log("Note Data:", sentNote.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(`Error: ${err.response?.data || err.message}`);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <Container>
      <SideBar />
      <SideContainer onSubmit={handleSaveNote}>
        <TitleContainer>
          <TitleTextArea
            aria-label="Title"
            placeholder="Enter note title"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)}
            value={title}
          />
        </TitleContainer>
        <NoteContainer>
          <TextArea
            aria-label="Note"
            placeholder="Write your note here"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
            value={note}
          />
        </NoteContainer>
        <Button text="Save" type="submit" />
      </SideContainer>
    </Container>
  );
}
const TitleContainer = styled.div`
  width: 100%;
  height: 10%;
  background-color: #222222;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: 5px 5px 5px #55555550;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NoteContainer = styled.div`
  width: 100%;
  height: 90%;
  background-color: #222222;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #55555550;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-bottom: 1rem;
`;
const Container = styled.div`
  height: 100%;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  overflow: hidden;
`;
const SideContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 80%;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: #00000000;
  border: none;
  color: white;
  font-size: 2rem;
  padding: 2rem;
  letter-spacing: 0.25rem;
  resize: none;
  outline: none;
  &:active {
    border: none;
  }
`;
const TitleTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: #00000000;
  text-align: center;
  border: none;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.25rem;
  resize: none;
  outline: none;
  &:focus {
    border: none;
  }
`;
