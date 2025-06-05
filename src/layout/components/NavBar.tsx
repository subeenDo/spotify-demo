import { Box } from '@mui/material'
import React from 'react'
import LoginButton from '../../common/components/Button/LoginButton'

const NavBar = () => {
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
        <LoginButton/>
    </Box>
  )
}

export default NavBar