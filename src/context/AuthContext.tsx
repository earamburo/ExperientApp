import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const STORAGE_KEYS = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
};

const MOCK_AUTH_RESPONSE = {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicmVmcmVzaCI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ",
};
export type User = {
    username: string;
    active: boolean;
    roleId: number;
    dateCreated: string;
    dateModified: string;
    lastName: string;
    firstName: string;
    displayName: string;
    jiraUsername: string;
    intactUserId: string;
    userId: number;
    emailAddress: string;
    openAtCurWeeksTimesheet: boolean;
    activeInterviewer: boolean;
    createIntacctTimesheet: boolean;
    roleName: string;
};

export const mockUser = {
    username: "VShah",
    active: true,
    roleId: 20,
    dateCreated: "2018-03-02T00:00:00.000Z",
    dateModified: "2018-03-02T00:00:00.000Z",
    lastName: "Shah",
    firstName: "Viraj",
    displayName: "Viraj Shah",
    jiraUsername: "viraj.shah",
    intactUserId: "EE-00112",
    userId: 41,
    emailAddress: "vshah@experient.com",
    openAtCurWeeksTimesheet: true,
    activeInterviewer: true,
    createIntacctTimesheet: true,
    roleName: "Developer",
} as User

type AuthState = {
    isAuthenticated: boolean;
    isLoading: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    error: string | null;
}
type AuthAction =
    | { type: "LOGIN_START" }
    | { type: "LOGIN_SUCCESS"; payload: { accessToken: string; refreshToken: string } }
    | { type: "LOGIN_FAILURE"; payload: string }
    | { type: "LOGOUT" }
    | { type: "RESTORE_SESSION"; payload: { accessToken: string; refreshToken: string } }
    | { type: "CLEAR_ERROR" };

type AuthContextType = {
    state: AuthState;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
};

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    accessToken: null,
    refreshToken: null,
    error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "RESTORE_SESSION":
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                error: null
            }
        case "LOGIN_START":
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                error: null
            }
        case "LOGIN_FAILURE":
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload

            }
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                accessToken: null,
                refreshToken: null
            }
        case "CLEAR_ERROR":
            return {
                ...state,
                error: null
            }
        default:
            return state;

    }


}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        checkAccessToken();
    }, [])

    const checkAccessToken = async () => {
        try {
            const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
            const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

            if (accessToken && refreshToken) {
                dispatch({
                    type: "RESTORE_SESSION",
                    payload: { accessToken, refreshToken }
                });
            }
            else {
                dispatch({ type: "LOGOUT" })
            }
        } catch (error) {
            dispatch(({ type: "LOGOUT" }))
        }
    }

    const login = async (email: string, password: string) => {
        dispatch({ type: "LOGIN_START" });

        await new Promise((resolve) => setTimeout(resolve, 800));
        //Sim promise delay

        if (!email || !password) {
            console.log('Credentials error!');
            dispatch({ type: "LOGIN_FAILURE", payload: "*EMAIL & PASSWORD ARE REQUIRED" })
            return
        }

        try {
            const response = await fetch("https://timetracker-api.experient.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const cookies = response.headers.get("Set-Cookie");
            console.log("Set-Cookie:", cookies);


        } catch (error) {
            console.log("API failed, using mock: ", error);

            const { accessToken, refreshToken } = MOCK_AUTH_RESPONSE;

            await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
            await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { accessToken, refreshToken }
            })

        }


    }
    const logout = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        } catch (error) {
            console.error("Error clearing tokens:", error);
        }
        dispatch({ type: "LOGOUT" });
    };

    const clearError = () => {
        dispatch({ type: "CLEAR_ERROR" });
    };



    return (
        <AuthContext.Provider value={{ state, login, logout, clearError }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth hook error")
    }
    return context;
}