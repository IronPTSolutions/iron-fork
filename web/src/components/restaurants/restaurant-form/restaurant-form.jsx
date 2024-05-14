import { useForm, Controller } from 'react-hook-form';
import categoriesData from  '../../../data/categories.json';
import AutocompleteInput from '../../google/autocomplete/autocomplete-input';
import { createRestaurant } from '../../../services/api.service';
import { useNavigate } from 'react-router-dom';

function RestaurantForm({ className }) {
  const navigate = useNavigate();
  const { register, handleSubmit, control, watch, formState: { errors, isValid } } = useForm({ mode: 'all' });

  const handleRestaurantSubmit = async (restaurant) => {
    const data = new FormData();
    data.append("name", restaurant.name);
    data.append("category", restaurant.category);
    data.append("tables", restaurant.tables);
    data.append("avgPrice", restaurant.avgPrice);
    data.append("address", restaurant.location.address);
    data.append("location[type]", "Point");
    data.append("location[coordinates][]", restaurant.location.lng);
    data.append("location[coordinates][]", restaurant.location.lat);
    data.append("coverImage", restaurant.coverImage[0]);

    try {
      const res = await createRestaurant(data);
      navigate(`/restaurants/${res.data.id}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit(handleRestaurantSubmit)}>
      {/* NAME */}
      <div className="form-floating mb-1">
        <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="" {...register("name", { required: 'Name is required'})} />
        <label>Restaurant Name</label>
        {errors.name && (<div className='invalid-feedback'>{errors.name.message}</div>)}
      </div>

      {/* CATEGORY */}
      <div className="form-floating mb-1">
        <select className={`form-select ${errors.category ? 'is-invalid' : ''}`}
          {...register("category", {
            required: "Category is required"
          })}>
          {categoriesData.map((category) => (<option key={category.option} value={category.option}>{category.label}</option>))}
        </select>
        <label>Category</label>
        {errors.category && <div className='invalid-feedback'>{errors.category.message}</div>}
      </div>
      
      {/* TABLES */}
      <div className="form-floating mb-1">
        <input type="number" className={`form-control ${errors.tables ? 'is-invalid' : ''}`} placeholder="" 
          {...register("tables", { 
            required: 'Amount of tables are required',
            min: {
              message: 'Minimum number of tables are 1',
              value: 1
            },
            max: {
              message: 'Maximum number of tables are 100',
              value: 100
            },
          })} 
        />
        <label>Available Tables</label>
        {errors.tables && (<div className='invalid-feedback'>{errors.tables.message}</div>)}
      </div>

      {/* AVG PRICE */}
      <div className="form-floating mb-1">
        <input type="number" className={`form-control ${errors.avgPrice ? 'is-invalid' : ''}`} placeholder=""
          {...register("avgPrice")}
        />
        <label>Average Price Per Person</label>
        {errors.avgPrice && (<div className='invalid-feedback'>{errors.avgPrice.message}</div>)}
      </div>

      {/* COVER */}
      <div className="form-floating mb-1">
        <input type="file" className={`form-control ${errors.coverImage ? 'is-invalid' : ''}`} placeholder=""
          {...register("coverImage", {
            required: 'Cover image is required'
          })}
        />
        <label>Cover</label>
        {errors.coverImage && (<div className='invalid-feedback'>{errors.coverImage.message}</div>)}
      </div>

      {/* LOCATION */}
      <Controller 
        control={control}
        name="location"
        rules={{
          required: 'Location is required'
        }}
        render={({ field: { onChange, onBlur }}) => (
          <AutocompleteInput className="mb-1" error={errors.location?.message} onPlaceChange={onChange} onBlur={onBlur} />
        )}
      />

      <div className="d-grid mt-2">
        <button type="submit" className='btn btn-secondary text-uppercase' disabled={!isValid}>Create restaurant</button>
      </div>
    </form>
  )
}

RestaurantForm.defaultProps = {
  className: ''
}

export default RestaurantForm;