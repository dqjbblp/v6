import { Button } from "antd"
import useModalTool from "../store/useModalStore"

const TotalModal = () => {

  const {setShow} = useModalTool()

  return (
    <div className={'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-bg3 flex-col flex items-center justify-between'}>
      <div>这是一个全局的弹窗</div>
      <Button onClick={()=>setShow(false)}>关闭弹窗</Button>
    </div>
  )
}

export default TotalModal