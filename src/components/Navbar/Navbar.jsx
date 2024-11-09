import './Navbar.css';
import {useDate, useAuth} from "../../Context"
import { SearchStayWithDate } from '../SearchStayWithDate/SearchStayWithDate';
import { AuthModal } from '../AuthModal/AuthModal';

export const Navbar = () => {
    const { isSearchModalOpen, destination, dateDispatch, checkinDate, checkoutDate, guests} = useDate();
    const { isAuthModalOpen, authDispatch } = useAuth();
    // const { isAuthModalOpen, dispatch: authDispatch } = useAuth();
    const handleSearchClick = () => {
        dateDispatch({
            type: "OPEN_SEARCH_MODAL",
        })
    }

    const handleAuthClick = () => {
        authDispatch({
            type:"SHOW_AUTH_MODAL",
        })
        console.log('isAuthModalOpen:', isAuthModalOpen)
    }

    return (
        <header className="heading d-flex align-center">
            <h1 className="heading-title">
                <a className="link" href="/">
                    TravelO
                </a>
            </h1>
            <div className="form-container d-flex align-center shadow" onClick={handleSearchClick}>
                <span className="form-option">{destination || "Any Where"}</span>
                <span className="border-right-1px"></span>
                <span className="form-option">
                    {
                        checkinDate && checkoutDate
                        ? `${checkinDate.toLocaleDateString("en-US", {
                            day: "numeric", 
                            month:"short"
                        })} - ${checkoutDate.toLocaleDateString("en-US", {
                            day: "numeric", 
                            month:"short"
                        })}`
                        : "Dates"
                    }
                </span>
                <span className="border-right-1px"></span>
                <span className="form-option">
                    {guests > 0 ? `${guests} guests` : "Add guests"}
                </span>
                <span class="search material-icons-outlined">search</span>
            </div>
            <nav className="d-flex align-center gap-large" onClick={handleAuthClick}>
                    <div className="nav d-flex align-center">
                        <span className="material-icons-outlined profile-option menu">menu</span>
                        <span className="material-icons-outlined profile-option person">person_2</span>
                    </div>
            </nav>
            {isAuthModalOpen && (
                <AuthModal />
            )}
            {isSearchModalOpen && (
                <SearchStayWithDate />
            )}
        </header>
    );
};