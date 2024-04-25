import { useSearchParams } from 'react-router-dom';
import RestaurantsList from '../components/restaurants/restaurants-list/restaurants-list';
import PageLayout from '../components/layouts/page-layout/page-layout';
import AutocompleteInput from '../components/google/autocomplete/autocomplete-input';
import Map from '../components/google/map/map';
import { useState } from 'react';

function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = useState([]);

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const address = searchParams.get('address');

  const handlePlaceChange = ({ lat, lng, address }) => {
    setSearchParams({
      lat,
      lng,
      address
    });
  }

  const handleRestaurantsUpdate = (restaurants) => {
    const locations = restaurants.map(({ name, location }) => ({
      title: name,
      lat: location[0],
      lng: location[1]
    }))
    setLocations(locations);
  }

  return (
    <PageLayout withJumbo={true} jumboTitle={address}>
      <AutocompleteInput className="mb-3" onPlaceChange={handlePlaceChange} />
      <Map className="mb-4" center={{ lat: parseFloat(lat), lng: parseFloat(lng) }} markers={locations} />
      <RestaurantsList limit={20} page={0} lat={lat} lng={lng} reloadEnabled={false} onUpdateRestaurants={handleRestaurantsUpdate}/>
    </PageLayout>
  )
}

export default Restaurants