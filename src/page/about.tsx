import { Button } from "antd";
import { useAppDispatch } from "../store/selfHook";
import { open, setPlace } from "../store/toolShow";

const About = () => {
  const dispatch = useAppDispatch()

  const openTool = () => {
    dispatch(setPlace('bottom'))
    dispatch(open(true))
  }

  return (
    <div>
      About
      <Button onClick={openTool}>底部触发tool</Button>
    </div>
  );
};

export default About;
