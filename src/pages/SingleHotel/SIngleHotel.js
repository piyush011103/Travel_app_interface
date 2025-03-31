import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HotelDetails, HotelImages, Navbar } from "../../components";
import "./SingleHotel.css";
import { FinalPrice } from "../../components/FinalPrice/FinalPrice";

export const SingleHotel = () => {
  const { id } = useParams();
  const [singleHotel, setSingleHotel] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`https://travel-app-backend-umpr.onrender.com/api/hotels/${id}`);
        setSingleHotel(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);
  if (!singleHotel) return <div>Loading...</div>;
  const {name, state} = singleHotel;

  return(
    <>
        <Navbar/>
        <main className="single-hotel-page">
            <p className="hotel-name-add">{name}, {state}</p>
            <HotelImages singleHotel={singleHotel} />
            <div className="d-flex">
                <HotelDetails singleHotel = {singleHotel} />
                <FinalPrice singleHotel = {singleHotel} />
            </div>
        </main>
    </>
  )
};