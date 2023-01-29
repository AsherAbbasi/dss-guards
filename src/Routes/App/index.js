import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "../../Components/Dashboard";
import Buildings from "../../Components/Shared-Components/Buildings";
import ViewReservations from "../../Components/Shared-Components/ViewReservations";
import ViewBuildings from "../../Components/Shared-Components/ViewBuildings";
import BuildingUnits from "../../Components/Shared-Components/BuildingUnits";
import AddUser from "../../Components/User/AddUser";
import ViewUser from "../../Components/User/ViewUser";
import Ticket from "../../Components/Shared-Components/Ticket";
import ViewTicket from "../../Components/Shared-Components/ViewTicket";
import DailyReport from "../../Components/Shared-Components/DailyReport";




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