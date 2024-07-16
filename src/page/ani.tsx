import { Button } from "antd";
import useModalTool from "../store/useModalStore";

const Ani = () => {

  const {setShow} = useModalTool()

  const rangeChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.value);
    
  }



  return (
    <div>
      <div
        className={
          "text-base max-w-[600px] h-[200px] text-center bg-[rgba(245,69,74,0.5)] group"
        }
      >
        <div className={"text-base h-[60px] flex items-center justify-center bg-orange-800"}>
          我是题目头啦
        </div>
        <div className={'-translate-y-[60px] opacity-0 transition-transform group-hover:translate-y-0 group-hover:opacity-100'}>
          阿斯顿发阿斯顿发斯蒂芬阿斯蒂芬就开了暗黑风拉屎东方红阿是雷锋精神都返回阿萨法久啊是客户都发了阿斯蒂芬是的九里峰景扎西德勒费脑子蓄电池MV你等哈国际色卡发还是觉得号发生法撒旦
        </div>
      </div>

      <label>
        <div className={'w-[200px] h-2.5 rounded-xl bg-orange-600'} />
        <input max={100} step={1} min={0} onChange={rangeChange} type={'range'} />
      </label>
      <Button onClick={()=>setShow(true)}>打开全局弹窗</Button>
    </div>
  );
};

export default Ani;
