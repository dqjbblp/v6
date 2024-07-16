import Axios from "../../component/axios";
import SelfTool from "../../component/selfTooltip";
import ToolTip from "../../component/tooltip";
import TotalModal from "../../component/TotalModal";
import { useAppSelector } from "../../store/selfHook";
import useModalTool from "../../store/useModalStore";
import DiaLog from "../dialog";

const TotalComponent = () => {
  const show = useAppSelector((state) => state.dialog.dialogShow);

  const {show:show2} = useModalTool()

  return (
    <div>
      <SelfTool />
      <ToolTip />
      <Axios />
      {show2&&<TotalModal />}
      {
        show&&<DiaLog />
      }
    </div>
  );
};

export default TotalComponent;
