import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from './Components/navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import Movie from './Pages/Movie';

function App() {
    return (
    <Router>
		<Navbar />
		<Routes>
      <Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/movie' element={<Movie />} />
		</Routes>
    </Router>
    );
}

export default App;
