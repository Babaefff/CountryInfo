

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import CountryList from './components/CountryLists';
import CountryInfo from './components/CountryInfo';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:code" element={<CountryInfo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
