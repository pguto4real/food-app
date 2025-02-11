import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import { useHttp } from "../hooks/useHttp";

const Meals = () => {
  //   const [loadedMeals, setLoadedMeals] = useState([]);
  const {
    fetchedData: loadedMeals,
    isFetching,
    error,
  } = useHttp("http://localhost:3000/meals",{},[]);

  //   useEffect(() => {
  //     async function fetchMeals() {
  //       const response = await fetch("http://localhost:3000/meals");

  //       if (!response.ok) {
  //         return;
  //       }

  //       const mealsData = await response.json();
  //       setLoadedMeals(mealsData);
  //     }
  //     fetchMeals();
  //   }, []);
//   console.log(loadedMeals);

if(isFetching){
    return <p>Fetching meals...</p>
}
  return (
    <ul id="meals">
      {loadedMeals.map((loadedMeal, index) => (
        <MealItem key={index} meal={loadedMeal} />
      ))}
    </ul>
  );
};

export default Meals;
