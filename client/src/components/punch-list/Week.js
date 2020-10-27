import  React, { useEffect, useState }  from 'react';
import SingleDay from './SingleDay';
import styled from 'styled-components';

const Week = (props) => {
  const [ sum, setSum ] = useState(null);

  useEffect(() => {
    setSum(props.punchcards.map(card => (new Date(card.time_out) - new Date(card.time_in))).reduce((a,b) => a + b )) 
  }, [])

  Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }
  //// get dates from weekNumber and Year
  function getDateRange(weekNo, y=2020){ //set to 2020 for testing
    var d1, numOfdaysPastSinceLastMonday, rangeIsFrom, rangeIsTo;
    d1 = new Date(''+y+'');
    numOfdaysPastSinceLastMonday = d1.getDay() - 1;
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    d1.setDate(d1.getDate() + (7 * (weekNo - d1.getWeek())));
    rangeIsFrom = (d1.getMonth() + 1) + "-" + d1.getDate() + "-" + d1.getFullYear();
    d1.setDate(d1.getDate() + 6);
    rangeIsTo = (d1.getMonth() + 1) + "-" + d1.getDate() + "-" + d1.getFullYear() ;
    return rangeIsFrom + " to " + rangeIsTo;
};

  const renderDays = () => {
    ////filter out unique day numbers from props.punchcards
    let days = Object.values(props.punchcards.reduce( (c, e) => {
      if(!c[e.date]) c[e.date] = e;
      return c
    }, {})).map(r => r.date)

    ////put items from props.punchcards into their respective day groupings. 
    return(
      <>
        {days.map(date => (
          <DayWrapper>
            <SingleDay punchcards={props.punchcards.filter(item => item.date === date)} />
          </DayWrapper>
        ))}
      </>
    )
  }

  return (
    <Wrapper>
      <WeekRangeAndTotalDiv>
        <div>
          {getDateRange(props.punchcards[0].weekNo)}
        </div>
        <div style={{display: "flex", justifyContent: "space-between", width: "130px", alignItems: "flex-end"}}>
          <WeekTotalDiv>
            Week total:     
          </WeekTotalDiv>
          <WeekTotalSumDiv>
            {sum}
          </WeekTotalSumDiv>
        </div>
      </WeekRangeAndTotalDiv>
      {renderDays()}
    </Wrapper>
  )
}

const Wrapper = styled.div`
`
const WeekRangeAndTotalDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
`
const WeekTotalDiv = styled.div`
  font-size: 0.7rem;
  color: #9e9f9f;
  flex-shrink: 0;
`
const WeekTotalSumDiv = styled.div`
`
const DayWrapper = styled.div`
  // background: lightblue;
  padding: 0.5rem 0;
`

export default Week