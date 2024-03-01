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

const Dashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNonMobile = useMediaQuery("(min-width: 1000px)")

  return (
    <Box
      m="60px 20px 0 20px"
      sx={{
        transform: isNonMobile ? "scale(1, 0.85)" : "scale(1, 0.9)",
      }}
    >
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard panel" />

      {/* GRID & CHART */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn={isNonMobile ? "span 6" : "span 12"}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          className="bg-gradient-to-r from-green-400 to-blue-500 max-w-96 col-span-2"
        >
          <Typography variant="h5" fontWeight="800">
            Work Status
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography variant="h5" sx={{ mt: "15px" }}></Typography>
            <Typography>
              {" "}
              Current working status shows result will be on time
            </Typography>
          </Box>
        </Box>

        <Box
          gridColumn={isNonMobile ? "span 6" : "span 12"}
          gridRow="span 2"
          className="bg-gradient-to-r from-green-400 to-blue-500 max-w-96 col-span-2"
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            View certificate
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
      </Box>
    </Box>
  )
}

export default Dashboard
