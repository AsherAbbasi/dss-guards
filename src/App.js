// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/Login';
import ReserveParking from './Components/ReserveParking';
import Dashboard from './Components/Dashboard';
import Addbuilding from './Components/Shared-Components/Buildings'
import ViewBuildings from './Components/Shared-Components/ViewBuildings';
import ParkingReservation from './Components/Shared-Components/ViewReservations';
import Units from './Components/Shared-Components/BuildingUnits';
import User from './Components/User/AddUser'
import UserData from './Components/User/ViewUser'


function App({}) {
  return (
    <>
        <div className="App">
        <Router>
        <Routes>
          <Route exact path="/" element= {<Login />} />
          <Route exact path="/dashboard" element= {<Dashboard/>} />
          <Route exact path="/reservation" element= {<ReserveParking/>} />
          <Route exact path="/parkingReservations" element= {<ParkingReservation/>} />
          <Route exact path="/building" element= {<Addbuilding/>} />
          <Route exact path="/buildingsDetails" element= {<ViewBuildings/>} />
          <Route exact path="/buildingUnits" element= {<Units/>} />
          <Route exact path="/user" element= {<User/>} />
          <Route exact path="/users" element= {<UserData/>} />


          AddGuards



        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
