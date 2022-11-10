import SignFile from "./components/Sign"
import {
  Route,
  Routes,
  // Navigate,
  // useLocation
} from "react-router-dom"
import Login from "./pages/Login"
import Overview from "./pages/Overview"
import Sign from "./pages/Sign"
import History from "./pages/History"
import Layout from "./components/Layout/Layout"
function App() {

  return (
    // <div className="App">
    //   <h1>步驟一</h1>
    //   <h3>繪製簽名檔</h3>
    //   <SignFile></SignFile>
    // </div>
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Layout>
  )
}

export default App
