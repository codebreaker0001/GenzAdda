
import React, { useState } from 'react'

import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { EditOutlinedIcon } from '@mui/icons-material/EditOutlined'
import { setLogin } from '../../state'

import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import Dropzone from 'react-dropzone'
import FlexBetween from '../../components/flexbtween'
import { useNavigate } from 'react-router-dom';
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    // confirmPassword:yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})


const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initialValueRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // confirmPassword:"",
    location: "",
    occupation: "",
    picture: "",
}


const initialvaluesLogin = {
    email: "",
    password: "",
}
function Form() {

    const [pageType, setPageType] = useState("login")

    const { palette } = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isNonMobile = useMediaQuery("(mid-widht:600px)");
    const isLogin = pageType === "login"
    const isRegister = pageType === "register"

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();

        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('picturePath', values.picture.name);

        const savedUserResponse = await fetch(
            "https://genzadda-1.onrender.com/auth/register",
            {
                method: "POST",
                body: formData,
            }
        )

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login")
        }
    }

    const login = async (values, onSubmitProps) => {
        const response = await fetch(
            "https://genzadda-1.onrender.com/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }
        )

        const loggedIn = await response.json();
        onSubmitProps.resetForm();

        if (loggedIn) {
            dispatch(setLogin({
                token: loggedIn.token,
                user: loggedIn.user,
            })
            );
            navigate("/home")
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {

        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);

    }


    return (
        <Formik onSubmit={handleFormSubmit} initialValues={isLogin ? initialvaluesLogin : initialValueRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax(0,1fr))"

                        sx={{
                            "@ > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}

                    >
                        {isRegister && (
                            <>
                                <TextField label="firstName" onBlur={handleBlur} onChange={handleChange} value={values.firstName} name='firstName' error={Boolean.firstName && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />
                                 <TextField label="lastName" onBlur={handleBlur} onChange={handleChange} value={values.lastName} name='lastName' error={Boolean.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />
                                <TextField label="location" onBlur={handleBlur} onChange={handleChange} value={values.location} name='location' error={Boolean.location && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />
                                <TextField label="occupation" onBlur={handleBlur} onChange={handleChange} value={values.occupation} name='occupation' error={Boolean.occupation && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"

                                >
                                    <Dropzone

                                        acceptedFiles=".jpg ,.jpeg,.png,.webp"
                                        multiple="false"
                                        onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                                    >
                                        {({
                                            getRootProps,
                                            getInputProps,

                                        }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "@:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {
                                                    !values.picture ? (
                                                        <p>Add picture here</p>
                                                    ) : (
                                                        <FlexBetween>
                                                            <Typography>{values.picture.name}</Typography>
                                                        </FlexBetween>
                                                    )
                                                }


                                            </Box>
                                        )}

                                    </Dropzone>

                                </Box>

                            </>
                        )}
                        <TextField label="email" onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' error={Boolean.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{
                                gridColumn: "span 2"
                            }}
                        />
                        <TextField label="password" onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' error={Boolean.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{
                                gridColumn: "span 2"
                            }}
                        />


                    </Box>
                    {/* buttons */}

                    <Box>
                        <Button
                            fullWidth
                            type='submit'
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}>
                            {isLogin ? "Login" : "Register"}
                        </Button>
                        <Typography onClick={() => { setPageType(isLogin ? "register" : "login"); resetForm() }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                : "Already have an account? Login here."}

                        </Typography>
                    </Box>
                </form>
            )}

        </Formik>
    )
}

export default Form