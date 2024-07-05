import { Button } from "antd";
import { useAppDispatch } from "../store/selfHook";
import { open, setMessage, setPlace, setShowTimes } from "../store/toolShow";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import svvg from "../assets/vite.svg";
import { openDia } from "../store/dialog";
import { useDropArea } from "react-use";
import { useState } from "react";
import userNameStore from "../store/useUserStore";
import { Outlet } from "react-router-dom";

const About = () => {
  const dispatch = useAppDispatch();

  const {setName,setAge,age} = userNameStore()

  const [url, setUrl] = useState<any>();

  const [bond] = useDropArea({
    onFiles: (files) => {
      if (files?.[0]) {
        next(files?.[0]);
      }
    },
  });

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
    dispatch(
      openDia({
        title: "测试",
        desc: "我是about页面",
      })
    );
  };

  const next = (file: File) => {
    if (file) {
      if (file.size >  1024) {
        dispatch(setMessage('图片过大'))
        dispatch(setShowTimes())
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setUrl(e.target?.result);
      };
    }
  };

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
      <br />
      <label>
        <input
          accept={"image/jpeg,image/png"}
          className={"hidden"}
          style={{ display: "none" }}
          type="file"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              next(e.target.files?.[0]);
            }
          }}
        />
        <div
          {...bond}
          style={{
            width: url?'fit-content':200,
            height: url?'fit-content':200,
            border: "1px dashed #999999",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor:'pointer'
          }}
        >
          {
            !url&&'上传文件(可将文件拖拽至此上传~)'
          }
          {
            url&&<img src={url} />
          }
        </div>
      </label>
        <div>
          <Button onClick={()=>setName('dqj')} >修改名称</Button>
          <Button onClick={()=>setAge(age+1)}>年龄加1</Button>
        </div>

      <Outlet />
    </div>
  );
};

export default About;
