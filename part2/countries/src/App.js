import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [isPopTips, setIsPopTips] = useState(false);
  const [foundCountries, setFoundCountries] = useState([]);
  const [oneCountry, setOneCountry] = useState(null);
  const popTips = "Too many matches, specify another filter";

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      console.log(res.data);
      setAllCountries(res.data);
    });
  }, []);

  const findCountriesByKeyword = (event) => {
    // event.preventDefault();
    setKeyword(event.target.value);
    if (!event.target.value || event.target.value.length === 0) {
      setIsPopTips(false);
      setFoundCountries(null);
    } else if (event.target.value.length === 1) {
      setIsPopTips(true);
    } else {
      setIsPopTips(false);
      const nowFoundCountries = allCountries.filter((country) =>
        country.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      console.log(nowFoundCountries);
      if (nowFoundCountries.length === 0) {
        setOneCountry(null);
        setFoundCountries([]);
      } else if (nowFoundCountries.length === 1) {
        setOneCountry(nowFoundCountries[0]);
        setFoundCountries([]);
      } else if (nowFoundCountries.length > 1) {
        // console.log("found countries", nowFoundCountries.length);
        setFoundCountries(nowFoundCountries);
        setOneCountry(null);
      }
    }
  };

  const showOneCountry = (alpha3Code) => {
    const nowOneCountry = allCountries.find(
      (country) => country.alpha3Code === alpha3Code
    );
    setOneCountry(nowOneCountry);
    setFoundCountries([]);
  };

  return (
    <div>
      <div>
        find countries{" "}
        <input onChange={findCountriesByKeyword} value={keyword} />
      </div>
      {isPopTips ? <p>{popTips}</p> : <></>}
      <div>
        {foundCountries && foundCountries.length > 1 ? (
          foundCountries.map((country) => (
            <p key={country.alpha3Code}>
              {country.name}{" "}
              <button onClick={() => showOneCountry(country.alpha3Code)}>
                show
              </button>
            </p>
          ))
        ) : (
          <></>
        )}
      </div>
      <div>
        {oneCountry ? (
          <>
            <h2>{oneCountry.name}</h2>
            <p>capital {oneCountry.capital}</p>
            <p>population {oneCountry.population}</p>
            <h3>languages</h3>
            <ul>
              {oneCountry.languages.map((language) => (
                <li key={language.iso639_1}>{language.name}</li>
              ))}
            </ul>
            <div>
              <img
                className="flag"
                src={oneCountry.flag}
                alt={oneCountry.name}
              />
            </div>
            <div>
              <h3>Weather in {oneCountry.capital}</h3>
              <Weather city={oneCountry.capital} />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
