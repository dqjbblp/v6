import { Route, Routes } from "react-router-dom";
import About from "../page/about";
import Music from "../page/music";
import Profile from "../page/profile";
import EChartComponent from "../page/chart";
import Phantom from "../page/phantom";
import ZodStudy from "../page/zod";
import AntdCom from "../page/antdCom";
import Sw1 from "../page/sw1";
import Sw2 from "../page/sw2";
import { ReactNode, Suspense } from "react";
import Sign from "../page/canvas";
import Mise from "../page/ProMise";
import Ani from "../page/ani";
import React from "react";
import Login from "../page/login";
import Socket from "../page/socket";
import Wzq from "../page/wzq";
import Gsap from "../page/gsap";
import Gsap2 from "../page/gsap2";

const Home = React.lazy(() => import("../page/home"));

const SelfRouter = () => {
  const routeT = [
    {
      path: "/sw1",
      component: <Sw1 />,
      children: [
        {
          path: "sw1son",
          component: <div>sw1son</div>,
        },
      ],
    },
    {
      path: "/sw2",
      component: <Sw2 />,
      children: [
        {
          path: "sw2son1",
          component: <div>sw2son1</div>,
        },
        {
          path: "sw2son2",
          component: <div>sw2son2</div>,
        },
      ],
    },
    {
      path: "/login",
      component: <Login />,
    },
    {
      path: "socket",
      component: <Socket />,
    },
    {
      path: "wzq",
      component: <Wzq />,
    },
    {
      path: "gsap",
      component: <Gsap />,
    },
    {
      path: "gsap2",
      component: <Gsap2 />,
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
        >
          {item.children && RouteMap(item.children)}
        </Route>
      );
    });

  return (
    <Suspense fallback={<div>加载中...</div>}>
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
        </Route>
        <Route path="canvas" element={<Sign />} />
        <Route path="mise" element={<Mise />} />
        <Route path="ani" element={<Ani />} />
        {RouteMap(routeT)}
      </Routes>
    </Suspense>
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
