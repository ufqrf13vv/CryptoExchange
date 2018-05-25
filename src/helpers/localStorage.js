export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('jwt_token');
}

export const setTokenToLocalStorage = token => {
    localStorage.setItem('jwt_token', token);
}

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('jwt_token');
}