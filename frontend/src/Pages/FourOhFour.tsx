import styled from "styled-components";



export default function FourOhFour() {
  return (
    <Container>
        <H1>404</H1>
        <P>Page not found</P>
    </Container>
  )
}

const Container = styled.div`
    display:flex;
    flex-direction: column;
    width:100%;
    height:100vh;
    align-items: center;
    justify-content:center;
    line-height:110%;
    font-size: 4rem;
    letter-spacing: .5rem;
    text-align: center;
`
const H1 = styled.h1`
    color:#f5f5f5
`
const P = styled.p`
    color:#f5f5f5;
`