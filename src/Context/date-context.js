import { createContext, useContext, useReducer, useEffect } from "react";
import { dateReducer } from "../reducer";

const initialValue = {
  destination: "",
  guests: 0,
  checkinDate: localStorage.getItem('checkinDate') ? new Date(localStorage.getItem('checkinDate')) : null,
  checkoutDate: localStorage.getItem('checkoutDate') ? new Date(localStorage.getItem('checkoutDate')) : null,
  isSearchModalOpen: false,
  isSearchResultOpen: true,
}

const DateContext = createContext(initialValue);

const DateProvider = ({children}) => {
  const [ {destination, guests, checkinDate, checkoutDate, isSearchModalOpen, isSearchResultOpen}, dateDispatch ] = useReducer(dateReducer, initialValue)

  useEffect(() => {
    localStorage.setItem('checkinDate', checkinDate?.toISOString());
    localStorage.setItem('checkoutDate', checkoutDate?.toISOString());
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

export { useDate, DateProvider }