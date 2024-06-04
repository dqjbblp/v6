import { Button } from "antd";
import { useAppDispatch } from "../store/selfHook";
import { open } from "../store/toolShow";
import axios from "axios";
// usePointsRecordsQuery, useSupportTypes2Query 
import { useCouponListQuery} from "../api";
import InfiniteScrollIntersection from "../component/InfiniteScrollIntersection";

const Home = () => {
  const dispatch = useAppDispatch()

  const fetchData = () => {
    axios.get('/xstc-user/areaCode/list').then(res=>{
      console.log(res);
    })
    axios.get(`/user/support/document/typesLevel2`)
  }

  // const query = useSupportTypes2Query({
  //   id:1
  // })

  // const query2 = usePointsRecordsQuery({
  //   type:1
  // })

  const query3 = useCouponListQuery({
    status:1
  })

  

  return (
    <div style={{height:'800px',overflowY:'auto'}}>
      Home
      <Button onClick={()=>dispatch(open(true))}>show tool</Button>
      <Button onClick={fetchData}>axios</Button>
      {
        query3.data?.pages.map((item1,index1)=>{
          return item1.records.map((item2,index2)=>{
            return (
              <div key={index2}>
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
