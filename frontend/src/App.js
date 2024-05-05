import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from './Components/navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';

function App() {
    return (
    <Router>
		<Navbar />
		<Routes>
			<Route path='/login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/Home' element={<Home />} />
		</Routes>
    </Router>
    );
}

export default App;
