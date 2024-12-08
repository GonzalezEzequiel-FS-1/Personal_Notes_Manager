import styled from "styled-components";

// Define prop types
interface InputFieldProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>; 
  value: string;
  type:string;
  placeholder: string;
}

export default function InputField({ onChange, value, placeholder, type }: InputFieldProps) {
  return (
    <TextField
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
    />
  );
}

const TextField = styled.input`
  text-align: center;
  background-color: #00000080;
  color:#fff;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: 600;
  letter-spacing: .15rem;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #fff;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 5px 5px 5px black;

  &:focus {
    border-color: #4d90fe;
    outline: none;
  }
`;
