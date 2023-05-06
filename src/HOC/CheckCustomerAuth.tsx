const checkCustomerAuth = (WrappedComponent: any) => {
  // now we have to return back that wrapped component
  // we can also expect any props that are being passed with the component we will capture and return them back as well
  // so in the return statement, we will also return any props that are defined with the WrappedComponent
  return(props: any) => {
    // so before we return the WrappedComponent here, we need to check if a user is authenticated or not
    const userAccessToken = localStorage.getItem('token');

    // if token is not populated, redirect user to login page
    if (!userAccessToken) {
      window.location.replace('/Login');
      return null;
    }

    // now if it's a simple component what we can do is we can return that WrappedComponent along with all the props spread
    return <WrappedComponent {...props} />
  }
}


export default checkCustomerAuth;