import { createContext, useContext, useReducer, useEffect } from "react";
import { dateReducer } from "../reducer";

// Function to safely parse dates
const getValidDate = (dateString) => {
  const parsedDate = Date.parse(dateString);
  return !isNaN(parsedDate) ? new Date(parsedDate) : null;
};

const initialValue = {
  destination: "",
  guests: 0,
  checkinDate: getValidDate(localStorage.getItem('checkinDate')),
  checkoutDate: getValidDate(localStorage.getItem('checkoutDate')),
  isSearchModalOpen: false,
  isSearchResultOpen: true,
};

const DateContext = createContext(initialValue);

const DateProvider = ({ children }) => {
  const [state, dateDispatch] = useReducer(dateReducer, initialValue);
  const { destination, guests, checkinDate, checkoutDate, isSearchModalOpen, isSearchResultOpen } = state;

  useEffect(() => {
    if (checkinDate instanceof Date && !isNaN(checkinDate)) {
      localStorage.setItem('checkinDate', checkinDate.toISOString());
    } else {
      localStorage.removeItem('checkinDate'); // Remove invalid data
    }

    if (checkoutDate instanceof Date && !isNaN(checkoutDate)) {
      localStorage.setItem('checkoutDate', checkoutDate.toISOString());
    } else {
      localStorage.removeItem('checkoutDate');
    }
  }, [checkinDate, checkoutDate]);

  return (
    <DateContext.Provider
      value={{
        destination,
        guests,
        checkinDate,
        checkoutDate,
        isSearchModalOpen,
        isSearchResultOpen,
        dateDispatch
      }}>
      {children}
    </DateContext.Provider>
  );
};

const useDate = () => useContext(DateContext);

export { useDate, DateProvider };
