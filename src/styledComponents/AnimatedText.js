// Styling for Animated Text

import styled, { keyframes } from 'styled-components';

const logoAnimation = keyframes`
  0% {
    background-position:0% 50%
  }
  50%{
    background-position:100% 50%
}
  100% {
    background-position:0% 50%;
  }
`;

const AnimatedText = styled.h1`
    font-size: 70px;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 900;
    margin-bottom: 20px;
    letter-spacing: -3.2px;
    text-align: center;
    background: linear-gradient(270deg, #fd5768, #fbb129, #fbca18);
    background-size: 600% 600%;
    -webkit-animation: ${logoAnimation} 5s ease infinite;
    -moz-animation: ${logoAnimation} 5s ease infinite;
    animation: ${logoAnimation} 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
`

export default AnimatedText;