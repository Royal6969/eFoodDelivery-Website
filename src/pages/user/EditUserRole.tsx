import React, { useState } from 'react'
import { BigLoader } from '../../components/view/common';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../APIs/UserAPI';
import { useCreateLogMutation } from '../../APIs/LoggerAPI';
import { StaticDetails_Roles } from '../../Utils/StaticDetails';
import { InputHelper, toastNotifyHelper } from '../../helperMethods';
import { ApiResponse } from '../../interfaces';
import { checkAdminAuth } from '../../HOC';


function EditUserRole() {
  // define useParams() hook to receive the userId through the route
  const { userId } = useParams();
  // once we have the userId, we need to call the query for GetUserById(userId)
  const { data } = useGetUserByIdQuery(userId);
  // console.log(data);

  // define useState() hook to set loading when this page needs
  const [isLoading, setIsLoading] = useState(false);
  // define useNavigate() hook to redirect admin user to AdminUsersList page once a user has been deleted
  const navigate = useNavigate();
  
  const [roleInput, setRoleInput] = useState({
    role: ''
  });
  
  // now we have to use our helper method called InputHandler
  const handleRoleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempData = InputHelper(event, roleInput);
    setRoleInput(tempData);
  }

  // define the mutation for UPDATE endpoint to delete a user
  const [updateUser] = useUpdateUserMutation();
  
  // define mutation to create new logs
  const [createLog] = useCreateLogMutation();

  const handleEditUserRole = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const updateResponse: ApiResponse = await updateUser({
      userId: userId,
      role: roleInput.role
      // all of these values will be populated inside the registerInput because we have the control component
    });

    // one we invoke the endpoint, we have to examine the response that result
    if (updateResponse.data) { // if registerResponse.data, if that is populated, let's check what happens 
      createLog({ log: "Se ha actualizado el rol del usuario --> Nombre: \"" + data.result?.user.name + "\" Email: \"" + data.result?.user.email + "\" Rol: \"" + data.result?.role + "\"", level: "warn" });

      toastNotifyHelper('Rol modificado correctamente!');
      navigate('/user/AdminUsersList');
    }
    else if (updateResponse.error) {
      // console.log(registerResponse.error.data.errorsList[0]);
      // toastNotifyHelper(updateResponse.error.data.errorsList[0], 'error')
      toastNotifyHelper('Error al actualizar el rol del usuario', 'error')
    }

    setIsLoading(false);
  }


  return (
    <div className='container mt-3 p-3 bg-light'>

      {isLoading && (
        <BigLoader />
      )}

      <h3 className='mb-3 px-2 text-warning'>
        Está actualizado el rol del siguiente usuario:
      </h3>
      
      {data && (
        <>
          <p>Nombre del usuario: <span style={{color: 'red'}}>{data.result?.user.name}</span></p>
          <p>Email del usuario: <span style={{color: 'red'}}>{data.result?.user.email}</span></p>
          <p>Rol del usuario: <span style={{color: 'red'}}>{data.result?.role}</span></p>
          <p>ID del usuario: <span style={{color: 'red'}}>{data.result?.user.id}</span></p>
        </>
      )}

      <form method='post' encType='multipart/form-data' onSubmit={handleEditUserRole}>
        <div className='row mt-3'>
          <div className='col-md-7'>
            <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
              <select 
                className='form-control form-select' 
                required
                name='role'
                value={roleInput.role}
                onChange={handleRoleInput}
              >
                <option value=''>--Seleccionar Rol--</option>
                <option value={`${StaticDetails_Roles.CUSTOMER}`}>Customer</option>
                <option value={`${StaticDetails_Roles.ADMIN}`}>Admin</option>
              </select>
            </div>
            <div className="row">
              <div className="col-6">
                <button
                  className='btn btn-warning mt-3 form-control'
                  type='submit'
                >
                  Actualizar Rol
                </button>
              </div>

              <div className="col-6">
                <a 
                  className='btn btn-secondary mt-3 form-control' 
                  onClick={() => navigate('/user/AdminUsersList')}
                >
                  Volver a los usuarios
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}


export default checkAdminAuth(EditUserRole)