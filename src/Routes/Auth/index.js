import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../../Components/Auth/Login";


const routes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <Navigate to={`/auth/login`} replace={true}/>
    },
];

const setRoutes = () => routes?.map(({path, element}) => <Route key={path} path={path} element={element}/>);
const redirectToDashboard = () => <Route path={'*'} element={<Navigate to={'/app'} replace={true}/>}/>

const AuthRoutes = ({isAuthenticated}) => {
    return (
        <Suspense fallback={true}>
            <Routes>
                {!isAuthenticated ? setRoutes() : redirectToDashboard()}
            </Routes>
        </Suspense>
    );
};

export default AuthRoutes;
