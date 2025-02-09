import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        return;
      }

      const mealsData = await response.json();
      setLoadedMeals(mealsData);
    }
    fetchMeals();
  }, []);
  return (
    <ul id="meals">
      {loadedMeals.map((loadedMeal) => (
        <MealItem meal={loadedMeal} />
      ))}
    </ul>
  );
};

export default Meals;
