import { Controller, useForm } from "react-hook-form";
import "./zod.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { useDropArea } from "react-use";

const ZodStudy = () => {
  const [url, setUrl] = useState<any>();

  const ver = z
    .object({
      // num: z.string().nonempty("请输入"),
      num: z.string().min(1, "请输入"),
      num2: z.coerce
        .number()
        .refine((val) => val >= 100, {
          message: "不能小于100",
        })
        .refine((val) => {
          if (val > 1000) {
            return false;
          } else {
            return true;
          }
        }, "不能大于1000"),
      email: z.coerce.string().email("非法邮箱"),
      // chartImages: z
      //   .array(z.instanceof(File), { required_error: "至少一个" })
      //   .min(1, "至少一个"),
      chartImages: z.instanceof(File, {
        message: "请上传证件照",
      }),
    })
    // .refine((data) => {
    //   console.log(data);
    //   这里就是验证的全部数据
    // });
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

  const [bond] = useDropArea({
    onFiles: (files) => {
      if (files?.[0]) {
        next(files?.[0]);
      }
    },
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

  return (
    <form>
      <input {...register("num")} />
      {errors.num?.message && <div>{errors.num?.message}</div>}
      <input {...register("num2")} />
      <Controller
        control={control}
        name={"email"}
        render={({ field }) => {
          return (
            <input
              type={"email"}
              onChange={(e: any) => {
                field.onChange(e);
              }}
            />
          );
        }}
      />

      <label
        {...bond}
        style={{
          width: url ? "fit-content" : 200,
          height: url ? "fit-content" : 200,
          border: "1px dashed #999999",
          borderRadius: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <Controller
          control={control}
          name={"chartImages"}
          render={({ field }) => {
            return (
              <>
                <input
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files) {
                      field.onChange(e.target.files[0])
                      next(e.target.files[0]);
                    }
                  }}
                  type="file"
                />
                {!url && "上传文件(可将文件拖拽至此上传~)"}
                {url && <img src={url} style={{ width: 200, height: 200 }} />}
                <Button
                  onClick={() => {
                    setUrl("");
                    field.onChange(url)
                  }}
                  style={{ position: "absolute", right: "0%", top: "0%" }}
                >
                  清除图片
                </Button>
              </>
            );
          }}
        />
      </label>

      {errors.chartImages && errors.chartImages.message}
      <Button onClick={handleSubmit(totalInfo)} htmlType={"submit"}>提交</Button>
    </form>
  );
};

export default ZodStudy;
