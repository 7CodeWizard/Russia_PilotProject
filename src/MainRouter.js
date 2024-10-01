import { Route, Routes } from "react-router-dom"
import AdminPage from "./adminpage/AdminPage"
import NewPub from "./adminpage/components/NewPub"


const MainRouter = () => {
  return (
    <Routes>
      <Route exact path="/admin" Component={AdminPage} />
    </Routes>
  )
}

export default MainRouter