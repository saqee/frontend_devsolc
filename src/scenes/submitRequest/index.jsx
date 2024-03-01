import React from "react"
import { Box, Button, TextField } from "@mui/material"
import { Formik } from "formik"
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery"
import Header from "../../components/Header"
import axios from "axios"
import { message } from "antd"
import { Navigate, useNavigate } from "react-router-dom"

const initialValues = {
  websiteUrl: "",
  cartUrl: "",
}

const userSchema = yup.object().shape({
  websiteUrl: yup
    .string()
    .url("Invalid URL format")
    .required("Website URL is required"),
  cartUrl: yup.string().url("Invalid URL format"),
})

const Request = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)")
  const navigate = useNavigate()
  const handleFormSubmit = async (values) => {
    // Input field values
    const websiteurl = values.websiteUrl
    const carturl = values.cartUrl
    const res = await axios.post(
      "https://saqeeb-z91h.onrender.com/api/v1/user/submit-request",
      { websiteurl, carturl },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    if (res.data.success) {
      message.success(res.data.message)
      navigate("/")
    }
  }

  return (
    <Box m="20px">
      <Header title="Submit Your Request" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} style={{ width: "80%" }}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Paste your website URL"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.websiteUrl}
              name="websiteUrl"
              error={!!touched.websiteUrl && !!errors.websiteUrl}
              helperText={touched.websiteUrl && errors.websiteUrl}
              mb={3}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Paste your cart URL (optional)"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.cartUrl}
              name="cartUrl"
              error={!!touched.cartUrl && !!errors.cartUrl}
              helperText={touched.cartUrl && errors.cartUrl}
              mb={3}
            />
            <Box display="flex" justifyContent="center" mt="30px">
              <Button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
                variant="contained"
                sx={{
                  padding: "6px 35px",
                  fontSize: "1.1rem",
                }}
                style={{ width: "30%" }}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Request
