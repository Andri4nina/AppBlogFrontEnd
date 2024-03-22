import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppBack from './BackOffice/AppBack';
import AppLogin from './Login/AppLogin';


function App() {
 

  return (
    <>
    <Router>
      <Routes>
          <Route path="back/*" element={<AppBack />} />
          <Route path='/login' element={<AppLogin /> }/>
      </Routes>
    </Router>
 
    </>
  )
}

export default App
