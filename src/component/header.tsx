import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate()

  return (
    <div style={{ width: "100%", backgroundColor: "pink", height: 60,display:'flex',alignItems:'center' }}>
      公共头部
      <Button onClick={()=>nav('')}>回主页</Button>
      <Button onClick={()=>nav('about')}>去about</Button>
    </div>
  );
};

export default Header;
