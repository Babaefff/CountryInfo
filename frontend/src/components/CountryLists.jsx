import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/countries`);
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
                setError('Failed to fetch countries');
            }
        };

        fetchCountries();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
<div className="min-h-screen bg-gradient-to-r from-[#F5F5DC] via-[#EEE8AA] to-[#FAF0E6] p-6">

            <h1 className="text-4xl font-extrabold text-black text-center mb-10">Explore Countries</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {countries.map((country) => (
                    <div
                        key={country.countryCode}
                        className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300"
                    >
                        <h2 className="text-2xl font-bold text-indigo-600 mb-3">{country.name}</h2>
                        <p className="text-gray-500 text-sm mb-4">Country Code: {country.countryCode}</p>
                        <Link
                            to={`/country/${country.countryCode}`}
                            className="inline-block px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 transition-colors duration-300"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountryList;
