import React, { useRef, useState } from "react"
import { Space, Table, Tag } from "antd"
import axios from "axios"
import { useEffect } from "react"
import "./myDoc.css"
// Create Document Component
const MyDocument = ({ ref }) => {
  const [mixData, setMixData] = useState([])
  const combineData = async () => {
    const result = await axios.get(
      "https://saqeeb-z91h.onrender.com/api/v1/expert/expert-findings"
    )
    if (result.data.success) {
      setMixData(result.data.data)
    }
  }

  useEffect(() => {
    combineData()
  }, [])
  return (
    <div>
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
                  {mixData?.patternFoundId?.result?.map((result) => (
                    <>
                      <tr>
                        <td>{result.name}</td>
                        <td>{result.value}</td>
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
                  <tr>
                    <td>
                      <p>
                        CountDown:{mixData[0]?.url.countdown ? "TRUE" : "FALSE"}
                        <br />
                        Scarcity:{mixData[0]?.url.scarcity
                          ? "TRUE"
                          : "FALSE"}{" "}
                        <br />
                        Forced Continuity:
                        {mixData[0]?.url.forced_continuity
                          ? "TRUE"
                          : "FALSE"}{" "}
                        <br />
                        Social Proof:
                        {mixData[0]?.url.social_proof ? "TRUE" : "FALSE"} <br />
                      </p>
                    </td>
                    <td>{mixData[0]?.url.opinion}</td>
                  </tr>
                </>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyDocument
