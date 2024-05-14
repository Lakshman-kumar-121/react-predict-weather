import { createContext, useContext, useState, useEffect } from "react";
import cityData from "../data/cities_of_karnataka.json";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState({
    

    id: 1,
    name: "Bagalkot",
    latitude: "16.1866",
    longitude: "75.6968",
    population: 1889752,
    region: "Bayaluseeme",
    icon: "",
  });
  const [weathers, setWeathers] = useState({});
  const [unit, setUnit] = useState("metric");

  const values = {
    cities,
    setCities,
    selected,
    setSelected,
    weathers,
    setWeathers,
    unit,
    setUnit,
  };

  const apiKey = "4327f11f6458df3e888e99c6b054069c";

  //console.log(weathers?.current?.weather?.[0].icon);

  function getCities() {
    setCities(cityData);
  }

  const citylat = selected?.initialvalues?.[0].latitude
    ? selected?.initialvalues?.[0].latitude
    : selected.latitude;

  const citylon = selected?.initialvalues?.[0].longitude
    ? selected?.initialvalues?.[0].longitude
    : selected.longitude;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${citylat}&lon=${citylon}&exclude=minutely,hourly&units=${unit}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setWeathers(data));
    return;
  }, [selected, unit]);

  useEffect(() => {
    getCities();
    return;
  }, [unit]);

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
