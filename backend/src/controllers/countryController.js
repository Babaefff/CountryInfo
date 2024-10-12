const axios = require("axios");

const getAvailableCountries = async (req, res) => {
  try {
    const response = await axios.get(
      "https://date.nager.at/api/v3/AvailableCountries",
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching countries" });
  }
};

const getCountryInfo = async (req, res) => {
  const countryCode = req.params.code; 

  try {
    // Get border countries info
    const borderCountriesResponse = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
    );
    const countryInfo = borderCountriesResponse.data;

   

    const requestBody = { country: countryInfo.commonName };

    const populationResponse = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/population",
      requestBody,
    );

    const requestBodyFlag = { iso2: countryInfo.countryCode };

 
    const flagResponse = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/flag/images",
      requestBodyFlag,
    );

    const flagImage = flagResponse.data.data.flag;

    

    res.json({
      borderCountries: countryInfo.borders, 
      population: populationResponse.data.data.populationCounts,
      flag: flagImage,
      countryName: countryInfo.commonName, 
    });
  } catch (error) {
    console.error("Error fetching country info:", error);
    res.status(500).json({ message: "Error fetching country info" });
  }
};

module.exports = {
  getAvailableCountries,
  getCountryInfo,
};
