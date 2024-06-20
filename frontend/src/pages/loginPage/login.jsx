import React from 'react'

import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from './form';

function LoginPage() {

  const theme = useTheme()
  const isNonMobileScreen = useMediaQuery("(mid-width:1000px)")

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  return (
    <Box>
      <Box width="100%" background={alt} p="1rem 6%" textAlign="center">
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"

        >
          GenzAdda
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? "50%" : "50%"}
        p="2rem"
        m ="2rem auto "
        borderRadius="5px"
        background={alt}
      >
      <Typography fontWeight="500" variant='h5' sx={{mb:"1.5rem"}} >
          Welcome to GenzAdda , the Social media for Genzs
      </Typography>
      <Form/>

      </Box>
    </Box>
  )
}

export default LoginPage