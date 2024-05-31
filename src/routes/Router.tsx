import { Route, Routes } from "react-router-dom";
import { useCheckAuth } from "../hooks/auth/useCheckAuth.ts";
import { useAuth } from "../contexts/auth/AuthContext.tsx";
import {
    HomePage,
    LoginPage,
    GuestLayout,
    AuthenticatedLayout,
    LoadingPage,
    SectorPage,
    BrandPage,
    CustomerPage
} from "../pages";
import { ProductPage } from "../pages/ProductPage.tsx";
import { OrderPage } from "../pages/OderPage.tsx";

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
                    <Route path={'/brands'} element={<BrandPage />} />
                    <Route path={'/customers'} element={<CustomerPage />} />
                    <Route path={'/products'} element={<ProductPage />} />
                    <Route path={'/orders'} element={<OrderPage />} />
                    <Route path={'*'} element={<LoadingPage />} />
                    {/* Other routes to add */}
                </Route>

            )}

        </Routes>
    );
};