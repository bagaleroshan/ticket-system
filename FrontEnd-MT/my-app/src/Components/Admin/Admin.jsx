import React from 'react'
import UserForm from '../User/UserForm'

const Admin = () => {
  const getData=(data)=>{
console.log("admin",data)
  }
  return (
    <div>
  <UserForm onSubmit={getData} isAdmin={true}></UserForm>
    </div>
  )
}

export default Admin
