import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface AuthContextValue {
    user: AuthUser | null;
    setUser: Dispatch<SetStateAction<AuthUser | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  }
  
  export interface AuthProviderProps {
    children: React.ReactNode;
  }

  export const AuthContext = createContext<AuthContextValue>({
    user: null,
    setUser: () => {},
    loading: true,
    setLoading: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {}
  });
  
  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
    const authContextValue: AuthContextValue = {
      user,
      setUser,
      loading,
      setLoading,
      isAuthenticated,
      setIsAuthenticated
    };
  
    return (
      <AuthContext.Provider value={authContextValue}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);