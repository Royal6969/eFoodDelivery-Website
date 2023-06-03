import React from 'react'
import { checkAdminAuth } from '../../HOC'
import { useGetUsersQuery } from '../../APIs/UserAPI';
import { BigLoader } from '../../components/view/common';
import { UsersListInterface } from '../../interfaces';
import { useNavigate } from 'react-router-dom';


function AdminUsersList() {
  // copied/pasted from same functionality in ProductsList component
  const { data, isLoading } = useGetUsersQuery(null);
  // to go to DeleteUser page we need the useNavigate() hook
  const navigate = useNavigate();

  
  return (
    <>
      {isLoading && (
        <BigLoader />
      )}

      {!isLoading && (
        <div className='table p-5'>
          <div className='d-flex align-items-center justify-content-between'>
            <h1 className='text-warning'>Listado de usuarios</h1>
          </div>
          
          <div className='p-2'>
            <div className='row border'>
              <div className='col-4'>ID</div>
              <div className='col-2'>Nombre</div>
              <div className='col-2'>Email</div>
              <div className='col-1'>Teléfono</div>
              <div className='col-1'>Rol</div>
              <div className='col-2'>Accciones</div>
            </div>
            
            {data.result.map(
              (user: UsersListInterface, index: number) => {
                return (
                  <div className='row border' key={index}>     
                    <div className='col-4'>{user.user.id}</div>
                    <div className='col-2 text-break'>{user.user.name}</div>
                    <div className='col-2 text-break'>{user.user.email}</div>
                    <div className='col-1'>{user.user.phoneNumber}</div>
                    <div className='col-1'>{user.role}</div>
                    <div className='col-2'>
                      <button className='btn btn-warning'>
                        <i 
                          className='bi bi-pencil-fill' 
                          onClick={() => navigate('/user/EditUserRole/' + user.user.id)}
                        ></i>
                      </button>

                      <button className='btn btn-danger mx-2' disabled={user.role === 'admin'}>
                        <i 
                          className='bi bi-trash-fill'
                          onClick={() => navigate('/user/DeleteUser/' + user.user.id)}
                        ></i>
                      </button>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      )}
    </>
  )
}


export default checkAdminAuth(AdminUsersList)