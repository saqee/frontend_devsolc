import { Box, Button } from "@mui/material"
import { useReactToPrint } from "react-to-print"
import { useState, useRef, useEffect } from "react"
import GenerateData from "./Result"
import axios from "axios"
import React from "react"
import MyDocument from "../taskOperation/MyDocument"
const ShowResult = () => {
  const componentRef = useRef()
  const [idSet, setIdSet] = useState()
  const [mixData, setMixData] = useState()
  const [expertVerificationData, setExpertVerificationData] = useState()
  const [ids, setIds] = useState(false)
  const expertVerification = async () => {
    const res = await axios.get(
      "https://saqeeb-z91h.onrender.com/api/v1/expert/expert-verification"
    )
    if (res.data.success) {
      //message.success(res.data.message)
      setExpertVerificationData(res.data.data)
      setIdSet(res.data.data.requestId._id)
    }
  }

  const generatePdf = useReactToPrint({
    content: () => componentRef.current,
  })
  const handleData = async (idSet) => {
    expertVerification()
    const result = await axios.post(
      "https://saqeeb-z91h.onrender.com/api/v1/expert/send-result-to-user",
      { idSet }
    )
    if (result.data.success) {
      //console.log(100)
      setMixData(result.data.data)
    }
    setIds(!ids)
  }
  useEffect(() => {
    /* if (!expertVerificationData) {
      expertVerification()
    } */

    handleData()
  }, [])

  return (
    <Box height="50vh">
      <>
        {ids ? (
          <div className="border-2 p-10 mt-10">
            <div className="">
              <div className="flex justify-center align-items-center gap-5 p-5">
                {/*  <p>{mixData?.websiteurl.substr(0, 20)}</p> */}
                <Button
                  type="primary"
                  onClick={handleData}
                  className="justify-center align-items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... text-white font-bold border-none pointer"
                >
                  Expert Result
                </Button>
              </div>
              {ids ? (
                <>
                  <div ref={componentRef}>
                    {/*  <GenerateData ref={componentRef} id={idSet} /> */}
                    {/*  <MyDocument /> */}
                    <div>
                      <div className=" gap-5 m-5">
                        <div className="App">
                          <h1 className="text-2xl font-bold text-center m-5">
                            Automatic Findings
                          </h1>
                          <table className="myDoc">
                            <thead>
                              <tr>
                                <th>Pattern Name</th>
                                <th>Count</th>
                                <th>Keyword Matched</th>
                              </tr>
                            </thead>
                            <tbody>
                              <>
                                {mixData?.patternFoundId?.result?.map(
                                  (item) => (
                                    <>
                                      <tr>
                                        <td>{item.name}</td>
                                        <td>{item.value}</td>
                                        <td>processing</td>
                                      </tr>
                                    </>
                                  )
                                )}
                              </>
                            </tbody>
                          </table>
                        </div>

                        <div className="App">
                          <h1 className="text-2xl m-5 font-bold text-center">
                            Expert Findings
                          </h1>
                          <table className="myDoc">
                            <thead>
                              <tr>
                                <th>Pattern Name</th>
                                <th>Opinion</th>
                              </tr>
                            </thead>
                            <tbody>
                              <>
                                <>
                                  <tr>
                                    <td>
                                      <p>
                                        CountDown:
                                        {mixData?.url.countdown
                                          ? "TRUE"
                                          : "FALSE"}
                                        <br />
                                        Scarcity:
                                        {mixData?.url.scarcity
                                          ? "TRUE"
                                          : "FALSE"}{" "}
                                        <br />
                                        Forced Continuity:
                                        {mixData?.url.forced_continuity
                                          ? "TRUE"
                                          : "FALSE"}{" "}
                                        <br />
                                        Social Proof:
                                        {mixData?.url.social_proof
                                          ? "TRUE"
                                          : "FALSE"}{" "}
                                        <br />
                                      </p>
                                    </td>
                                    <td>{mixData?.url.opinion}</td>
                                  </tr>
                                </>
                              </>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              {ids ? (
                <>
                  {" "}
                  <Button
                    type="primary"
                    onClick={generatePdf}
                    className="justify-center align-items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... text-white font-bold border-none pointer"
                  >
                    Generate PDF
                  </Button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className="mt-16 flex gap-5 justify-center align-items-center">
            {" "}
            <Button
              type="primary"
              onClick={handleData}
              className="justify-center align-items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... text-white font-bold border-none pointer"
            >
              Expert Result
            </Button>
          </div>
        )}
      </>
    </Box>
  )
}
export default ShowResult
