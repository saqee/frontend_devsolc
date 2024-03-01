import { Box, Button } from "@mui/material"
import { useReactToPrint } from "react-to-print"
import { useState, useRef, useEffect } from "react"
import GenerateData from "./Result"
import axios from "axios"
import { saveAs } from "file-saver"
const ShowResult = () => {
  let componentRef = useRef()
  const [idSet, setIdSet] = useState()
  const [expertVerificationData, setExpertVerificationData] = useState([])
  const [ids, setIds] = useState(false)
  const expertVerification = async () => {
    const res = await axios.get(
      "https://saqeeb-z91h.onrender.com/api/v1/expert/expert-verification"
    )
    if (res.data.success) {
      setExpertVerificationData(res.data.data)
      //setIdSet(res?.data.data.requestId._id)
    }
  }
  //expertVerification()
  let a = expertVerificationData[0]?.patternFoundId.result.map((el) =>
    el.value > 0 ? 1 : 0
  )
  console.log(expertVerificationData[0]?.url.scarcity)
  useEffect(() => {
    if (!expertVerificationData.length) {
      expertVerification()
    }
  }, [expertVerificationData, ids, expertVerification])

  const downloadImage = () => {
    if (a?.includes(1)) {
      saveAs("https://i.ibb.co/LPt79W8/Darkpattern-Present.png", "image.png") // Put your image URL here.
    } else {
      saveAs(
        "https://upload.wikimedia.org/wikipedia/en/9/9d/Link_%28Hyrule_Historia%29.png",
        "image.png"
      )
    }
  }
  return (
    <div className="mt-10 p-10" style={{ marginLeft: "400px" }}>
      <table className="myDoc">
        <thead>
          <h1 className="text-2xl m-5 font-bold ">Automation Result</h1>
          <tr>
            <th> Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <>
            {expertVerificationData[0]?.patternFoundId?.result.map((el) => {
              return (
                <tr className="">
                  <td>{el.name}</td>
                  <td>{el.value}</td>
                </tr>
              )
            })}
            <td>{expertVerificationData[0]?.url.opinion}</td>
          </>
        </tbody>
      </table>
      <div className="App">
        <h1 className="text-2xl m-5 font-bold ">Expert Findings One</h1>
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
                    CountDown:
                    {expertVerificationData[0]?.url.countdown
                      ? "TRUE"
                      : expertVerificationData[0]?.url.countdown == undefined
                      ? ""
                      : "FALSE"}
                    <br />
                    Scarcity:
                    {expertVerificationData[0]?.url.scarcity
                      ? "TRUE"
                      : expertVerificationData[0]?.url.scarcity == undefined
                      ? ""
                      : "FALSE"}{" "}
                    <br />
                    Forced Continuity:
                    {expertVerificationData[0]?.url.forced_continuity
                      ? "TRUE"
                      : expertVerificationData[0]?.url.forced_continuity ==
                        undefined
                      ? ""
                      : "FALSE"}{" "}
                    <br />
                    Social Proof:
                    {expertVerificationData[0]?.url.social_proof
                      ? "TRUE"
                      : expertVerificationData[0]?.url.social_proof == undefined
                      ? ""
                      : "FALSE"}{" "}
                    <br />
                  </p>
                </td>
                <td>{expertVerificationData[0]?.url.opinion}</td>
              </tr>
            </>
          </tbody>
        </table>
      </div>
      <div className="App">
        <h1 className="text-2xl m-5 font-bold">Expert Findings Two</h1>
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
                    CountDown:
                    {expertVerificationData[1]?.url.countdown
                      ? "TRUE"
                      : expertVerificationData[1]?.url.countdown == undefined
                      ? " "
                      : "FALSE"}
                    <br />
                    Scarcity:
                    {expertVerificationData[1]?.url.scarcity
                      ? "TRUE"
                      : expertVerificationData[1]?.url.scarcity == undefined
                      ? " "
                      : "FALSE"}{" "}
                    <br />
                    Forced Continuity:
                    {expertVerificationData[1]?.url.forced_continuity
                      ? "TRUE"
                      : expertVerificationData[1]?.url.forced_continuity ==
                        undefined
                      ? " "
                      : "FALSE"}{" "}
                    <br />
                    Social Proof:
                    {expertVerificationData[1]?.url.social_proof
                      ? "TRUE"
                      : expertVerificationData[1]?.url.social_proof == undefined
                      ? " "
                      : "FALSE"}{" "}
                    <br />
                  </p>
                </td>
                <td>{expertVerificationData[1]?.url.opinion}</td>
              </tr>
            </>
          </tbody>
        </table>
      </div>

      <div className="flex gap-10">
        <Button
          type="primary"
          //onClick={generatePdf}
          onClick={() => window.print()}
          className="mt-4 justify-center align-items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... text-white font-bold border-none pointer"
        >
          Generate Pdf
        </Button>

        <Button
          type="primary"
          onClick={downloadImage}
          className="mt-4 justify-center align-items-center bg-gradient-to-r from-blue-500 to-green-400 hover:from-pink-500 hover:to-yellow-500 ... text-white font-bold border-none pointer"
        >
          Download certificate
        </Button>
      </div>
    </div>
  )
}

export default ShowResult
