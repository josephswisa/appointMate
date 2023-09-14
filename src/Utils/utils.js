export function isStrongUsername(username) {
    // Check if username is at least 6 characters long
    if (username.length < 6) {
        return false;
    }

    // Check if username contains only letters, numbers, or underscores
    const validChars = /^[a-zA-Z0-9_]*$/;
    if (!validChars.test(username)) {
        return false;
    }

    // Check if username starts with a letter
    const firstChar = username.charAt(0);
    const validFirstChar = /^[a-zA-Z]$/;
    if (!validFirstChar.test(firstChar)) {
        return false;
    }

    // Username is strong enough
    return true;
}

export function isStrongPassword (password){
    if(password.length < 6){
        return false;
    }

    return true;
}

