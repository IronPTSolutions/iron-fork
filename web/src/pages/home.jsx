import PageLayout from "../components/layouts/page-layout/page-layout";
import RestaurantsSection from "../components/restaurants/restaurants-section/restaurants-section";

function Home() {
  return (
    <PageLayout withJumbo={true}>
      <RestaurantsSection title={"What's new"} className="mb-4"/>
      <RestaurantsSection title={"Asia in the palm of your hand"} className="mb-4" category={"asiático"}/>
      <RestaurantsSection title={"Fancy Mediterranian food"} category={"mediterráneo"}/>
    </PageLayout>
  );
}

export default Home;
