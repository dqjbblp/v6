import { forwardRef, useImperativeHandle } from "react"

export interface IRef {
  sonevent: () => void
}

const Son = forwardRef<IRef>((_,ref) => {

  const sonevent = () => {
    console.log('我是子组件');
  }


  useImperativeHandle(ref,()=>({
    sonevent
  }),[])

  return (
    <div>
      Son 组件
    </div>
  )
})

export default Son