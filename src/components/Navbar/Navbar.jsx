import React from 'react';
import './Navbar.css';
import { useDate, useAuth } from "../../Context";
import { SearchStayWithDate } from '../SearchStayWithDate/SearchStayWithDate';
import { AuthModal } from '../AuthModal/AuthModal';

export const Navbar = () => {
  const { isSearchModalOpen, destination, dateDispatch, checkinDate, checkoutDate, guests } = useDate();
  const { isAuthModalOpen, authDispatch } = useAuth();

  const handleSearchClick = () => {
    dateDispatch({ type: "OPEN_SEARCH_MODAL" });
  };

  const handleAuthClick = () => {
    authDispatch({ type: "SHOW_AUTH_MODAL" });

    if (process.env.NODE_ENV === "development") {
      console.log("isAuthModalOpen:", isAuthModalOpen);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  const formattedCheckin = formatDate(checkinDate);
  const formattedCheckout = formatDate(checkoutDate);

  return (
    <header className="heading d-flex align-center">
      <>
        <h1 className="heading-title">
          <a className="link" href="/">BreezeTravel</a>
        </h1>
        <div className="form-container d-flex align-center shadow" onClick={handleSearchClick}>
          <span className="form-option">{destination || "Any Where"}</span>
          <span className="border-right-1px"></span>
          <span className="form-option">
            {formattedCheckin && formattedCheckout ? `${formattedCheckin} - ${formattedCheckout}` : "Dates"}
          </span>
          <span className="border-right-1px"></span>
          <span className="form-option">{guests > 0 ? `${guests} guests` : "Add guests"}</span>
          <span className="search material-icons-outlined">search</span>
        </div>
      </>
      <nav className="d-flex align-center gap-large">
        <div className="nav d-flex align-center">
          <span className="material-icons-outlined profile-option menu">menu</span>
          <span className="material-icons-outlined profile-option person" onClick={handleAuthClick}>person_2</span>
        </div>
      </nav>
      {isAuthModalOpen && <AuthModal key="auth-modal" />}
      {isSearchModalOpen && <SearchStayWithDate key="search-modal" />}
    </header>
  );
};