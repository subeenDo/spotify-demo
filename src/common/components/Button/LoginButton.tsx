import { Button } from '@mui/material'
import React from 'react'
import { getSportifyAuthUrl } from '../../../utils/auth'

const LoginButton = () => {

  const login=()=>{
    getSportifyAuthUrl()
  }

  return (
    <Button variant='contained' color='secondary' size="large" onClick={login}>
      Login
    </Button>
  )
}

export default LoginButton