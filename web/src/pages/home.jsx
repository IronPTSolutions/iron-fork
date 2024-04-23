import RestaurantsList from "../components/restaurants/restaurants-list/restaurants-list";

function Home() {
  return (
    <>
      <h2>Last restaurants:</h2>
      <RestaurantsList  limit={2} page={1} />
      
      <h2>Top Asiática!</h2>
      <RestaurantsList category="asiático" />
    </>
  );
}

export default Home;
