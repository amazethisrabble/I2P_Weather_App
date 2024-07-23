import axios from 'axios';
import localResponse from '../the-white-house.json';

interface ResponseProps {

    data: {
        result: {
            addressMatches: {
                coordinates: { 
                    x: number; // lng
                    y: number; // lat
                }
                addressComponents: { // TODO: ADD THIS IN
                    city: string;
                }
                matchedAddress: string;
            }[]
        }
    }
    
}

export const geocodeAddress = async (address: string): 
    Promise<{lat: number; lng: number; city: string}> => { // TODO: ADD THIS IN

    let response: ResponseProps = localResponse;
     
    if (address !== "0") {
        const formattedAddress = address.replace(/[\s,]+/g, '+');
        const GEOCODE_API_URL = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${formattedAddress}&benchmark=4&format=json`
        response = await axios.get(GEOCODE_API_URL);
    }

    const match = response.data.result.addressMatches[0];

    if (match.matchedAddress !== null) {
            const city = match.addressComponents.city; // TODO: ADD THIS IN
            const formattedCity = city.charAt(0) + city.substring(1).toLowerCase();
    
            return ({lat: match.coordinates.y, lng: match.coordinates.x, city: formattedCity})
        }
    else {
        throw new Error ('Failed to geocode address');
    }
}