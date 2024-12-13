import styled from "styled-components";
import InputField from "../Components/InputField";
import { useState } from "react";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUser } from "../features/usersSlice";

const API_URL = 'http://localhost:3000/api/signin'

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [error, setError] = useState("");
  const handleNavigateSignin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate('/');
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (!userName || !userPass) {
        return setError("Please fill all required fields");
      }

      
      const response = await axios.post(`${API_URL}`, {
        userName,
        userPassword: userPass,
      },{
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response.data)
      if (response.data.isAuthenticated === true) {
        console.log('Saving Data to store')
        dispatch(setUser({userName}));
        localStorage.setItem("user",userName)
        navigate('/home'); 
      }
    } catch (err: any) {
      if (err) {
        if(err.status === 404){
          setError("Incorrect Credentials")
        }
        
      } else {
        setError("Network error or server unavailable");
      }
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={submitForm}>
        <Text>Sign in to your Account</Text>
        <Error>{error}</Error>
        <InputField
          type="text"
          onChange={(e) => {
            setError("");
            setUserName(e.target.value);
          }}
          value={userName}
          placeholder="User Name"
        />
        <InputField
          type="password"
          onChange={(e) => {
            setError("");
            setUserPass(e.target.value);
          }}
          value={userPass}
          placeholder="Password"
        />
        <ButtonContainer>
          <Button type="submit" text="Sign In" />
          <Button onClick={handleNavigateSignin} type="button" text="Sign Up" />
        </ButtonContainer>
        <Disclaimer>
          By signing up, you agree to our Terms of Service and Privacy Policy.
          You must be at least 18 years old to create an account.
        </Disclaimer>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 1.5rem;
  margin: 2rem;
  max-width: 40rem;
  min-width: 20rem;
  padding: 4rem;
  background-color: #66666680;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #cccccc40;
`;

const Error = styled.p`
  color: red;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  font-size: 2rem;
`;

const Text = styled.p`
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 2rem;
  text-align: center;
  color: #f1f1f1;
  letter-spacing: 0.25rem;
`;

const Disclaimer = styled.p`
  margin-top: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  text-align: justify;
  color: #f1f1f190;
  letter-spacing: 0.15rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;