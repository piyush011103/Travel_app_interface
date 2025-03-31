import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./DateSelector.css";
import { useDate } from '../../Context';

export const DateSelector = ({ checkInType }) => {
  const { checkinDate, checkoutDate, dateDispatch } = useDate();
  
  // Determine initial date based on context
  const initialDate = checkInType === "in" ? checkinDate : checkoutDate;
  
  // Convert stored string date to a Date object (if it exists)
  const getDateFromContext = (dateString) => {
    return dateString ? new Date(dateString) : new Date();
  };

  const [selectedDate, setSelectedDate] = useState(getDateFromContext(initialDate));

  useEffect(() => {
    // Update state when context changes
    setSelectedDate(getDateFromContext(initialDate));
  }, [initialDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    dateDispatch({
      type: checkInType === "in" ? "CHECK_IN" : "CHECK_OUT",
      payload: formattedDate,
    });
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy"
      placeholderText={checkInType === "in" ? "Add Check-in Date" : "Add Check-out Date"}
      closeOnScroll={true}
    />
  );
};
