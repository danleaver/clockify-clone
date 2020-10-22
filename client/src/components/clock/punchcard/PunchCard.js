import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import EditPunchCard from './EditPunchCard';
import EditPunch from './EditPunch';

const PunchCard = ({card, ...props}) => {
  const [ editing, setEditing ] = useState(false);
  
  const handleClick = (e) => {
    setEditing(!editing)
  }

  const handleDelete = () => {
    axios.delete(`/api/cards/${card.id}`)
      .then(res => props.removeCard(card.id))
      .catch(console.log)
  }
  return (
    <>
      <Wrapper>
        In: {new Date(card.time_in).toLocaleString()}
        <StyledDiv/>
        Out: {card.time_out && new Date(card.time_out).toLocaleString()}
        <button onClick={handleClick}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </Wrapper>
      {editing && 
        // <EditPunchCard 
        //   updatePunchCard={props.updatePunchCard} 
        //   setEditing={setEditing} 
        //   card={card}
        // /> 
        <EditPunch 
          card={card}
          updatePunchCard={props.updatePunchCard} 
          setEditing={setEditing} 
        />
      }
    </>
  )
}

const StyledDiv = styled.div`
  width: 30px;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid grey;
  background: white;
`
export default PunchCard