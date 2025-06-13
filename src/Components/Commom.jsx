import React from 'react'
import styled from 'styled-components'

function Commom(props) {
  return (
    <Option type={props.type} onClick={props.onClick}>
      <IconWrapper>{props.icon}</IconWrapper>
      <Title>{props.title}</Title>
    </Option>
  )
}

export default Commom

// Styled Components
const Option = styled.button`
  width: 50%;
  height: 6vh;
  display: flex;
  outline: none;
  border: none;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: normal;
  font-size: 15px;
  box-shadow: 0px 2px 12px #363737ac;
  border-radius: 3px;
  background-color: #2c2d2d;
  color: white;
  margin: 8px;
  padding: 0 15px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 100%;         /* Full width on small screens */
    font-size: 14px;     /* Slightly smaller font */
    height: 50px;        /* Fixed height to maintain button size */
    margin: 6px 0;       /* Adjust vertical spacing */
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Title = styled.span`
  display: inline-block;
`;
