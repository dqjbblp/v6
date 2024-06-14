import { Controller, useForm } from "react-hook-form";
import "./zod.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button } from "antd";

const ZodStudy = () => {
  const ver = z.object({
    num: z.string().nonempty("请输入"),
    num2: z.coerce
    .number()
    .refine((val) => val >= 100, {
      message: "不能小于100",
    })
    .refine((val)=>{
      if(val>1000){
        return false
      }else{
        return true
      }
    }, '不能大于1000'),
    email: z.coerce.string().email('非法邮箱'),
  });
  type Valid = z.infer<typeof ver>;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Valid>({
    resolver: zodResolver(ver),
  });

  useEffect(() => {
    errors && console.log(errors);
  }, [errors]);

  const totalInfo = (data: Valid) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(totalInfo)}>
      <input {...register("num")} />
      {errors.num?.message&&<div>{errors.num?.message}</div>}
      <input {...register("num2")}/>
      <Controller 
        control={control}
        name={'email'}
        render={({field})=>{
          return (
            <input type={'email'} onChange={(e:any)=>{
              field.onChange(e)
            }} />
          )
        }}
      />
      <Button htmlType={'submit'}>提交</Button>
    </form>
  );
};

export default ZodStudy;
