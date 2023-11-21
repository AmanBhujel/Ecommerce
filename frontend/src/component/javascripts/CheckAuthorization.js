import axios from "axios";
import GetCookie from "./GetCookie";

export const checkAuthorization = async () => {
    try {
        const authorizationToken = GetCookie('authorization');
        if(authorizationToken){
            const headers = {
                Authorization: `Bearer ${authorizationToken}`,
            };
            const response = await axios.get('https://backend-ecommerce-60yd.onrender.com/check-auth', { headers });
    
            if (response.data.authorized === true) {
                return true;
            }
    
            return false;
        }
        return false;
    } catch (error) {
        console.error('Authorization check failed:', error);
        return false;
    }
};
