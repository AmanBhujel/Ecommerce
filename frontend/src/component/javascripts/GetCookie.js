
const GetCookie = (name) => {
    const allCookies = document.cookie;
    const cookiesArray = allCookies.split(';');
    let requiredValue = null;

    for (const cookie of cookiesArray) {
        const [cookieName, cookieValue] = cookie.split('=');

        if (cookieName.trim() === name) {
            requiredValue = cookieValue;
            break;
        }
    }

    if (requiredValue) {
        return requiredValue;
    } else {
        console.log('Required cookie not found');
    }
}

export default GetCookie;