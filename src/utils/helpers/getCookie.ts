/**
 * Get the value of a cookie by name.
 * @param {string} cookieName - The name of the cookie to retrieve.
 * @returns {string|undefined} The value of the cookie, or undefined if the cookie is not found.
 */
export const getCookie = (cookieName: string): string => {
    // Get all the cookies from the browser
    const cookies = `; ${document.cookie}`;
    // Split the cookies string into an array, cookieParts, to retrieve the one that is being searched for
    const cookieParts = cookies.split(`; ${cookieName}=`);
    
    if (cookieParts.length === 2) {
        // Get the value that corresponds to the cookieName
        const cookieValue = cookieParts.pop()?.split(';').shift();
        // If the type is string, return it
        if (typeof cookieValue === 'string') {
            return cookieValue;
        }
    }
    // Else return undefined
    return 'undefined';
};