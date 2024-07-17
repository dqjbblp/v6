import { Button } from "antd";
import { useAppDispatch } from "../store/selfHook";
import { open } from "../store/toolShow";
import axios from "axios";
// usePointsRecordsQuery, useSupportTypes2Query 
import { useCouponListQuery} from "../api";
import InfiniteScrollIntersection from "../component/InfiniteScrollIntersection";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import userNameStore from "../store/useUserStore";

const Home = () => {
  const dispatch = useAppDispatch()

  const {userName,age} = userNameStore()

  const [theme,setTheme] = useLocalStorage('modal','')

  const fetchData = () => {
    axios.get('/xstc-user/areaCode/list').then(res=>{
      console.log(res);
    })
    axios.get(`/user/support/document/typesLevel2`)
  }

  const query3 = useCouponListQuery({
    status:2
  })

  useEffect(()=>{
    const root = document.documentElement;
    root.classList.add(Number(theme?.length)>0?theme??'light':'light');
  },[theme])

  const setDark = () => {
    const root = document.documentElement;
    if(theme==='dark'){
      root.classList.remove('dark');
      setTheme('light')
    }else{
      root.classList.remove('light');
      root.classList.add('dark');
      setTheme('dark')
    }
  }
  

  return (
    <div style={{height:'800px',overflowY:'auto'}}>
      <div className={"text-text3"}>Home</div>
      <Button onClick={()=>dispatch(open(true))}>show tool</Button>
      <Button onClick={fetchData}>axios</Button>
      <Button onClick={setDark}>dark</Button>
      <div>测试新的状态管理器:{userName + age}</div>
      {
        query3.data?.pages.map((item1,index1)=>{
          return item1.records.map((item2,index2)=>{
            return (
              <div className={'flex bg-bg'} key={index2}>
                {item2.amount}---{index1*20+index2+1}
              </div>
            )
          })
        })
      }
      <InfiniteScrollIntersection queryResult={query3} />
    </div>
  );
};

export default Home;
