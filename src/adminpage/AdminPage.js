import Publist from "./components/Publist"
import { AdminPageWrapper } from "./components/AdminSection"

const AdminPage = () => {

  return (
    <AdminPageWrapper content={<Publist />} />
  )
}

export default AdminPage