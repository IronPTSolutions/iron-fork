import { useEffect, useRef } from "react";

const autocompleteOptions = {
  componentRestrictions: { country: "es" },
  type: ["address"]
};

function AutocompleteInput({ className, error, onPlaceChange, onBlur }) {
  const autocompleteInputRef = useRef();

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, autocompleteOptions);
    window.google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry?.location) {
        const location = { 
          lat: place.geometry.location.lat(), 
          lng: place.geometry.location.lng(), 
          address: place.formatted_address 
        };
        onPlaceChange(location);
      }
    })

    return () => {
      window.google.maps.event.clearListeners(autocomplete, "place_changed");
    }
  }, []);

  return (
    <div className={`form-floating ${className}`}>
      <input ref={autocompleteInputRef} type="text" className={`form-control ${error ? 'is-invalid' : ''}`} id="autocomplete-input" placeholder="" onBlur={onBlur}/>
      <label htmlFor="autocomplete-input">Find restaurants near...</label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

AutocompleteInput.defaultProps = {
  className: "",
  onPlaceChange: (location) => console.debug(location),
  onBlur: () => {}
}

export default AutocompleteInput