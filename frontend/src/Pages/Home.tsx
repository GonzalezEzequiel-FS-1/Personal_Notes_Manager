import styled from 'styled-components';
import NotePad from '../Components/NotePad';
export default function Home() {
  return (
    <Container>
      <NotePad />
    </Container>
  )
}
const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    height:100vh;
    padding: 2rem;
`