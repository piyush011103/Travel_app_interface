import { DateSelector } from "../DateSelector/DateSelector";
import "./SearchStayWithDate.css";
import { useDate, useCategory } from "../../Context";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SearchStayWithDate = () => {
  const [hotels, setHotels] = useState([]);
  const { hotelCategory } = useCategory();
  const { destination, guests, isSearchResultOpen, dateDispatch } = useDate();
  const navigate = useNavigate();

  useEffect(() => {
    if (hotels.length === 0) {
      (async () => {
        try {
          const { data } = await axios.get(`http://localhost:3500/api/hotels?category=${hotelCategory}`);
          setHotels(data);
        } catch (err) {
          console.error("Error fetching hotels:", err);
        }
      })();
    }
  }, [hotelCategory, hotels]);

  const handleDestinationChange = (event) => {
    dateDispatch({ type: "DESTINATION", payload: event.target.value });
    dateDispatch({ type: "HIDE_SEARCH_RESULT" });
  };

  const handleGuestChange = (event) => {
    dateDispatch({ type: "GUESTS", payload: event.target.value });
  };

  const selectDestinationFromResults = (address) => {
    dateDispatch({ type: "DESTINATION", payload: address });
  };

  const handleDestinationFocus = () => {
    if (!destination) {
      dateDispatch({ type: "SHOW_SEARCH_RESULT" });
    }
  };

  const handleSearchButtonClick = () => {
    dateDispatch({ type: "CLOSE_SEARCH_MODAL" });
    navigate(`/hotels/${destination}`);
  };

  const handleSearchCloseClick = () => {
    dateDispatch({ type: "CLOSE_SEARCH_MODAL" });
  };

  const lowerCaseDestination = destination.toLowerCase();

  const destinationOptions = hotels.filter(({ address, city, state, country }) =>
    [address, city, state, country].some((location) =>
      location.toLowerCase().includes(lowerCaseDestination)
    )
  );

  return (
    <div className="destination-container">
      <div className="destination-container-inner">
        <div className="destination-option d-flex align-center absolute">
          <div className="location-container">
            <label className="label">Where</label>
            <input
              value={destination}
              onChange={handleDestinationChange}
              onFocus={handleDestinationFocus}
              className="input search-dest"
              placeholder="Search destination"
              autoFocus
            />
          </div>
          <div className="location-container">
            <label className="label">Check In</label>
            <DateSelector checkInType="in" />
          </div>
          <div className="location-container">
            <label className="label">Check Out</label>
            <DateSelector checkInType="out" />
          </div>
          <div className="location-container">
            <label className="label">No. of Guests</label>
            <input
              value={guests || ""}
              className="input search-dest"
              placeholder="Add Guests"
              onChange={handleGuestChange}
            />
          </div>
          <div className="search-container d-flex align-center cursor" onClick={handleSearchButtonClick}>
            <span className="material-icons-outlined">search</span>
            <span>Search</span>
          </div>
          <button className="button absolute close-search-dest">
            <span onClick={handleSearchCloseClick} className="highlight material-icons-outlined">
              highlight_off
            </span>
          </button>
        </div>
        {isSearchResultOpen && (
          <div className="search-result-container absolute">
            {destinationOptions.map(({ address, city }, index) => (
              <p
                key={index}
                className="p cursor-pointer"
                onClick={() => selectDestinationFromResults(address)}
              >
                {address}, {city}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
