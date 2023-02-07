import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "../../Components/Dashboard";
import Buildings from "../../Components/Buildings/Buildings";
import ViewReservations from "../../Components/Permit/ViewReservations";
import ViewBuildings from "../../Components/Buildings/ViewBuildings";
import BuildingUnits from "../../Components/Buildings/BuildingUnits";
import AddUser from "../../Components/User/AddUser";
import ViewUser from "../../Components/User/ViewUser";
import Ticket from "../../Components/Ticket/Ticket";
import ViewTicket from "../../Components/Ticket/ViewTicket";
import DailyReport from "../../Components/Reports/DailyReport";
import ViewDailyReport from '../../Components/Reports/ViewDailyReport';




const routes = [
    {
        path: '/dashboard',
        element: <Dashboard/>
    },
    {
        path: '/building',
        element: <Buildings/>
    },
    {
        path: '/parkingReservations',
        element: <ViewReservations/>
    },
    {
        path: '/buildingsDetails',
        element: <ViewBuildings/>
    },
    {
        path: '/buildingUnits',
        element: <BuildingUnits/>
    },
    {
        path: '/user',
        element: <AddUser/>
    }, {
        path: '/users',
        element: <ViewUser/>
    },
    {
        path: '/ticket',
        element: <Ticket/>
    },
    {
        path: '/tickets',
        element: <ViewTicket/>
    },
    {
        path: '/DailyReport',
        element: <DailyReport/>
    },
    {
        path: '/DailyReports',
        element: <ViewDailyReport/>
    },
    {
        path: '/',
        element: <Navigate to={`/app/dashboard`} replace={true}/>
    },
];

const setRoutes = () => routes?.map(({path, element}) => <Route key={path} path={path} element={element}/>);

const redirectToLogin = () => <Route path={'*'} element={<Navigate to={'/auth'} replace={true}/>}/>

const AppRoutes = ({isAuthenticated}) => {
    return (
        <Suspense fallback={true}>
            <Routes>
                {isAuthenticated ? setRoutes() : redirectToLogin()}
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;