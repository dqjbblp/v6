import { Outlet } from "react-router-dom"

const Sw1 = () => {
  return (
    <div>
      路由守卫1
      <Outlet />
    </div>
  )
}

export default Sw1