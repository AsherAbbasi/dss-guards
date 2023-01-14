import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppRoutes from "./App";
import AuthRoutes from "./Auth";
import ReserveParking from "../Components/ReserveParking";
import {useSelector} from "react-redux";

const AllRoutes = () => {
    const {token} = useSelector(state => state.auth);
    const isAuthenticated = token ? `/app/dashboard` : `/auth/login`;
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`/auth/*`} element={<AuthRoutes isAuthenticated={token}/>}/>
                <Route path={`/app/*`} element={<AppRoutes isAuthenticated={token}/>}/>
                <Route path={'/reservation'} element={<ReserveParking/>}/>
                <Route exact={true} path='/' element={<Navigate to={isAuthenticated} replace={true}/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AllRoutes;