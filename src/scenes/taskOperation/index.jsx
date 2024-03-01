import { Box, Table, useTheme } from "@mui/material"
import Header from "../../components/Header"
import PieChart from "../../components/PieChart"
import useMediaQuery from "@mui/material/useMediaQuery"
import { tokens } from "../../theme"
import StatBox from "../../components/StatBox"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import EmailIcon from "@mui/icons-material/Email"
import axios from "axios"
import { useEffect, useState } from "react"
import Typography from "@mui/material/Typography"
import { useRef } from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import LiveTvIcon from "@mui/icons-material/LiveTv"
import { GridActionsCellItem } from "@mui/x-data-grid"
import { message } from "antd"
import { Button, Modal } from "antd"
import { Link } from "react-router-dom"
import DeleteIcon from "@mui/icons-material/Delete"
import PreviewIcon from "@mui/icons-material/Preview"
import EditIcon from "@mui/icons-material/Edit"
import ReactPDF from "@react-pdf/renderer"
import MyDocument from "./MyDocument"
import { useReactToPrint } from "react-to-print"

const Pie = () => {
  const componentPdf = useRef()
  const theme = useTheme()
  const rootRef = useRef(null)
  const isNonMobile = useMediaQuery("(min-width: 1000px)")
  const colors = tokens(theme.palette.mode)
  const [statusData, setStatusData] = useState([])
  const [ids, setIds] = useState(false)
  const [expertStatusData, setExpertStatusData] = useState([])
  const [automaticResult, setResultData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  let [newData, setNewData] = useState([])
  const showModal = (index) => {
    automaticResult.filter((item) => {
      return index._id === item._id && setNewData(item)
    })
    if (newData) {
      setIsModalOpen(true)
    }
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const test = []
  const ongoingStatusData = async () => {
    const res = await axios.get(
      "https://saqeeb-z91h.onrender.com/api/v1/user/ongoing-request",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    if (res.data.success) {
      setStatusData(res.data.data)
    }
  }

  const expertStatus = async () => {
    const res = await axios.get(
      "https://saqeeb-z91h.onrender.com/api/v1/expert/expert-findings"
    )
    if (res.data.success) {
      setExpertStatusData(res.data.data)
    }
  }

  if (statusData?.length > 0) {
    for (let i = 0; i < statusData?.length; i++) {
      test.push({ ...statusData[i], id: statusData[i]._id })
    }
  }

  const handleResult = async (id) => {
    const res = await axios.get("https://saqeeb-z91h.onrender.com/pattern")
    const patternFoundId = res.data.data[0]._id
    const result = await axios.post(
      `https://saqeeb-z91h.onrender.com/result/${id}`,
      {
        patternFoundId,
        requestId: id,
      }
    )
    if (result.data.success) {
      message.success(result.data.message)
    }
  }

  const showAutomaticResult = async () => {
    const res = await axios.get("https://saqeeb-z91h.onrender.com/result")
    if (res.data.success) {
      setResultData(res.data.data)
    }
  }

  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    {
      field: "websiteurl",
      headerName: "Url",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <a href={params.row.websiteurl}>{params.row.websiteurl}</a>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<LiveTvIcon />}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={() => handleResult(id)}
          />,
        ]
      },
    },
  ]
  //generate pdf function

  const handleTable = () => {
    setIds(!ids)
  }

  useEffect(() => {
    if (!statusData.length) {
      ongoingStatusData()
    }
    if (!expertStatusData.length) {
      expertStatus()
    }
    if (!automaticResult.length) {
      showAutomaticResult()
    }
  }, [])
  return (
    <>
      <Box
        m="30px 20px 0 20px"
        sx={{
          transform: isNonMobile ? "scale(1, 0.85)" : "scale(1, 0.9)",
        }}
      >
        <Header title="Task Operation" subtitle="" />

        {/* GRID & CHART */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 box-key section */}
          <Box
            gridColumn={isNonMobile ? "span 3" : "span 12"}
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <StatBox title="Start The Process" progress="0.75" />
          </Box>

          <Box
            gridColumn={isNonMobile ? "span 3" : "span 12"}
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <StatBox title="Get The Result" progress="0.5" />
          </Box>
          <Box
            gridColumn={isNonMobile ? "span 3" : "span 12"}
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <StatBox title="Experts Verification" progress="0.30 " />
          </Box>

          <Box
            gridColumn={isNonMobile ? "span 3" : "span 12"}
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <StatBox title="Generate Certificate" progress="0.30 " />
          </Box>
        </Box>
        {/* start proces */}
        <Box
          mt={5}
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          ref={rootRef}
        >
          <>
            {/* start proces */}
            <Box
              gridColumn={isNonMobile ? "span 3" : "span 12"}
              height="50vh"
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
            {/* result proces */}
            <Box
              gridColumn={isNonMobile ? "span 3" : "span 12"}
              height="50vh"
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
              }}
              className="mt-10"
            >
              <div className="border-2 p-10">
                <div className="">
                  {automaticResult.map((item, index) => (
                    <>
                      <div className="p-5 flex gap-5" key={index}>
                        <p>{item.requestId.websiteurl.substr(0, 20)}</p>
                        <Button
                          type="primary"
                          onClick={() => showModal(item)}
                          className=""
                        >
                          Show Result
                        </Button>
                        <Modal
                          title="Pattern Detection"
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          width={950}
                          destroyOnClose={true}
                        >
                          <div>
                            <div className="card card-side  shadow-xl max-h-64 flex gap-5  col-span-2">
                              <figure
                                className="max-w-72 max-h-64 border-2 text-center m-2 p-5 text-xl"
                                style={{ backgroundColor: "#B2DFDB" }}
                              >
                                <h2 className="card-title mb-2">
                                  <span className="font-bold">
                                    {" "}
                                    UserName :{" "}
                                  </span>
                                  {newData.requestId?.userId?.username}
                                </h2>

                                <h2 className="card-title mb-2">
                                  <span className="font-bold">
                                    {" "}
                                    Website Url :{" "}
                                  </span>
                                  <Link to={`${newData.requestId?.websiteurl}`}>
                                    {newData.requestId?.websiteurl.substr(
                                      0,
                                      50
                                    )}
                                  </Link>
                                </h2>
                                <h2 className="card-title mb-2">
                                  <span className="font-bold"> Status : </span>
                                  {newData.requestId?.status}
                                </h2>
                              </figure>
                              <div className="bg-gradient-to-r from-green-400 to-blue-500 max-w-96 col-span-2">
                                <div className="p-4">
                                  <div className="p-5">
                                    <table className="">
                                      <tr>
                                        <th>Name</th>
                                        <th> Count</th>
                                      </tr>
                                      {newData.patternFoundId?.result.map(
                                        (result) => {
                                          return (
                                            <tr className="text-center">
                                              <td>{result.name}</td>
                                              <td>{result.value}</td>
                                            </tr>
                                          )
                                        }
                                      )}
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </Box>

            {/* expert proces */}
            <Box
              gridColumn={isNonMobile ? "span 3" : "span 12"}
              height="50vh"
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
              }}
            >
              <>
                {ids && (
                  <div className="border-2 p-10 mt-10">
                    <div className="">
                      <div className="flex justify-center align-items-center gap-5 p-5">
                        <div className="App">
                          <h1 className="text-2xl m-5 font-bold text-center">
                            Expert Findings
                          </h1>
                          <table className="myDoc">
                            <thead>
                              <tr>
                                <th>Expert:</th>
                                <th>Pattern Name</th>
                                <th>Opinion</th>
                              </tr>
                            </thead>
                            <tbody>
                              <>
                                {expertStatusData.map((item) => (
                                  <tr>
                                    <td>{item.username}</td>

                                    <td>
                                      <p>
                                        CountDown:
                                        {item?.url.countdown ? "TRUE" : "FALSE"}
                                        <br />
                                        Scarcity:
                                        {item?.url.scarcity
                                          ? "TRUE"
                                          : "FALSE"}{" "}
                                        <br />
                                        Forced Continuity:
                                        {item?.url.forced_continuity
                                          ? "TRUE"
                                          : "FALSE"}{" "}
                                        <br />
                                        Social Proof:
                                        {item?.url.social_proof
                                          ? "TRUE"
                                          : "FALSE"}{" "}
                                        <br />
                                      </p>
                                    </td>
                                    <td>{item?.url.opinion}</td>
                                  </tr>
                                ))}
                              </>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>

              <Button
                type="primary"
                onClick={handleTable}
                className="p-5 justify-center align-items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... text-white font-bold border-none pointer"
                style={{ marginTop: "40px" }}
              >
                Expert Result
              </Button>
            </Box>
            <Box
              gridColumn={isNonMobile ? "span 3" : "span 12"}
              backgroundColor={colors.primary[400]}
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={4}
              height="48vh"
            >
              <Button
                type="primary"
                className="p-5 justify-center align-items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... text-white font-bold border-none pointer"
                style={{ marginTop: "40px" }}
              >
                Send certificate to user
              </Button>
            </Box>
          </>
        </Box>
      </Box>
    </>
  )
}

export default Pie
