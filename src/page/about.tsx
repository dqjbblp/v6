import { Button } from "antd";
import { useAppDispatch } from "../store/selfHook";
import { open, setPlace } from "../store/toolShow";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import svvg from "../assets/vite.svg"
import { openDia } from "../store/dialog";

const About = () => {
  const dispatch = useAppDispatch();

  const openTool = () => {
    dispatch(setPlace("bottom"));
    dispatch(open(true));
  };

  const handleLoginSuccess = (response: CredentialResponse) => {
    console.log("Login Success:", response);
    // 在这里处理登录成功后的操作，比如获取用户信息，存储 token 等。
  };

  const handleLoginFailure = () => {
    console.log("Login Failed");
    // 在这里处理登录失败后的操作。
  };

  const testDialog = () => {
    dispatch(openDia({
      title:'测试',
      desc:'我是about页面'
    }))
  }

  return (
    <div>
      About
      {/* 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 */}
      <Button onClick={openTool}>底部触发tool</Button>
      <div style={{ opacity: 1 }}>
        <GoogleLogin
          width={40}
          shape={"circle"}
          login_uri={svvg}
          logo_alignment={"center"}
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
      <Button onClick={testDialog}>测试dialog</Button>
    </div>
  );
};

export default About;
