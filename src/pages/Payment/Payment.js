import { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDate } from "../../Context"
import "./Payment.css"
import axios from "axios"

export const Payment = () => {

    const params = useParams();
    const {id} = params;

    const {guests, dateDispatch, checkinDate, checkoutDate} = useDate()
    const numberOfNights = checkinDate && checkoutDate ? (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24) : 0

    const [singleHotel, setSingleHotel] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await axios.get(`http://localhost:3500/api/hotels/${id}`);
            console.log('API response:', data);
            setSingleHotel(data);
          } catch (err) {
            console.log('API error:', err);
          }
        };
      
        fetchData();
      }, [id]);
      
      if (!singleHotel) return <div>Loading...</div>;
      
      console.log('singleHotel:', singleHotel);
      
      const { data: { image, name, address, state, rating, price } } = singleHotel;
      
      console.log('image:', image);
      console.log('name:', name);
      console.log('address:', address);
      console.log('state:', state);
      console.log('rating:', rating);
      console.log('price:', price);
      
  const totalPayableAmount = price * numberOfNights + 150

    return (
        <Fragment>
            <header className="heading">
                <h1 className="heading-1">
                    <Link className="link" to="/">TravelO</Link>
                </h1>
            </header>
            <main className="main d-flex justify-center">
                <div className="final-details-container d-flex direction-column gap-larger">
                    <h2>Trip Details</h2>
                    <div className="dates-and-guests d-flex direction-column gap-md">
                        {
                            <form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_PJCpWNEqRuKmWu" async> </script> </form>
                        }
                        <h3>Your Trip</h3>
                        <div>
                            <p>Dates</p>
                            <span>
                                <span>
                                    {checkinDate?.toLocaleDateString("en-US", {
                                        day: "numeric", 
                                        month:"short"
                                    })}{" "}
                                    -
                                    {checkoutDate?.toLocaleDateString("en-US", {
                                        day: "numeric", 
                                        month:"short"
                                    })}
                                </span>
                            </span>
                        </div>
                        <div>
                            <p>Guests</p>
                            <span>{guests} guests</span>
                        </div>
                    </div>
                    <div className="d-flex direction-column gap-sm">
                        <h3>Pay with</h3>
                        <div>Razorpay</div>
                    </div>
                    <button className="button btn-primary btn-reserve cursor btn-pay">
                        Confirm Booking
                    </button>
                </div>
                <div className="final-details d-flex direction-column gap-large">
                    <div className="gap-sm">
                        <img className="image" src={image} alt={name}/>
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
                            Your Booking is Protected by <strong className="strong">TravelO</strong>
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
    )
}