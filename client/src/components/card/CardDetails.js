import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Project from '../project/Project';

const CardDetails = ({currentCard:card, ...props}) => {

  // console.log("INFO", card)
  const detailsEl = useRef(null)
  const [ details, setDetails ] = useState( card.details || "" );
  const [ taskId, setTaskId ] = useState(null)
  const [ editing, setEditing ] = useState(false)
  const [ initialValues, setInitialValues ] = useState({
    details: card.details || "",
  })
  const [ projectCard, setProjectCard ] = useState(null);

  // console.log("p123calerad", projectCard)
  // useEffect(() => {
  //   // console.log(card, "Card")
  //   axios.get(`/api/cards/${card.id}/project_cards`)
  //     .then(res => {
  //       console.log(res.data)
  //       setProjectCard(res.data)
  //     })
  //     .catch(console.log)
  // },[])
  const handleSubmit = (e) => {
    e.preventDefault()
    detailsEl.current.blur();

    if (initialValues.details !== details) {
      axios.patch(`/api/cards/${card.id}`, {details})
        .then(res => {
          setEditing(false)
          setInitialValues({details})
        })
        .catch(console.log)
      } else {
      setEditing(false)
    }
  }

  return (
    <Wrapper>
      <form style={{width: "100%", flex: "1"}} onSubmit={handleSubmit}>
        <StyledInput 
            ref={detailsEl}
            editing={editing} 
            placeholder="What are you working on?"
            name="details"
            value={details} 
            onChange={(e) => setDetails(e.target.value)} 
            onFocus={() => setEditing(true)}
            onBlur={handleSubmit}
          />
      </form>
      
      {/* {projectCard && <Project card={card} projectCard={projectCard} setProjectCard={setProjectCard}/> } */}
   </Wrapper>
  )
}

const StyledInput = styled.input`
  flex: 1;
  // min-width: 300px;
  // max-width: 500px;
  width: 100%;
  // width: 50vw;
  // width: 30vw;
  height: 40px;
  outline: none;
  padding-left: 0.5rem;
  
  ${props => props.editing 
    ? 
      "border: 1px solid black;"
    : 
      `
        border: 1px solid transparent;
        transition: border 200ms;
        &:hover {
          border: 1px solid black;
          transition: border 500ms;
        }
      `
  }
`
const Wrapper = styled.div`
  display: flex;
  padding: 0 1rem;
  align-items: center;
  // border: 1px solid red;
  width: 100%;
  // flex-grow: 1;
`

export default CardDetails;