import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import { useHttp } from "../hooks/useHttp";
import Error from "./Error";
const requestConfig = {};
const Meals = () => {
  const {
    fetchedData: loadedMeals,
    isFetching,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, [], "meal");

  if (isFetching) {
    return <p className="center">Fetching meals...</p>;
  }
  if (error) {
    return <Error title={"Failed to fetch meals"} message={error} />;
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
