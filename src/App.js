
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {BrowserRouter, NavLink, Route,Routes} from 'react-router-dom';
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Home from './components/Home'
import BusinessDetails from "./components/BusinessDetails";
import EditProfile from "./components/EditProfile";
import Manage from "./components/Manage";




function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <NavigationBar />
            <Routes>
                <Route path={'/register'} element={<SignUp />} />
                <Route path={'/login'} element={<LogIn />} />
                <Route path={'/home'} element={<Home />} />
                <Route path={`/business/:username`} element={<BusinessDetails />} />
                <Route path={'edit-profile'} element={<EditProfile />} />
                <Route path={'/manage'} element={<Manage />} />

            </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
