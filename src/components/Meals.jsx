import React, { useState } from "react";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);
  async function fetchMeals() {
    const response = await fetch("http://localhost:3000/opinions");

    if (!response.ok) {
      return;
    }

    const mealsData = await response.json();
    setLoadedMeals(mealsData);
  }

  return (
    <ul id="meals">
      {loadedMeals.map((loadedMeal) => (
        <li key={loadedMeal.id}>{loadedMeal.name}</li>
      ))}
    </ul>
  );
};

export default Meals;
