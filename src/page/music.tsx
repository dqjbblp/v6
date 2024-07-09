import { Button } from "antd";
import useSelfTool from "../store/useSelfTool";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropArea } from "react-use";
import CanSeeMusic from "../component/canseeMusic";

const Music = () => {
  const { setDesc } = useSelfTool();
  const [url, setUrl] = useState<any>();
  const [count, setCount] = useState(0);

  const ver = z.object({
    num1:z.string().trim().optional(),
    num2:z.string().trim().optional()
  }).refine((data) => data.num1 || data.num2, {
    path: ['num1'],
    message: '请输入至少一个'
  });
  type Valid = z.infer<typeof ver>;
  const {
    register,
    watch,
    handleSubmit,
    formState:{errors}
  } = useForm<Valid>({
    resolver: zodResolver(ver),
    defaultValues: {
      num1: '1234'
    }
  });

  const next = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setUrl(e.target?.result);
      };
    }
  };

  const [bond] = useDropArea({
    onFiles: (files) => {
      if (files?.[0]) {
        next(files[0])
      }
    },
  });
  

  const totalInfo = (data: Valid) => {
    console.log(data);
  };

  //监听num1的变化
  const num1 = watch('num1')



  return (
    <div>
      <Button
        onClick={() => {
          setCount((count) => (count += 1));
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
      <form>
        <div style={{display:'flex',flexDirection:'column',gap:16,maxWidth:300,marginTop:20}}>
          <div>
            <input {...register('num1')} placeholder="..."  />--{num1?.length ?? 0}
            {errors.num1&&errors.num1.message}
          </div>
          <div>
            <input {...register('num2')} placeholder="...2"  />
            {errors.num1&&errors.num1.message}
          </div>
          <label {...bond} style={{width:200,height:200,border:'1px solid #cccccc',borderRadius:8}}>
            <input onChange={(e)=>{
              if(e.target.files){
                next(e.target.files[0]);
              }
            }} hidden type="file" />
            {url&&<img src={url} />}
          </label>
        </div>

        <Button onClick={handleSubmit(totalInfo)} htmlType={"submit"}>提交</Button>
      </form>
      <CanSeeMusic />
    </div>
  );
};

export default Music;
