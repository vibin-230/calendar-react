import moment from 'moment'
import React, { useReducer, useEffect } from 'react'

export const Calendar = (props) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      currentDate: moment(),
      startOfMonth: moment(props.date).startOf('month').startOf('week'),
      endOfMonth: moment(props.date).endOf('month').endOf('week'),
      nextMonth: false,
      previousMonth: false
    }
  )
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const dayNameShort = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

  const singleDay = (dayFullFormat, days) => {
    return (
      <span
        style={{
          flex: 1,
          height: '30px',
          display: 'flex',
          cursor: 'pointer',
          backgroundColor:
            moment(days).format('DDMMYYYY') ===
            moment(props.selectedDate).format('DDMMYYYY')
              ? '#ffeaec'
              : moment(days).format('MMYYYY') ===
                moment(state.currentDate).format('MMYYYY')
              ? '#eceaff'
              : '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
          color:
            moment(days).format('DDMMYYYY') ===
            moment(state.currentDate).format('DDMMYYYY')
              ? '#ffa100'
              : '#4a4a4a',
          border:
            moment(days).format('DDMMYYYY') ===
            moment(props.selectedDate).format('DDMMYYYY')
              ? '1px solid #ffa100'
              : '1px solid #eceaff'
        }}
        onClick={() => {
          props.setSelectedDate(moment(dayFullFormat))
        }}
      >
        {moment(days).format('D')}
      </span>
    )
  }
  const days = (date) => {
    let startOfMonth = moment(date).startOf('month').startOf('week')
    let endOfMonth = moment(date).endOf('month').endOf('week')
    let weekStart = moment(startOfMonth)
    let daysRow = []
    let week = []
    while (weekStart < endOfMonth) {
      let row = []
      let weekEnd = moment(weekStart).endOf('week')
      let days = moment(weekStart)
      for (let i = 0; i < weekEnd.diff(weekStart, 'days') + 1; i++) {
        let dayFullFormat = moment(days)
        row.push(singleDay(dayFullFormat, days))
        days.add(1, 'days')
      }
      week.push(<div style={{ display: 'flex' }}>{row}</div>)
      weekStart.add(7, 'days')
    }
    daysRow.push(week)
    week = []
    return daysRow
  }
  useEffect(() => {
    setState({
      startOfMonth: moment(props.date).startOf('month').startOf('week'),
      endOfMonth: moment(props.date).endOf('month').endOf('week')
    })
  }, [props.date])
  useEffect(() => {
    if (state.nextMonth) {
      setTimeout(() => {
        props.setDate(moment(props.date).startOf('month').add(1, 'month'))
        setState({ nextMonth: false })
      }, 500)
    }
  }, [state.nextMonth])
  useEffect(() => {
    if (state.previousMonth) {
      setTimeout(() => {
        props.setDate(moment(props.date).startOf('month').subtract(1, 'month'))
        setState({ previousMonth: false })
      }, 500)
    }
  }, [state.previousMonth])

  return (
    <div>
      {/* style={{ width: "100%", margin: "auto" }}> */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            border: '2px solid #ececec',
            width: '400px',
            margin: 'auto',
            zIndex: 1
          }}
        >
          {dayNames.map((a, i) => (
            <span
              style={{
                padding: '10px',
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#eaeaea'
              }}
              key={i}
            >
              {a}
            </span>
          ))}
        </div>
        <span
          style={{
            display: 'flex',
            width: '400px',
            justifyContent: 'center',
            margin: 'auto',
            overflow: 'hidden'
          }}
        >
          <span
            style={{
              minWidth: '400px',
              border: '2px solid #ececec',
              backgroundColor: '#ffffff',
              transform: state.previousMonth
                ? 'translateX(100%)'
                : 'translateX(0)',
              transition: state.previousMonth ? 'transform 500ms' : 'none',

              zIndex: state.previousMonth ? '2' : '0',
              display: 'block',
              // position: "absolute",
              left: 0
            }}
          >
            {' '}
            {days(moment(props.date).startOf('month').subtract(1, 'month'))}
          </span>
          <span
            style={{
              minWidth: '400px',
              border: '2px solid #ececec',
              transform: state.previousMonth
                ? 'translateX(100%)'
                : state.nextMonth
                ? 'translateX(-100%)'
                : 'translateX(0)',
              transition: state.previousMonth
                ? 'transform 500ms'
                : state.nextMonth
                ? 'transform 500ms'
                : 'none',
              zIndex: '2',
              zIndex: 1,
              backgroundColor: '#ffffff',
              display: 'block'
            }}
          >
            {days(props.date)}
          </span>
          <span
            style={{
              minWidth: '400px',
              border: '2px solid #ececec',

              backgroundColor: '#ffffff',
              transform: state.nextMonth
                ? 'translateX(-100%)'
                : 'translateX(0)',
              transition: state.nextMonth ? 'transform 500ms' : 'none',
              zIndex: state.nextMonth ? '2' : '0',
              display: 'block',
              // position: "absolute",
              right: 0
            }}
          >
            {days(moment(props.date).startOf('month').add(1, 'month'))}
          </span>
        </span>
      </div>
      <div>
        <button
          onClick={() => {
            // props.setDate(
            //   moment(props.date).startOf("month").subtract(1, "month")
            // );
            setState({ previousMonth: true })
          }}
        >
          Prev
        </button>

        <button
          onClick={() => {
            // props.setDate(moment(props.date).startOf("month").add(1, "month"));
            setState({ nextMonth: true })
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
