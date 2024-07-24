import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "pink",
        height: 60,
        display: "flex",
        alignItems: "center",
      }}
    >
      公共头部
      <Button onClick={() => nav("")}>回主页</Button>
      <Button onClick={() => nav("about")}>去about</Button>
      <Button onClick={() => nav("music")}>去Music</Button>
      <Button onClick={() => nav("sw2")}>去sw2</Button>
      <Button onClick={() => nav("sw1")}>去sw1</Button>
      <Button onClick={() => nav("zod")}>zod</Button>
      <Button onClick={() => nav("canvas")}>canvas</Button>
      <Button onClick={() => nav("ani")}>ani</Button>
    </div>
  );
};

export default Header;
