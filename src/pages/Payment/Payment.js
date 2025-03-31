import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDate } from "../../Context";
import "./Payment.css";
import axios from "axios";

export const Payment = () => {
    const { id } = useParams();
    const { guests, checkinDate, checkoutDate } = useDate();

    // Convert to Date objects to prevent errors
    const checkInDate = checkinDate ? new Date(checkinDate) : null;
    const checkOutDate = checkoutDate ? new Date(checkoutDate) : null;

    // Hotel state
    const [singleHotel, setSingleHotel] = useState(null);
    const [totalPayableAmount, setTotalPayableAmount] = useState(0);
    const [numberOfNights, setNumberOfNights] = useState(1); // Default to 1 night

    // Fetch hotel details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/api/hotels/${id}`);
                setSingleHotel(response.data);
            } catch (err) {
                console.error("API error:", err);
            }
        };
        fetchData();
    }, [id]);

    // Update number of nights and total price when dates change
    useEffect(() => {
        if (checkInDate instanceof Date && checkOutDate instanceof Date && singleHotel) {
            const nights = Math.max(1, (checkOutDate - checkInDate) / (1000 * 3600 * 24));
            setNumberOfNights(nights);
            setTotalPayableAmount(singleHotel.price * nights + 150);
        }
    }, [checkInDate, checkOutDate, singleHotel]);

    if (!singleHotel) return <div>Loading...</div>;

    const { image, name, address, state, rating, price } = singleHotel;

    return (
        <Fragment>
            <header className="heading">
                <h1 className="heading-1">
                    <Link className="link" to="/">BreezeTravel</Link>
                </h1>
            </header>
            <main className="main d-flex justify-center">
                <div className="final-details-container d-flex direction-column gap-larger">
                    <h2>Trip Details</h2>
                    <div className="dates-and-guests d-flex direction-column gap-md">
                        <h3>Your Trip</h3>
                        <div>
                            <p>Dates</p>
                            <span>
                                {checkInDate
                                    ? checkInDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })
                                    : "Select Date"}{" "}
                                -
                                {checkOutDate
                                    ? checkOutDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })
                                    : "Select Date"}
                            </span>
                        </div>
                        <div>
                            <p>Guests</p>
                            <span>{guests} guests</span>
                        </div>
                    </div>
                    <button className="button btn-primary btn-reserve cursor btn-pay">
                        Confirm Booking
                    </button>
                </div>
                <div className="final-details d-flex direction-column gap-large">
                    <div className="gap-sm">
                        <img className="image" src={image} alt={name} />
                        <div className="direction-column">
                            <div className="d-flex direction-column grow-shrink-basis">
                                <span>{name}</span>
                                <span>{address}, {state}</span>
                            </div>
                            <div className="rating-container">
                                <span className="rating d-flex align-center">
                                    <span className="material-icons-outlined">star</span>
                                    <span>{rating}</span>
                                </span>
                            </div>
                        </div>
                        <div className="tag">
                            Your Booking is Protected by <strong className="strong">Breeze Travel</strong>
                        </div>
                        <div className="price-details-container">
                            <div className="price-distribution d-flex direction-column">
                                <h3>Price Details</h3>
                                <div className="final-price d-flex align-center justify-space-between">
                                    <span className="span">Rs. {price} * {numberOfNights} nights</span>
                                    <span className="span">Rs. {price * numberOfNights}</span>
                                </div>
                                <div className="final-price d-flex align-center justify-space-between">
                                    <span className="span">Service Fee</span>
                                    <span className="span">Rs. 150</span>
                                </div>
                                <div className="final-price d-flex align-center justify-space-between">
                                    <span className="span">Total</span>
                                    <span className="span">Rs. {totalPayableAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
};
