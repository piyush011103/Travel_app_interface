import "./FinalPrice.css";
import { useDate } from "../../Context";
import { DateSelector } from "../DateSelector/DateSelector";
import { useNavigate } from "react-router-dom";

export const FinalPrice = ({ singleHotel }) => {
    const { _id, price, rating } = singleHotel;
    const navigate = useNavigate();
    const { guests, dateDispatch, checkinDate, checkoutDate } = useDate();

    const handleGuestChange = (event) => {
        const guestCount = Math.max(1, Number(event.target.value)); // Prevents negative guests
        dateDispatch({
            type: "GUESTS",
            payload: guestCount,
        });
    };

    const handleReserveClick = () => {
        console.log("Reserve Clicked");
        
        navigate(`/confirm-booking/stay/${_id}`);
    };

    const getNightsCount = () => {
        if (!checkinDate || !checkoutDate) return 0;
        const checkIn = new Date(checkinDate);
        const checkOut = new Date(checkoutDate);
        return Math.max(1, (checkOut - checkIn) / (1000 * 60 * 60 * 24)); // Ensures minimum 1 night
    };

    const nights = getNightsCount();
    const totalCost = price * nights + 200; // Rs. 200 Service Fee
    const isReserveDisabled = !(checkinDate && checkoutDate && guests > 0);

    return (
        <div className="price-details-container d-flex direction-column gap shadow">
            <div className="price-rating d-flex align-center justify-space-between">
                <p>
                    <span className="fs-bold fs-large">Rs. {price}</span> night
                </p>
                <span className="rating d-flex align-center">
                    <span className="material-icons-outlined">star</span>
                    <span>{rating}</span>
                </span>
            </div>
            <div className="d-flex direction-column">
                <div className="grid-container-two-col selected-dates">
                    <div className="checkin loc-container">
                        <label className="label">Check In</label>
                        <DateSelector checkInType="in" />
                    </div>
                    <div className="checkin loc-container">
                        <label className="label">Check Out</label>
                        <DateSelector checkInType="out" />
                    </div>
                </div>
                <div className="guests gutter-sm">
                    <p>Guests</p>
                    <input
                        className="guest-count-input"
                        type="number"
                        placeholder="Add Guests"
                        value={guests}
                        onChange={handleGuestChange}
                        min="1"
                    />
                </div>
            </div>
            <div>
                <button 
                    className="button btn-reserve btn-primary cursor" 
                    onClick={handleReserveClick}
                    disabled={isReserveDisabled}
                >
                    Reserve
                </button>
            </div>
            <div className="price-distribution direction-column">
                <div className="final-price d-flex align-center justify-space-between">
                    <span className="span">Rs. {price} x {nights} nights</span>
                    <span className="span">Rs. {price * nights}</span>
                </div>
                <div className="final-price d-flex align-center justify-space-between">
                    <span className="span">Service Fee</span>
                    <span className="span">Rs. 200</span>
                </div>
                <div className="final-price d-flex align-center justify-space-between">
                    <span className="span">Total</span>
                    <span className="span">Rs. {totalCost}</span>
                </div>
            </div>
        </div>
    );
};
