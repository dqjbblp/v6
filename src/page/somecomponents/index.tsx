import Axios from "../../component/axios";
import SelfTool from "../../component/selfTooltip";
import ToolTip from "../../component/tooltip";
import { useAppSelector } from "../../store/selfHook";
import DiaLog from "../dialog";

const TotalComponent = () => {
  const show = useAppSelector((state) => state.dialog.dialogShow);
  return (
    <div>
      <SelfTool />
      <ToolTip />
      <Axios />
      {
        show&&<DiaLog />
      }
    </div>
  );
};

export default TotalComponent;
