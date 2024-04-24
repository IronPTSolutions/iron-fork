import { Link } from "react-router-dom";

function RestaurantItem({ restaurant }) {
  return (
    <div className="card h-100">
      <img src={restaurant.coverUrl} className="card-img-top" alt={restaurant.name} />
      <div className="card-body">
        <p className="m-0 f-lighter text-muted">{restaurant.category.toUpperCase()}</p>
        <h5 className="card-title mb-2">{restaurant.name}</h5>
        <p className="card-text"><i className="fa fa-map-marker me-2"></i>{restaurant.address}</p>
        <Link to={`/restaurants/${restaurant.id}`} className="stretched-link"></Link>
      </div>
    </div>
  )
}

export default RestaurantItem;