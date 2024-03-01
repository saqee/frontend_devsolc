import { Box, Button, useTheme } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import CreateIcon from "@mui/icons-material/Create"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import axios from "axios"
import { useState, useRef } from "react"
import { Modal } from "antd"
import { useEffect } from "react"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import { Select, Space } from "antd"

const RequestList = () => {
  const navigate = useNavigate()

  const user = localStorage.getItem("token")
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [allRequest, setAllRequestData] = useState()
  const [status, setStatusData] = useState("")
  const test = []
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = (index) => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const allRequestData = async () => {
    const res = await axios.get(
      "https://saqeeb-z91h.onrender.com/api/v1/user/client-all-request",
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    )
    setAllRequestData(res.data.data)
  }
  if (allRequest?.length > 0) {
    for (let i = 0; i < allRequest?.length; i++) {
      test.push({ ...allRequest[i], id: allRequest[i]._id })
    }
  }
  const statusChange = (value) => {
    setStatusData(value)
  }
  const handleChange = async (id, value) => {
    const res = await axios.patch(
      `https://saqeeb-z91h.onrender.com/api/v1/user/user-all-request/${id}`,
      { status: value },
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    )
    if (res.data.success) {
      message.success(res.data.message)
    }
  }

  const handleDeleteUser = async (id) => {
    const res = await axios.post(
      `https://saqeeb-z91h.onrender.com/api/v1/user/user-all-request/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    )
    if (res.data.success) {
      message.success(res.data.message)
      navigate("/")
    }
  }
  useEffect(() => {
    allRequestData()
  }, [])
  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    {
      field: "websiteurl",
      headerName: "Url",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "carturl",
      headerName: "Cart Url",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      type: "actions",
      width: 250,
      height: 250,
      getActions: (params) => [
        <Select
          labelInValue
          defaultValue={{
            label: `${params.row.status}`,
          }}
          style={{
            width: 120,
          }}
          onChange={(value) => {
            handleChange(params.row.id, value.value)
          }}
          /* onClick={(e) => {
            e.preventDefault()
           
          }} */
          options={[
            {
              value: "ongoing",
              label: "onGoing",
            },
            {
              value: "completed",
              label: "Completed",
            },
          ]}
        />,
      ],
      disableClickEventBubbling: true,
    },
  ]
  return (
    <Box m="20px">
      <Header
        title="Request List"
        subtitle="List of All request for Pattern check"
      />

      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            boderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          /*   '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: ${colors.grey[100]} !important,
            } */
        }}
      >
        <DataGrid
          rows={test}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}
export default RequestList
