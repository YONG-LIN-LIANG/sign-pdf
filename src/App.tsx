import { Provider as JotaiProvider } from "jotai"
import Dialog from "@/components/layout/Dialog"
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import Login from "./pages/Login"
import Overview from "./pages/Overview"
import Sign from "./pages/Sign"
import History from "./pages/History"
import Layout from "./components/layout/Layout"


function App() {

  return (
    <JotaiProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/history" element={<History />} />
        </Routes>
        <Dialog />
      </Layout>
    </JotaiProvider>
  )
}

export default App
