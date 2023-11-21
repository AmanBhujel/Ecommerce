function setCookie(name, value, daysToExpire, path = '/', sameSite = 'None') {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);

    const expires = `expires=${date.toUTCString()}`;
    const cookieOptions = `path=${path}; SameSite=${sameSite}`;

    document.cookie = `${name}=${value}; ${expires}; ${cookieOptions}`;
}

export default setCookie;
