import { useEffect, useState } from 'react';
import { getRestaurants } from '../../../services/api.service';
import RestaurantItem from '../restaurant-item/restaurant-item';

function RestaurantsList({ category, limit, page }) {
  const [restaurants, setRestaurants] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        const query = {};
        if (category) query.category = category;
        if (limit) query.limit = limit;
        if (page) query.page = page;
        
        const response = await getRestaurants(query);
        setRestaurants(response.data);
      } catch (error) {
        console.error(error);
      } 
    }
    fetch();
  }, [category, limit, reload]);

  const handleReload = () => setReload(!reload)

  return (
    <div className='d-flex flex-column gap-2'>
      <div className="row row-cols-5 g-2">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="col"><RestaurantItem restaurant={restaurant} /></div>
        ))}
      </div>
      <button className='btn btn-sm btn-outline-secondary fw-light algin-self-end' onClick={handleReload}>Reload</button>
    </div>
  )
}

export default RestaurantsList;