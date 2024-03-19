import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppBack from './BackOffice/AppBack';


function App() {
 

  return (
    <>
    <Router>
      <Routes>
          <Route path="/*" element={<AppBack />} />
      </Routes>
    </Router>
 
    </>
  )
}

export default App
