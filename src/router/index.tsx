import { Route, Routes } from "react-router-dom";
import Home from "../page/home";
import About from "../page/about";
import Music from "../page/music";
import Profile from "../page/profile";
import EChartComponent from "../page/chart";
import Phantom from "../page/phantom";
import ZodStudy from "../page/zod";
import AntdCom from "../page/antdCom";
import Sw1 from "../page/sw1";
import Sw2 from "../page/sw2";
import { ReactNode } from "react";
import Sign from "../page/canvas";

const SelfRouter = () => {
  const routeT = [
    {
      path: "/sw1",
      component: <Sw1 />,
    },
    {
      path: "/sw2",
      component: <Sw2 />,
    },
  ];

  const RouteMap = (routeList: any): ReactNode =>
    routeList.map((item: any, index: number) => {
      return (
        <Route
          key={index}
          path={item.path}
          element={
            item.component && <Ruler show={index > 0}>{item.component}</Ruler>
          }
        ></Route>
      );
    });

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />}>
        <Route path="detail" element={<div>123</div>} />
      </Route>
      <Route path="music" element={<Music />} />
      <Route path="profile" element={<Profile />} />
      <Route path="chart" element={<EChartComponent />} />
      <Route path="phantom" element={<Phantom />} />
      <Route path="zod" element={<ZodStudy />} />
      <Route path="antd" element={<AntdCom />}>
        <Route path=":id" element={<div>antd的子组件</div>} />
      </ Route>
      <Route path='canvas' element={<Sign />} />
      {RouteMap(routeT)}
    </Routes>
  );
};

export default SelfRouter;

const Ruler = (props: { children: ReactNode; show: boolean }) => {
  if (props.show) {
    return props.children;
  } else {
    return "错误啦";
  }
};
