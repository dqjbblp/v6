import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useForm } from "react-hook-form"
import { z } from "zod"
import userNameStore from "../store/useUserStore"
import useSelfTool from "../store/useSelfTool"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const {setToken} = userNameStore()
  const { setDesc } = useSelfTool();
  const nav = useNavigate()

  const ver = z.object({
    token:z.string().min(1,'请输入token')
  })

  type valid = z.infer<typeof ver>

  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<valid>({
    resolver:zodResolver(ver)
  })

  const onsub = (data:valid) => {
    setToken(data.token)

    setDesc({
      type: "success",
      message: '设置成功',
    });
    nav('/')
  }

  return (
    <div>
      <form className={'ml-10 flex flex-col gap-5'}>
        <input {...register('token')} className={'outline-0 outline-dashed outline-[rgb(231,32,4)] focus:outline-2 w-[300px]'} placeholder="输入token" />

        {errors.token&&errors.token.message}

        <Button className={'w-fit'} onClick={handleSubmit(onsub)}>设置</Button>
      </form>
    </div>
  )
}

export default Login