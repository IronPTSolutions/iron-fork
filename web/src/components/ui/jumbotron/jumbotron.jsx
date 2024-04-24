import "./jumbotron.css";
import foodPattern from "../../../assets/images/jumbo-food-pattern.jpg";

function Jumbotron({ title, backgroundImage }) {
  return (
    <div className="jumbotron" style={{ backgroundImage: `url(${backgroundImage ? backgroundImage : foodPattern})`}}>
      <div className="container d-flex justify-content-center align-items-center">
        <h2 className="fw-light">{title ? title : 'Find your restaurant for any occasion'}</h2>
      </div>
    </div>
  )
}

export default Jumbotron;