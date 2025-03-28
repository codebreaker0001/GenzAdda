import React, { useState } from 'react'
import{
    Box,
    FormControl,
    IconButton,
    InputBase,
    Select,
    Typography,
    useMediaQuery,
    useTheme,
    MenuItem
} from '@mui/material'


import { Close, DarkMode, Help, Search, Menu ,LightMode,Message } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/flexbtween';
import { setMode, setLogout } from '../../state';

 const  Navbar = () =>{

    const [isMobileMenuToggled, setisMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user)
    const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

    const theme = useTheme();

    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;


    const fullName = `${user.firstName} ${user.lastName}`;


    return <FlexBetween padding="1rem 6%" background={alt} >
        <FlexBetween gap="1.75rem">
            <Typography fontWeight="bold" fontSize="clamp(1rem,2rem,2.25rem)" color="primary"
                onClick={() => navigate("/home")}
                sx={{
                    "@:hover": {
                        color: primaryLight,
                        cursor: "pointer"
                    },
                }}
            >
                GenzAdda
            </Typography>
            {isNonMobileScreen &&
                <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem" >
                    <InputBase placeholder='Search...'>
                        <IconButton>
                            <Search />
                        </IconButton>
                    </InputBase>
                </FlexBetween>}
        </FlexBetween>
        {isNonMobileScreen ? (
            <FlexBetween gap="2rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (<DarkMode sx={{ fontSize: "25px" }} />) : (<LightMode sx={{ fontSize: "25px", color: dark }} />)}
                </IconButton>
                <Message sx={{ fontSize: "25px" }} onClick={() => navigate(`/chat`)} />
                
                <Help sx={{ fontSize: "25px" }} />
                <FormControl variant='standard' value={fullName}>
                    <Select
                        value={fullName}
                        sx={{
                            width: "150px",
                            backgroundColor: neutralLight,
                            borderRadius: "0.25rem",
                            "@ .MuiSvgIcon;root": {
                                pr: "0.25rem",
                                width: "3rem",
                            },
                            "@ .MuiSelect-select:focus": {
                                backgroundColor: neutralLight,
                                // borderRadius: "0.25rem"
                            }
                        }}

                        input={<InputBase />}
                    >
                        <MenuItem value={fullName}>
                            <Typography > {fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}> Log Out </MenuItem>

                    </Select>
                </FormControl>

            </FlexBetween>) :
            (<IconButton onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}>
                <Menu />
            </IconButton>)

        }
        {!isNonMobileScreen && isMobileMenuToggled && (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}

            >
                <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton
                        onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close />
                    </IconButton>
                </Box>


        <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            {/* <Notifications sx={{ fontSize: "25px" }} /> */}
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
    </Box>)}
    </FlexBetween >


}

export default Navbar;

