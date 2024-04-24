import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurant } from '../services/api.service';
import { useNavigate } from 'react-router-dom';
import PageLayout from "../components/layouts/page-layout/page-layout";

function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await getRestaurant(id);
        setRestaurant(data);
      } catch (error) {
        if (error.response?.status == 404) {
          navigate('/');
        }
      }
    }
    fetch();
  }, [id])

  return restaurant && (
    <PageLayout withJumbo={true} jumboTitle={restaurant.name}>
      <p className="m-1 f-lighter text-muted">{restaurant.category.toUpperCase()}</p>
      <h3>{restaurant.name}</h3>
      <p className="mb-1"><i className="fa fa-map-marker fa-fw"></i> {restaurant.address}</p>
      <p className="mb-1" style={{ textTransform: 'capitalize' }}><i className="fa fa-cutlery fa-fw"></i> {restaurant.category}</p>
      <p className="mb-1"><i className="fa fa-money fa-fw"></i> {restaurant.avgPrice}€</p>
    </PageLayout>
  )
}

export default Restaurant;
