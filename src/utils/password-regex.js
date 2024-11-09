export const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[@#$*!&%])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    return regex.test(password);
}