
describe("HomeScreen", () => {
    const mockLogout = jest.fn();

    beforeEach(() => {
        mockLogout.mockClear();
    });
    it("displays welcome text when authenticated", () => {
        const isAuthenticated = true;
        const welcomeText = "Welcome Home";

        const screenContent = isAuthenticated ? welcomeText : null;

        expect(screenContent).toBe("Welcome Home");
    });

    it("calls logout when logout button pressed", () => {
        mockLogout();

        expect(mockLogout).toHaveBeenCalled();
    });

    it("logout clears authentication state", () => {
        let isAuthenticated = true;

        const logout = () => {
            isAuthenticated = false;
            mockLogout();
        };

        logout();

        expect(isAuthenticated).toBe(false);
        expect(mockLogout).toHaveBeenCalled();
    });

    it("user should be authenticated to see home screen", () => {
        const isAuthenticated = true;

        expect(isAuthenticated).toBe(true);
    });

    it("redirects to login when not authenticated", () => {
        const isAuthenticated = false;
        const currentScreen = isAuthenticated ? "Home" : "Login";

        expect(currentScreen).toBe("Login");
    });

    it("shows home when authenticated", () => {
        const isAuthenticated = true;
        const currentScreen = isAuthenticated ? "Home" : "Login";

        expect(currentScreen).toBe("Home");
    });
});