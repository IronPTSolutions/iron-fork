import RestaurantsList from "../restaurants-list/restaurants-list"

function RestaurantsSection({ className, title, category }) {
  return (
    <div className={className}>
      <h2 className="fw-light">{title}</h2>
      <RestaurantsList category={category} limit={5} page={0} />
    </div>
  )
}

RestaurantsSection.defaultProps = {
  className: ''
}

export default RestaurantsSection