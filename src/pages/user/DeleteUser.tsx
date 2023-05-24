import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { InputHelper, toastNotifyHelper } from '../../helperMethods';
import { checkAdminAuth } from '../../HOC';
import { useDeleteUserByIdMutation, useGetUserByIdQuery } from '../../APIs/UserAPI';


function DeleteUser() {
  // define useParams() hook to receive the userId through the route
  const { userId } = useParams();
  // once we have the userId, we need to call the query for GetUserById(userId)
  const { data } = useGetUserByIdQuery(userId);
  console.log(data);

  // define useState() hook to set loading when this page needs
  const [isLoading, setIsLoading] = useState(false);
  // define useNavigate() hook to redirect admin user to AdminUsersList page once a user has been deleted
  const navigate = useNavigate();
  // define the mutation for DELETE endpoint to delete a user
  const [deleteUser] = useDeleteUserByIdMutation();

  // useState for the input fields to delete a user writing its id
  const [deleteInput, setDeleteInput] = useState({
    id: ''
  });

  // now we have to use our helper method called InputHelper... copied/pasted from Register.tsx
  const handleDeleteInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(event, deleteInput);
    setDeleteInput(tempData);
  }

  // define another helper method to handle the delete user action with active confirmation
  const handleDeleteUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (userId === deleteInput.id) {
      const deleteResponse = await deleteUser(userId);

      if (deleteResponse) {
        setIsLoading(false);
        navigate('/user/AdminUsersList');
        toastNotifyHelper('Usuario eliminado correctamente', 'success');
      }
    }
    else {
      toastNotifyHelper('El usuario NO se ha eliminado', 'error');
      setIsLoading(false);
    }

    setIsLoading(false);
  }


  return (
    <div className='container mt-3 p-3 bg-light'>

      <h3 className='mb-3 px-2 text-warning'>
        ¿Estás seguro de que quieres eliminar este usuario?
      </h3>
      
      {data && (
        <>
          <p>Nombre del usuario: <span style={{color: 'red'}}>{data.result?.name}</span></p>
          <p>Email del usuario: <span style={{color: 'red'}}>{data.result?.email}</span></p>
          <p>ID del usuario: <span style={{color: 'red'}}>{data.result?.id}</span></p>
        </>
      )}

      <form method='post' encType='multipart/form-data' onSubmit={handleDeleteUser}>
        <div className='row mt-3'>
          <div className='col-md-7'>
            <input
              type='text'
              className='form-control'
              placeholder='Id del Usuario'
              required
              name='id'
              value={deleteInput.id}
              onChange={handleDeleteInput}
            />

            <div className="row">
              <div className="col-6">
                <button
                  className='btn btn-warning mt-3 form-control'
                  type='submit'
                >
                  Eliminar
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


export default checkAdminAuth(DeleteUser)