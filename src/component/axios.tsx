import axios from "axios";
import { useEffect } from "react";
import { useEffectOnce } from "react-use";
import { useAppDispatch } from "../store/selfHook";
import { setMessage, setShowTimes } from "../store/toolShow";
import userNameStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

export default function Axios() {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { token } = userNameStore();

  useEffectOnce(() => {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
    axios.defaults.timeout = 10 * 1000;

    // 添加请求拦截器
    axios.interceptors.request.use(
      (config) => {
        if (axios.defaults.baseURL !== "http://192.168.1.71:10099/") {
          console.log("Not in the development environment, skipping API call.");
          // 取消请求
          return Promise.reject({
            message: "Not in the development environment",
          });
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  });

  useEffect(() => {
    axios.defaults.headers["Authorization"] = token || "";
  }, [token]);

  useEffect(() => {
    axios.defaults.headers["Accept-Language"] = "zh-CN" ?? null;
  }, []);

  useEffectOnce(() => {
    axios.interceptors.response.use(
      async (response) => {
        switch (response.status) {
          case 200: {
            if (response.data.success) {
              return Promise.resolve(response.data);
            } else {
              /*
               * 服务器返回非 Success
               * */
              switch (response.data.code) {
                /*
                 * Token 失效
                 * */
                case 4003: {
                  console.log("失效");
                  // nav('/login')
                  break;
                }
              }
              dispatch(setMessage(response.data.message));
              dispatch(setShowTimes());
              return Promise.reject(response.data);
            }
          }
          /*
           * Axios 异常
           * */
          default: {
            return Promise.reject(response.data);
          }
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  });

  return null;
}
