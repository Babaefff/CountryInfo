import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import PopulationChart from "./PopulationChart";
import { FaMapMarkerAlt } from "react-icons/fa"; 

const CountryInfo = () => {
  const { code } = useParams();
  const [countryInfo, setCountryInfo] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/countries/${code}`);
        setCountryInfo(response.data);
        setLoading(false); 
      } catch (error) {
        setError("Failed to get country infos");
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [code]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-orange-100">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        <span className="ml-4 text-gray-600 text-lg font-bold">Loading Country Info...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-[#F5F5DC] via-[#EEE8AA] to-[#FAF0E6] rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 flex items-center justify-center text-brown-700">
        {countryInfo.countryName}
        {countryInfo.flag && (
          <img
            src={countryInfo.flag}
            alt={`${countryInfo.countryName} flag`}
            className="ml-4 w-24 h-auto rounded-full shadow-md border-2 border-white"
          />
        )}
      </h1>

 
      <div className="border rounded-lg p-6 mb-6 bg-white shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-brown-800">Border Countries:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {countryInfo.borderCountries &&
            countryInfo.borderCountries.map((border) => (
              <Link
                key={border.countryCode}
                to={`/country/${border.countryCode}`}
                className="border-2 border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-500 mr-2" />
                  <span className="text-lg font-semibold text-gray-700">{border.commonName}</span>
                </div>
                <span className="text-sm text-gray-500">Code: {border.countryCode}</span>
              </Link>
            ))}
        </div>
      </div>

      
      <h2 className="text-2xl font-semibold mb-4 text-brown-800">Population Over Time:</h2>
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <PopulationChart populationData={countryInfo.population} />
      </div>
    </div>
  );
};

export default CountryInfo;
