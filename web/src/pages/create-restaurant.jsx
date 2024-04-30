import React from 'react'
import PageLayout from '../components/layouts/page-layout/page-layout'
import RestaurantForm from '../components/restaurants/restaurant-form/restaurant-form'

function CreateRestaurant() {
  return (
    <PageLayout withJumbo={true} jumboTitle="Create New Restaurant">
      <RestaurantForm />
    </PageLayout>
  )
}

export default CreateRestaurant