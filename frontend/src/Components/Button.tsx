import styled from "styled-components";
// Define prop types
interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: "button" | "submit" | "reset";
  text: string;
}
const Button = ({ onClick, type, text }: ButtonProps) => {
  return (
    <Bttn onClick={onClick} type={type}>
      {text}
    </Bttn>
  );
};
const Bttn = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #00000080;
    color: #FFF;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 1.5rem;
    letter-spacing: .15rem;
    cursor: pointer;
    text-transform: uppercase;

        &:hover {
            background-color: #000000;
            color:#CCC
        }
`;
export default Button;
