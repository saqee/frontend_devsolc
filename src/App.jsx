import { ColorModeContext, useMode } from "./theme"
//CssBaseline reset css to default.
//ThemeProvider pass the theme to material UI.
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./scenes/global/Sidebar"
import Dashboard from "./scenes/dashboard"
import CustomerChat from "./scenes/chat/index"
import Contacts from "./scenes/contacts"
import Invoices from "./scenes/invoices"
import Form from "./scenes/form"
import Calendar from "./scenes/calendar"
import FAQ from "./scenes/faq"
import Request from "./scenes/submitRequest"

import UserProfile from "./components/UserProfile"
import UserSign from "./scenes/SignIn&Up/UserSign"
import { useSelector } from "react-redux"
import PublicRoute from "./components/PublicRoute"
import PrivateRoute from "./components/PrivateRoute"
import PrivateRouteAdmin from "./components/PrivateRouteAdmin"
import AdminDashboard from "./scenes/adminDashboard"
import Team from "./scenes/team"
import AdminRequestList from "./scenes/adminRequestList"
import ProfileForm from "./scenes/profileForm"
import AdminInvoices from "./scenes/adminInvoices"
import TaskOperation from "./scenes/taskOperation"
//import UserOpinion from "./scenes/expert/UserOpinion"
import UserRequestList from "./scenes/userRequestList"
import PrivateRouteExpert from "./components/PrivateRouteExpert"
import UserOpinion from "./scenes/expert2/UserOpinion"
import ShowResult from "./scenes/ShowResult"
//import Welcome from "./chat/Components/Welcome"
import Welcome from "./chat/Pages/Users"
import Chat from "./chat/Pages/Chat"
import ExpertDashboard from "./scenes/expertDashboard"
import CustomerDashboard from "./scenes/customerDashboard"
import ExpertDocumentation from "./scenes/expertDocumentation/expertDocumentation"
function App() {
  const [theme, colorMode] = useMode()
  const { loading } = useSelector((state) => state.alert)
  const abc = localStorage.getItem("token")
  const { user } = useSelector((state) => state.user)
  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {window.location.pathname == "/login" ? <UserSign /> : <Sidebar />}
            <main className="content">
              <Routes>
                <Route path="/expert-dashboard" element={<ExpertDashboard />} />
                <Route
                  path="/customer-dashboard"
                  element={<CustomerDashboard />}
                />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/form" element={<Form />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/show-result" element={<ShowResult />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/request" element={<Request />} />
                <Route path="/customer-chat" element={<CustomerChat />} />
                <Route path="/total-request" element={<UserRequestList />} />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <UserSign />
                    </PublicRoute>
                  }
                />
                <Route path="/expert" element={<UserOpinion />} />
                <Route
                  path="/expert-chat"
                  element={
                    <PrivateRouteExpert>
                      <Welcome user={user} />{" "}
                    </PrivateRouteExpert>
                  }
                />
                <Route
                  path="/expert-doc"
                  element={
                    <PrivateRouteExpert>
                      <ExpertDocumentation />{" "}
                    </PrivateRouteExpert>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <PrivateRouteExpert>
                      <Chat />{" "}
                    </PrivateRouteExpert>
                  }
                />
                <Route path="/users" element={<Welcome />} />
                {/*  <Route path="/expert-chat" element={<Welcome />} /> */}
                <Route
                  path="/admin-dashboard"
                  element={
                    <PrivateRouteAdmin>
                      <AdminDashboard />
                    </PrivateRouteAdmin>
                  }
                />
                <Route
                  path="/team"
                  element={
                    <PrivateRouteAdmin>
                      <Team />
                    </PrivateRouteAdmin>
                  }
                />{" "}
                <Route
                  path="/request-list"
                  element={
                    <PrivateRouteAdmin>
                      <AdminRequestList />
                    </PrivateRouteAdmin>
                  }
                />{" "}
                <Route
                  path="/profile-form"
                  element={
                    <PrivateRouteAdmin>
                      <ProfileForm />
                    </PrivateRouteAdmin>
                  }
                />
                <Route
                  path="/admin-invoice"
                  element={
                    <PrivateRouteAdmin>
                      <AdminInvoices />
                    </PrivateRouteAdmin>
                  }
                />
                <Route
                  path="/task-operation"
                  element={
                    <PrivateRouteAdmin>
                      <TaskOperation />
                    </PrivateRouteAdmin>
                  }
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  )
}

export default App
