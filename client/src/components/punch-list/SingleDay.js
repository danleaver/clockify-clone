import  React, { useEffect, useState }  from 'react';
import styled from 'styled-components';

const SingleDay = (props) => {
  const [ sum, setSum ] = useState(null);

  useEffect(() => {
    setSum(props.punchcards.map(card => (new Date(card.time_out) - new Date(card.time_in))).reduce((a,b) => a + b )) 
  }, [])

  return (
    <Wrapper>
      <DateAndTotal>
        <div>
          {props.punchcards[0].date}
        </div>
        <div>
          Total: {sum}
        </div>
      </DateAndTotal>
      <CardDetailsDiv>
        {props.punchcards.map( card => (card.weekNo))}
      </CardDetailsDiv>
    </Wrapper>
  )
}

const Wrapper = styled.div`  
  background: white;
  border: 1px solid #c6d2d9;
  border-radius: 2px;
  border-bottom: 6px solid #c6d2d9;
`
const DateAndTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #e4eaee;
`
const CardDetailsDiv = styled.div`
  border-top: 1px solid #c6d2d9; 
`

export default SingleDay