import React from 'react'


function PasswordChanged() {
  return (
    <div className="container container-fp">
      <div className="row">
        <div className="col-md-4 offset-md-4 form login-form">

          <form action="login-user.php" method="POST">
            <div className="form-group">
              <input 
                className="form-control button" 
                type="submit" 
                name="login-now" 
                value="Login Now"
              />
            </div>
          </form>
          
        </div>
      </div>
    </div>
  )
}


export default PasswordChanged