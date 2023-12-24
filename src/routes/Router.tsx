import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage.tsx";
import { LoginPage } from "../pages/auth/LoginPage.tsx";
import { GuestLayout } from "../layouts/GuestLayout.tsx";
import { AuthenticatedLayout } from "../layouts/AuthenticatedLayout.tsx";

export const Router = () => {
    return (
        <Routes>
            <Route element={<GuestLayout/>}>
                <Route path={'/login'} element={<LoginPage />} />
            </Route>
            <Route element={<AuthenticatedLayout/>}>
                <Route path={'/home'} element={<HomePage />} />
            </Route>            
        </Routes>
    );
};