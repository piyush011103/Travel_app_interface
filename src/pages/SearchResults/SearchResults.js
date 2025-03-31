import { Fragment, useEffect, useState } from "react"
import { Navbar } from "../../components/Navbar/Navbar"
import { useDate, useCategory } from "../../Context"
import { HotelCard } from "../../components";
import axios from "axios";
import "./SearchResults.css"

export const SearchResults = () => {
    const {destination} = useDate();
    const { hotelCategory } = useCategory();
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        (async() => {
            try{
              const { data } = await axios.get(
                `https://travel-app-backend-umpr.onrender.com/api/hotels?category=${hotelCategory}`
              );
              setHotels(data)
            }catch(err){
              console.log(err)
            }
          })();
    }, [destination]);

    const filteredSearchResults = hotels.filter(({city, address, state}) => 
        address.toLowerCase() === destination.toLowerCase() || 
        city.toLowerCase() === destination.toLowerCase() || 
        state.toLowerCase() === destination.toLowerCase()
    );

    return(
        <Fragment>
            <Navbar/>
            <section className="search-details main align-center gap-larger">
        {filteredSearchResults ? (
          filteredSearchResults.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))
        ) : (
          <h3>Nothing Found</h3>
        )}
      </section>
        </Fragment>
    )
}