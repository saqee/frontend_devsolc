import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import { mockTransactions } from "../../data/mockData"
import useMediaQuery from "@mui/material/useMediaQuery"
import EmailIcon from "@mui/icons-material/Email"
import PointOfSaleIcon from "@mui/icons-material/PointOfSale"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import TrafficIcon from "@mui/icons-material/Traffic"
import LineChart from "../../components/LineChart"
import BarChart from "../../components/BarChart"
import GeographyChart from "../../components/GeographyChart"
import StatBox from "../../components/StatBox"
import ProgressCircle from "../../components/ProgressCircle"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import "../../index.css"
const Dashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNonMobile = useMediaQuery("(min-width: 1000px)")

  return (
    <Box
      m="-60px 20px 0 20px"
      sx={{
        transform: isNonMobile ? "scale(1, 0.85)" : "scale(1, 0.9)",
      }}
    >
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      {/* GRID & CHART */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 box-key section */}
        <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="text-5xl bg-gradient-to-r from-green-300 to-blue-500"
          sx={{}}
        >
          <StatBox
            title="31"
            subtitle=" Requested Site"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{
                  color: "white",
                  fontSize: "30px",
                }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="text-5xl bg-gradient-to-r from-green-300 to-blue-500"
        >
          <StatBox
            title="25"
            subtitle="Status of the current request"
            progress="0.5"
            increase="+21%"
            icon={
              <RotateLeftIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="text-5x bg-gradient-to-r from-green-300 to-blue-500"
        >
          <StatBox
            title="32,441"
            subtitle="Estimated time to Complete"
            progress="0.30 "
            increase="+5%"
            icon={
              <AccessTimeIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={isNonMobile ? "span 6" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          className="text-5xl bg-gradient-to-r from-green-300 to-blue-500"
        >
          <Typography variant="h5" fontWeight="600">
            Work Status
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              Current working status shows result will be on time
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>

        {/*         
        <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ p: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}

        {/*  */}
        <Box
          gridColumn={isNonMobile ? "span 6" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          className="text-5xl bg-gradient-to-r from-green-300 to-blue-500"
        >
          <Typography variant="h5" fontWeight="600">
            View Expert Findings
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="35px"
          >
            <ProgressCircle size="125" />
          </Box>
        </Box>

        {/*  */}
      </Box>
    </Box>
  )
}

export default Dashboard
