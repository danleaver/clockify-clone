import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TimeIn from './TimeIn';
import History from './History';
import DailyTotal from './DailyTotal';
import { CardContext } from '../../providers/CardProvider';
import CardDetails from '../card/CardDetails';
import Project from '../project/Project';
import PunchList from '../punch-list/PunchList';

const Clock = () => {
  const { currentCard, setCurrentCard, newCard, setNewCard, ...context } = useContext(CardContext);
  const [ clockedIn, setClockedIn ] = useState(false);
  const [ startTime, setStartTime ] = useState(null);
  const [ showHistory, setShowHistory ] = useState(false);
  const [ project_id, setProjectId ] = useState(1);
  const [ projectCard, setProjectCard ] = useState(null);

  useEffect(()=>{
    axios.get('/api/search/cards')
      .then(res=> {
        setCurrentCard(res.data[0])
      })
      .catch(console.log)
  }, [])

  useEffect(() => {
    if (currentCard) {
      axios.get(`/api/cards/${currentCard.id}/project_cards`)
      .then(res => {
        console.log(res.data)
        setProjectCard(res.data)
      })
      .catch(console.log)
    }
   
  },[currentCard])

  useEffect(() => {
    if (currentCard && !currentCard.time_out) { 
      setClockedIn(true)
      let d = new Date(currentCard.time_in).toLocaleString()
      setStartTime(d)
    } else { 
      setClockedIn(false)
    }
  }, [currentCard])

  const toggleClock = () => {
    if (!clockedIn) {
      clockIn()
    } else checkRollOver();
  }

  let j = 0  

  const checkRollOver = (timeIn = currentCard.time_in) =>{
    let time_in = new Date(timeIn).toLocaleDateString() 
    if (time_in === new Date().toLocaleDateString()) {
      clockOut(new Date())
    } else if (j < 1000) { //prevent infinite loops debugging only
      let nextDay = new Date(time_in)
      nextDay.setDate(nextDay.getDate() + 1);
      let _1159pm = new Date(nextDay.getTime() - 1)
      clockOut(_1159pm)
        .then(clockInRollOver(nextDay))
      j++
    }
  }
  
  const clockInRollOver = (midnight) => {
    axios.post('/api/cards', {time_in: midnight}) 
      .then(res => checkRollOver(res.data.time_in))
      .catch(console.log)
  }
  
  let i = -1

  const clockOut = (time_out) => {
    i++
    return new Promise((resolve, reject) => {
      axios.patch(`api/cards/${currentCard.id + i}`, {time_out}) 
        .then(res => {
          setCurrentCard(null)
          updateClockList(res.data) 
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject()
        })
    })
  }
  
  const clockIn = () =>{
    axios.post('/api/cards', {time_in: new Date()}) 
      .then(res => setCurrentCard(res.data))
      .catch(console.log)
  }

  const updateClockList = (newCard) => {
    setNewCard(newCard)
    console.log("newCard",newCard) //
  }

  const toggleHistory = () => {
    setNewCard(null)
    setShowHistory(!showHistory)
  }
  
  return (
   <Wrapper>
     <NewPunchDiv>
        {currentCard && !currentCard.time_out 
          ? 
            <>
              <CardDetails currentCard={currentCard}/>
              <Flex>
                    { projectCard && 
                      <Project card={currentCard} projectCard={projectCard} setProjectCard={setProjectCard} />
                    }
                    Start: {startTime}
                  <TimeIn currentCard={currentCard}/>
                <ButtonDiv >
                  <StyledButton clockedIn={clockedIn} onClick={toggleClock}>
                    {clockedIn ? "STOP" : "START"}
                  </StyledButton>
                </ButtonDiv>
              </Flex>
            </>
          : 
            <>
              <div />
                <ButtonDiv >
                  <StyledButton clockedIn={clockedIn} onClick={toggleClock}>
                    {clockedIn ? "STOP" : "START"}
                  </StyledButton>
                </ButtonDiv>
            </>
        }
      </NewPunchDiv>
      <PunchList />
      <div>
        <DailyTotal />
      </div>
      {/* <ButtonDiv>
        <button onClick={toggleHistory}>History</button>
      </ButtonDiv> */}
    <History newCard={newCard}/>
   </Wrapper>
  )
}

const NewPunchDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  border: 1px solid grey;
  background: white;
`
const Flex = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`
const ButtonDiv = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: right;
`
const StyledButton = styled.button`
  color: white;
  border: none;
  padding: 0.5rem 0;
  border-radius: 2px;
  width: 80px;

  ${props => props.clockedIn 
    ? 'background: #f22013;'
    : 'background: #01a9f4;'
  }
`
const Wrapper = styled.div`
  padding: 1rem;
`
export default Clock