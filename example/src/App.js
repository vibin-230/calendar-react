import React from 'react'

import Calendar from './Calendar'
import 'calendar-react/dist/index.css'
import moment from 'moment'

const App = () => {
  return <Calendar date={moment()} />
}

export default App
