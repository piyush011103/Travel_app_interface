import {useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "./DateSelector.css"
import {useDate} from '../../Context'

export const DateSelector = ({ checkInType }) => {
  const {checkinDate, checkoutDate, dateDispatch} = useDate()
  const [selectedDate, setSelectedDate] = useState(checkInType === "in" ? checkinDate : checkoutDate)
  const [dateType, setDateType] = useState(checkInType)

  const handleDateChange = (date) => {
    setSelectedDate(date)
    dateDispatch({
      type: dateType === "in" ? "CHECK_IN" : "CHECK_OUT",
      payload: date,
    })
  }

  // const handleDateTypeChange = (type) => {
  //   setDateType(type)
  // }

  return (
    <div>
      <DatePicker
        className='search-dest input'
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
        dateFormat="dd/MM/yyyy" 
        placeholderText = {dateType === "in" ? "Add Check-in Date" : "Add Check-out Date"}
        closeOnScroll={true}
      />
    </div>
  )
}