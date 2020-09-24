import React, { useState } from 'react';
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import DateTimePicker from 'react-datetime-picker';

import axios from 'axios';
 
const EditPunch = ({clock, ...props}) => {
  const [time_in, onChangeIn] = useState(new Date(clock.time_in));
  const [time_out, onChangeOut] = useState(new Date(clock.time_out));

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.patch(`/api/clocks/${clock.id}`, {time_in, time_out})
      .then(res => {
        props.updatePunchCard(res.data)
        props.setEditing(false)
      })
      .catch(console.log)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DateTimePicker
          onChange={onChangeIn}
          value={time_in}
        />
        <DateTimePicker
          onChange={onChangeOut}
          value={time_out}
        />
        <input type="submit" title="enter" />
      </form>
    </>
  );
}

export default EditPunch