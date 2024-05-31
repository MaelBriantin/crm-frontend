import { useEffect } from "react";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Middleware hook to check user authentication status and navigate accordingly.
 * It uses the `useAuth` hook from the `AuthContext` to access authentication-related state and functions.
 *
 * @function
 * @name useAuthMiddleware
 *
 * @returns {void} - This hook doesn't return any value directly.
 *
 * @example
 * // Usage within a functional component or another hook
 * useAuthMiddleware();
 */
export const useAuthMiddleware = () => {
    const {
        isAuthenticated,
        loading,
    } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthentication = async (): Promise<void> => {
            try {
                if (isAuthenticated) {
                    navigate('/home');
                } else if (!isAuthenticated) {
                    navigate('/login');
                }
            } catch (error) {
                // console.error('Erreur lors de la vérification de l\'authentification:', error);
            }
        };
        if (!loading) {
            checkAuthentication();
        }
    }, [isAuthenticated, loading, navigate]);
}