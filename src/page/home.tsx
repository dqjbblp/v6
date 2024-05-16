import { Button } from "antd";
import { useAppDispatch } from "../store/selfHook";
import { open } from "../store/toolShow";
import axios from "axios";

const Home = () => {
  const dispatch = useAppDispatch()

  const fetchData = () => {
    axios.get('/xstc-user/areaCode/list').then(res=>{
      console.log(res);
    })
    axios.get(`/user/support/document/typesLevel2`)
  }

  return (
    <div>
      Home
      <Button onClick={()=>dispatch(open(true))}>show tool</Button>
      <Button onClick={fetchData}>axios</Button>
    </div>
  );
};

export default Home;
