const TOKEN_KEY = 'nectar_auth_token';
export const tokenStore = {
    get() {
        return localStorage.getItem(TOKEN_KEY);
    },
    set(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },
    clear() {
        localStorage.removeItem(TOKEN_KEY);
    }
};
