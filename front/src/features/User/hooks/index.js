import api from "../../../utils/api";

export const userLogin = (existingUser) => {
    return api.post('auth/login', existingUser);
}

export const userRegister = (newUser) => {
    return api.post('auth/register', newUser);
}

export const googleLogin = (credential) => {
    return api.post('auth/google-auth', { credential });
}

export const userLogout = () => {
    return api.post('auth/logout');
}

export const refreshToken = () => {
    return api.post('auth/refresh-tokens');
}

export const getMe = () => {
    return api.get('auth/me');
}