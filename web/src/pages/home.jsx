import { useNavigate } from "react-router-dom";
import AutocompleteInput from "../components/google/autocomplete/autocomplete-input";
import PageLayout from "../components/layouts/page-layout/page-layout";
import RestaurantsSection from "../components/restaurants/restaurants-section/restaurants-section";

function Home() {
  const navigate = useNavigate();

  const handlePlaceChange = ({ lat, lng, address }) => {
    navigate({
      pathname: '/restaurants',
      search: `?lat=${lat}&lng=${lng}&address=${address}`
    });
  }

  return (
    <PageLayout withJumbo={true}>
      <AutocompleteInput className="mb-3" onPlaceChange={handlePlaceChange} />
      <RestaurantsSection title={"What's new"} className="mb-4"/>
      <RestaurantsSection title={"Asia in the palm of your hand"} className="mb-4" category={"asiático"}/>
      <RestaurantsSection title={"Fancy Mediterranian food"} category={"mediterráneo"}/>
    </PageLayout>
  );
}

export default Home;
