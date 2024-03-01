import React, { useEffect, useState } from "react"
import { Model } from "survey-core"
import { Survey } from "survey-react-ui"
import "survey-core/defaultV2.min.css"
import "./index.css"
import { json } from "./json"
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import { Avatar, Card } from "antd"
import { Link } from "react-router-dom"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { useSelector } from "react-redux"
const UserOpinion = () => {
  const { Meta } = Card

  const [automaticData, setAutomaticData] = useState([])
  const { user } = useSelector((state) => state.user)
  const survey = new Model(json)
  //requestid r patternid dite hobe
  async function data() {
    await fetch("https://saqeeb-z91h.onrender.com/result")
      .then((res) => res.json())
      .then((data) => setAutomaticData(data.data))
  }

  survey.onComplete.add(async (sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3))
    await fetch(
      "https://saqeeb-z91h.onrender.com/api/v1/expert/expert-findings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: sender.data,
          requestId: automaticData[0].requestId._id,
          patternFoundId: automaticData[0].patternFoundId._id,
          username: user.username,
        }),
      }
    )
  })
  survey.addNavigationItem({
    id: "sv-nav-clear-page",
    title: "Clear Page",
    action: () => {
      survey.currentPage.questions.forEach((question) => {
        question.value = undefined
      })
    },
    css: "nav-button",
    innerCss: "sd-btn nav-input",
  })
  useEffect(() => {
    if (!automaticData.length) {
      data()
    }
  }, [automaticData])
  return (
    <>
      <h2 className="text-center font-extrabold text-5xl mt-3">
        Automation Result
      </h2>
      <div className="/Users/saqeeahmed/Downloads/json.jsmt-10 flex gap-5 justify-center  p-12">
        {automaticData?.map((item) => (
          <Card
            style={{ width: 350 }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Link to={`item.requestId.websiteurl`} className="font-bold">
              {item?.requestId.websiteurl.substr(0, 30)}...
              <OpenInNewIcon />
            </Link>

            <Meta title="Found  pattern" className="mt-3 font-bold" />
            {item?.patternFoundId.result.map((r) => (
              <div className="flex gap-3">
                <p className="font-bold">Name</p>
                <p>
                  <span className="mb-2 mr-2 text-red-500"> {r?.name} </span>
                  <span className="font-bold text-black-500">
                    <span className="font-bold text-black-500">Count</span> :{" "}
                    <span className="mb-2 text-red-500"> {r?.value} </span>
                  </span>
                </p>
              </div>
            ))}
          </Card>
        ))}
      </div>
      <div>
        <h2 className="text-center font-extrabold text-5xl mt-2">
          Automation Text
        </h2>
      </div>
      <Card
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
        className="mb-3"
      >
        {automaticData?.map((item) => (
          <>
            {item?.patternFoundId.result.map((el) => (
              <p className="text-center text-xl">
                {el.name} <span>-</span>
                {el?.text}{" "}
              </p>
            ))}
          </>
        ))}
      </Card>
      <Survey model={survey} />
    </>
  )
}

export default UserOpinion
