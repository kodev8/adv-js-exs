export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

export const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
}

export const titleCase = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

