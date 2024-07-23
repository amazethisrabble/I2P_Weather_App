import axios from 'axios';

const GEOCODE_API_KEY = 'AIzaSyADT9Yz5s7BIGnmJqB7wwLOpidV6w5UL4U';
const GEOCODE_API_URL = `https://maps.googleapis.com/maps/api/geocode/json`;

interface ResponseProps {
  data: {
    results: {
      address_components: {
        short_name: string; // city is index 2
      }[]
      geometry: {
        location: {
          lat: number;
          lng: number;
        }
      }
    }[]
  status: string;
  }
  
}

export const geocodeAddress = async (address: string): 
  Promise<{ lat: number; lng: number; city: string}> => {
  
    const response: ResponseProps = await axios.get(GEOCODE_API_URL, {
    params: {
      address,
      key: GEOCODE_API_KEY,
    },
  });

  if (response.data.status === 'OK') {
    const location = response.data.results[0].geometry.location;
    const city = response.data.results[0].address_components[2].short_name;
    console.log(response.data)
    
    return { lat: location.lat, 
              lng: location.lng, 
              city: city
            };
  } else {
    throw new Error('Failed to geocode address');
  }
};
