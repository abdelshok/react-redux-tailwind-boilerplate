import styled from 'styled-components';

const NeumorphicLoginButton = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    width: 80%;
    height: 40px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 700;
    font-family: LatoRegular, sans-serif;
    color: #FFF;
    text-align: center;
    box-shadow: 3px 3px 8px #B1B1B1, -3px -3px 8px #FFFFFF;
    transition: 0.5s;
    margin: 0 auto;
    margin-top: 150px;
    background: #7CE199;
    &:hover {
        background: #96fab3;
    }
    &:active {
        background: #74c28b;
    };
`

export default NeumorphicLoginButton;