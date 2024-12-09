import styled from "styled-components";
import SideBar from "./SideBar";

export default function NotePad() {
  return (
    <Container>

        <SideBar />
      <SideContainer>
        <TitleContainer>
          
        </TitleContainer>
        <NoteContainer>
          
        </NoteContainer>
      </SideContainer>
    </Container>
  );
}
const TitleContainer = styled.div`
  width: 100%;
  height: 20%;
  background-color: #222222;
  border-radius: 20px;
  margin-bottom:2rem ;
  box-shadow: 5px 5px 5px #55555550;
`;
const NoteContainer = styled.div`
  width: 100%;
  height: 80%;
  background-color: #222222;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #55555550;
`;
const Container = styled.div`
  height: 100%;
  display: flex;
  gap: 2rem;
  align-items: center;

  width: 100%;
  overflow: hidden;
`;
const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
`;
const SideBarContainer = styled.div`
    width:20%;
    height:100%;
`