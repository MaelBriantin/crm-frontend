import { useEffect } from "react";
import { fetchAPI } from "../services/api/fetchApi.config"; 
import { useAuth } from "../contexts/auth/AuthContext";

/**
 * Custom hook to check user authentication status and update the authentication context.
 * It uses the `useAuth` hook from the `AuthContext` to access authentication-related state and functions.
 *
 * @function
 * @name useCheckAuth
 *
 * @returns {void} - This hook doesn't return any value directly.
 *
 * @example
 * // Usage within a functional component or another hook
 * useCheckAuth();
 */
export const useCheckAuth = (): void => {
    const {
        setUser,
        setIsAuthenticated,
        setLoading
    } = useAuth();
    useEffect(() => {
        const checkLoggedIn = async (): Promise<void> => {
            try {
                const response: APIResponseFormat<AuthUser | object | string> = await fetchAPI('/check-auth');
                if (response.data
                    && (response.data === 'Not authenticated'
                        || response.data === 'Unauthenticated')) {
                    setUser(null);
                    setIsAuthenticated(false);
                    setLoading(false);
                } else {
                    setUser(response.data as AuthUser)
                    setIsAuthenticated(true);
                    setLoading(false);
                }
            } catch (error) {
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        };
        checkLoggedIn()
            .then(r => r);
    }, []);
}