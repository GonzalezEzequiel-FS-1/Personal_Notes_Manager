import styled from "styled-components";
import InputField from "../Components/inputField";
import { useState } from "react";
import Button from "../Components/Button";
export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("")
  const checkPasswords = ()=>{
    if(userPass !== confirmPass){

        return false
    }else{
        return true;
    }
    

}
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('')
    try{
    if(!userName || !userEmail || !userPass || !confirmPass){
        return setError("Please fill all required fields")
    }
    if(!checkPasswords()){
        return setError("Passwords Did Not Match")
    }
    console.log(userName, userEmail, userPass, confirmPass);
}catch(err: any){
    setError(err.message)
}
  };

  return (
    <Container>
      <FormContainer onSubmit={submitForm}>
        <Text>Create An Account</Text>
        <Error>{error}</Error>
        <InputField
          type="text"
          onChange={(e) => {
            setError("")
            setUserName(e.target.value)
            }
        }
          value={userName}
          placeholder="User Name"
        />
        <InputField
          type="email"
          onChange={(e) => {
            setError("")
            setUserEmail(e.target.value)
            }
        }
          value={userEmail}
          placeholder="Email"
        />
        <InputField
          type="password"
          onChange={(e) => {
            setError("")
            setUserPass(e.target.value)
            }
        }
          value={userPass}
          placeholder="Password"
        />
        <InputField
          type="password"
          onChange={(e) => {
            setError("")
            setConfirmPass(e.target.value)
            }
        }
          value={confirmPass}
          placeholder="Confirm Password"
        />
        <Button type="submit" text="Sign Up"></Button>
        <Disclaimer>By signing up, you agree to our Terms of Service and Privacy Policy. You must be at least 18 years old to create an account.</Disclaimer>
      </FormContainer>
      
    </Container>
  );
}
const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    align-items: center;
    justify-content: center;
`
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 1.5rem;
  width: 30%;
  height: fit-content;
  padding: 4rem 6rem;
  background-color: #66666680;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #cccccc40;
`;
const Error = styled.p`
    color:red;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size: 2rem;
`
const Text = styled.p`
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 2rem;
    text-align: center;
    color:#f1f1f1;
    letter-spacing: .25rem;
`

const Disclaimer = styled.p`
    margin-top: 2rem;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    text-align: justify;
    color:#f1f1f190;
    letter-spacing: .15rem;
`