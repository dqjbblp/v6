import { useContext, useEffect } from "react"
import { MuContext } from "../App";
import { Outlet } from "react-router-dom";

const Sw2 = () => {

  const aaa = useContext(MuContext)
  useEffect(()=>{
    console.log(aaa.count);
  },[aaa])
  

  return (
    <div>
      路由守卫2
      <Outlet />
    </div>
  )
}

export default Sw2