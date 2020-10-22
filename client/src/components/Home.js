import React from 'react';
import styled from 'styled-components';
import Contacts from './contacts/Contacts';
import Clock from './clock/Clock';

const Home = () => (
   <Wrapper>
     <MenuDiv> Clonify </MenuDiv>
    <BodyDiv>
      <Clock/>
    </BodyDiv>
    {/* <Contacts /> */}
   </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
`
const MenuDiv = styled.div`
  padding: 1rem;
  width: 300px;
  text-align: center;
  flex-shrink: 0;
`
const BodyDiv = styled.div`
  background: #f3f3fa;
  width: 100vw;
`
export default Home