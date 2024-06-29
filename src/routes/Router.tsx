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
  CustomerPage,
  ResetPassword,
  ForgotPassword,
  PasswordReset,
  ProductPage,
  OrderPage
} from "../pages";
import {} from "../pages/OrderPage.tsx";

export const Router = () => {
  useCheckAuth();
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path={"*"} element={<LoadingPage />} />
        <Route path={"/"} element={<LoadingPage />} />
        <Route path={"/password-reset/*"} element={<PasswordReset />} />
        <Route path={"/reset-password"} element={<ResetPassword />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        {!isAuthenticated && (
          // unlock '/login' route only if the user is unauthenticated
          <Route path={"/login"} element={<LoginPage />} />
        )}
      </Route>

      {isAuthenticated && (
        // routes only accessible if the user is authenticated
        <Route element={<AuthenticatedLayout />}>
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/sectors"} element={<SectorPage />} />
          <Route path={"/brands"} element={<BrandPage />} />
          <Route path={"/customers"} element={<CustomerPage />} />
          <Route path={"/products"} element={<ProductPage />} />
          <Route path={"/orders"} element={<OrderPage />} />
          <Route path={"*"} element={<LoadingPage />} />
          {/* Other routes to add */}
        </Route>
      )}
    </Routes>
  );
};
