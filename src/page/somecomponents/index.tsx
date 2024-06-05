import Axios from "../../component/axios";
import ToolTip from "../../component/tooltip";
import { useAppSelector } from "../../store/selfHook";
import DiaLog from "../dialog";

const TotalComponent = () => {
  const show = useAppSelector((state) => state.dialog.dialogShow);
  return (
    <div>
      <ToolTip />
      <Axios />
      {
        show&&<DiaLog />
      }
    </div>
  );
};

export default TotalComponent;
