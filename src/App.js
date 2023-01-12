// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/Login';
import ReserveParking from './Components/ReserveParking';
import Dashboard from './Components/Dashboard';
import Addbuilding from './Components/Shared-Components/Buildings'
import ViewBuildings from './Components/Shared-Components/ViewBuildings';
import ParkingReservation from './Components/Shared-Components/ViewReservations';
import Units from './Components/Shared-Components/BuildingUnits';
import Employee from './Components/Employees/AddEmployee'
import EmployeesData from './Components/Employees/ViewEmployees'


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
          <Route exact path="/user" element= {<Employee/>} />
          <Route exact path="/employees" element= {<EmployeesData/>} />


          AddGuards



        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
