function passwordValidator(password: string): boolean {
    const hasProperLength = password.length >= 8 && password.length <= 16;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoSpaces = !/\s/.test(password);
    return hasProperLength && hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar && hasNoSpaces;
}

export default passwordValidator;