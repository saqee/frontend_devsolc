import React, { useRef, useState } from "react"
import { Space, Table, Tag } from "antd"
import axios from "axios"
import { useEffect } from "react"
import "./myDoc.css"
import { Box, Button } from "@mui/material"
// Create Document Component
const GenerateData = ({ ref, id }) => {
  const [mixData, setMixData] = useState()
  const handleData = async () => {
    const result = await axios.post(
      "https://saqeeb-z91h.onrender.com/api/v1/expert/send-result-to-user",
      { id }
    )
    if (result.data.success) {
      console.log(100)
      setMixData(result.data.data)
    }
  }

  useEffect(() => {
    if (!mixData) {
      handleData()
    }
  }, [mixData])
  return (
    <div>
      <div className=" gap-5 m-5" ref={ref}>
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
                {mixData?.patternFoundId?.result?.map((item) => (
                  <>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.value}</td>
                      <td>processing</td>
                    </tr>
                  </>
                ))}
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
                        CountDown:{mixData?.url.countdown ? "TRUE" : "FALSE"}
                        <br />
                        Scarcity:{mixData?.url.scarcity ? "TRUE" : "FALSE"}{" "}
                        <br />
                        Forced Continuity:
                        {mixData?.url.forced_continuity ? "TRUE" : "FALSE"}{" "}
                        <br />
                        Social Proof:
                        {mixData?.url.social_proof ? "TRUE" : "FALSE"} <br />
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
  )
}
export default GenerateData
