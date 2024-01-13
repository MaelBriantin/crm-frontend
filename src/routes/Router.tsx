import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage.tsx";
import { LoginPage } from "../pages/auth/LoginPage.tsx";
import { GuestLayout } from "../layouts/GuestLayout.tsx";
import { AuthenticatedLayout } from "../layouts/AuthenticatedLayout.tsx";
import { LoadingPage } from "../pages/LoadingPage.tsx";
import { useCheckAuth } from "../hooks/auth/useCheckAuth.ts";
import { useAuth } from "../contexts/auth/AuthContext.tsx";
import { SectorPage } from "../pages/SectorPage.tsx";

export const Router = () => {
    useCheckAuth();
    const { isAuthenticated } = useAuth();
    return (
        <Routes>

            <Route element={<GuestLayout />}>
                <Route path={'*'} element={<LoadingPage />} />
                <Route path={'/'} element={<LoadingPage />} />
                {!isAuthenticated &&
                    // unlock '/login' route only if the user is unauthenticated
                    <Route path={'/login'} element={<LoginPage />} />
                }
            </Route>

            {isAuthenticated && (
                // routes only accessible if the user is authenticated
                <Route element={<AuthenticatedLayout />}>
                    <Route path={'/home'} element={<HomePage />} />
                    <Route path={'/sectors'} element={<SectorPage />} />
                    {/* Other routes to add */}
                </Route>

            )}

        </Routes>
    );
};