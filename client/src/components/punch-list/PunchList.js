import  React, { useEffect, useState }  from 'react';
import axios from 'axios';
import Week from './Week';
import styled from 'styled-components';

const PunchList = () => {
  const [ cards, setCards ] = useState(null);
  const [ orderedList, setOrderedList ] = useState(null)
  useEffect(() => {
    axios.get('/api/cards')
      .then(res => {
        setCards(res.data.filter(a => a.time_out))
      })
      .catch(err => {
        console.log(err)
        setCards([])
      })
  }, [])
 
  const getWeekNo = (d) => {
    d = new Date(d);
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);

    // return [d.getUTCFullYear(), weekNo]; //COME BACK AND WORRY ABOUT YEAR LATER
    return weekNo;

  }

  useEffect(() => {
    if(cards){
      setOrderedList(cards.map(card => (
        {weekNo: getWeekNo(card.time_in), date: new Date(card.time_in).toLocaleDateString(), ...card}
      )))
    }
  }, [cards])

  const renderWeeks = () => {
    ////filter out unique week numbers from orderedList
    let weekNos = Object.values(orderedList.reduce( (c, e) => {
      if(!c[e.weekNo]) c[e.weekNo] = e;
      return c
    }, {})).map(r => r.weekNo)
    
    ////put items from orderedList into their respective week groupings. 
    return (
      <Wrapper>
        {weekNos.reverse().map(number => (
          <>
            <Week punchcards={orderedList.filter(item => item.weekNo === number)} />
          </>
        ))}
      </Wrapper>
    )
  }

  return (
    orderedList && renderWeeks()
  )
}

const Wrapper = styled.div`
  padding: 0.5rem 0;
  background: #f2f6f8;
`

export default PunchList