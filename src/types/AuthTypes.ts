export type AuthContextProps = {
    user: AuthUser | null;
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean | null>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export type AuthUser = {
    id: number;
    firstname: string;
    lastname: string;
    company_name: string;
    siret: string;
    siren: string;
    adress: string;
    zip_code: number;
    city: string;
    phone_number: number;
    email: string;
    email_verified_at: Date;
    created_at: Date;
    updated_at: Date;
}