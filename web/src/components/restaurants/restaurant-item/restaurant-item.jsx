import React from 'react'

function RestaurantItem({ restaurant }) {
  return (
    <div className="card">
      <img src={restaurant.coverUrl} className="card-img-top" alt={restaurant.name} />
      <div className="card-body">
        <h5 className="card-title">{restaurant.name}</h5>
        <p className="card-text"><i className='fa fa-map-marker me-2'></i>{restaurant.address}</p>
      </div>
    </div>
  )
}

export default RestaurantItem;