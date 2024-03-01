import { useEffect, useState } from "react"
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { Link, Navigate, useNavigate } from "react-router-dom"
import "react-pro-sidebar/dist/css/styles.css"
import { tokens } from "../../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined"
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined"
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined"
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import DvrIcon from "@mui/icons-material/Dvr"
import SettingsIcon from "@mui/icons-material/Settings"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import { Logout } from "@mui/icons-material"
import { Button, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { userAdd } from "../../redux/features/userSlice"
import axios from "axios"
import RequestPageIcon from "@mui/icons-material/RequestPage"
import TaskIcon from "@mui/icons-material/Task"
import GroupsIcon from "@mui/icons-material/Groups"
import ReceiptIcon from "@mui/icons-material/Receipt"
import FeedbackIcon from "@mui/icons-material/Feedback"
import StarsIcon from "@mui/icons-material/Stars"
import NoteIcon from "@mui/icons-material/Note"
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <MenuItem
      active={title === selected}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const Sidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState("dashboard")
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate("/login")
    window.location.reload()
    localStorage.clear()
  }
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const fetchUserData = async () => {
    try {
      const res = await axios.post(
        "https://saqeeb-z91h.onrender.com/api/v1/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      dispatch(userAdd(res.data.data))
      if (res.data.success) {
        message.success(res.data.message)
      }
    } catch (error) {
      message.error("something went wrong")
    }
  }
  useEffect(() => {
    if (!user) {
      fetchUserData()
    }
    if (user?.isAdmin) {
      setIsCollapsed(true)
    }
  }, [user])

  return (
    <Box
      // overwrite react-pro-sidebar css
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "0px 25px 0px 12px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfd !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} width="230px">
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            icon={
              isCollapsed ? (
                <MenuOutlinedIcon
                  onClick={() => setIsCollapsed(!isCollapsed)}
                />
              ) : undefined
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {user?.isAdmin
                    ? "ADMIN"
                    : user?.isExpert
                    ? "EXPERT"
                    : "CUSTOMER"}
                </Typography>
                <IconButton>
                  <MenuOutlinedIcon
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="../../assets/user.jpeg"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          {user?.isExpert ? (
            <>
              <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                  title="Expert"
                  to="/expert"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Chat"
                  to="/expert-chat"
                  icon={<NoteIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </>
          ) : !user?.isAdmin ? (
            <>
              <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Data
                </Typography>
                <Item
                  title="Submit request"
                  to="/request"
                  icon={<ArrowUpwardIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Total Request"
                  to="/total-request"
                  icon={<RequestPageIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Result & Certificate"
                  to="/show-result"
                  icon={<NoteIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Support
                </Typography>
                <Item
                  title="Feedback Form"
                  to="/form"
                  icon={<FeedbackIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Calendar"
                  to="/calendar"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="FAQ Page"
                  to="/faq"
                  icon={<HelpOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Chat With Us"
                  to="/customer-chat"
                  icon={<WhatsAppIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </>
          ) : (
            <>
              <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                  title="Team"
                  to="/team"
                  icon={<GroupsIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Request List"
                  to="/request-list"
                  icon={<RequestPageIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Task Operation"
                  to="/task-operation"
                  icon={<TaskIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Invoices"
                  to="/admin-invoice"
                  icon={<ReceiptIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Calendar"
                  to="/calendar"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="FAQ Page"
                  to="/faq"
                  icon={<HelpOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Chat With Us"
                  to="/chat"
                  icon={<WhatsAppIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </>
          )}
        </Menu>

        <Button onClick={handleLogout}>Logout</Button>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar
