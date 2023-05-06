import jwt_decode from "jwt-decode";
import { StaticDetails_Roles } from "../Utils/StaticDetails";


const checkAdminAuth = (WrappedComponent: any) => {
  // now we have to return back that wrapped component
  // we can also expect any props that are being passed with the component we will capture and return them back as well
  // so in the return statement, we will also return any props that are defined with the WrappedComponent
  return (props: any) => {
    // so before we return the WrappedComponent here, we need to check if a user is authenticated or not
    const userAccessToken = localStorage.getItem('token') ?? ''; // if token does't exist, we have and empty token

    // if token exists, now we have to examine the token and extract the role
    if (userAccessToken) {
      const decodeTokenForRole: { role: string; } = jwt_decode(userAccessToken);

      // if the role from the token decoded is not admin
      if (decodeTokenForRole.role !== StaticDetails_Roles.ADMIN) {
        // redirect user to the AccessRefused page
        window.location.replace('/AccessRefused');
        return null;
      }
    }
    // else, if access token is not present, then we want to redirect user to the login page
    else {
      window.location.replace('/Login');
      return null;
    }

    // now if it's a simple component what we can do is we can return that WrappedComponent along with all the props spread
    return <WrappedComponent {...props} />
  }
}


export default checkAdminAuth;