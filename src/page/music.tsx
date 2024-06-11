import { Button } from "antd";
import useSelfTool from "../store/useSelfTool";
import { useState } from "react";

const Music = () => {
  const { setDesc } = useSelfTool();
	const [count,setCount] = useState(0)

  return (
    <div>
      <Button
        onClick={() => {
					setCount((count)=>count+=1)
          setDesc({
            type: "success",
            message: count,
          });
        }}
      >
        自己的轻提示
      </Button>
      <Button
        onClick={() =>
          setDesc({
            type: "success",
            message: "456",
          })
        }
      >
        自己的轻提示2
      </Button>
    </div>
  );
};

export default Music;
