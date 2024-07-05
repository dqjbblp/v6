import axios from 'axios';
import { useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import { useAppDispatch } from '../store/selfHook';
import { setMessage, setShowTimes } from '../store/toolShow';

export default function Axios() {

  const dispatch = useAppDispatch()

  useEffectOnce(() => {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
    axios.defaults.timeout = 10 * 1000;
  });

  useEffect(() => {
    // axios.defaults.headers['Authorization'] = JSON.parse(localStorage.getItem('x-store-user') as string).state.accessToken
    axios.defaults.headers['Authorization']='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJhY2NvdW50XCI6XCIyODI0MDU3NTQ2QHFxLmNvbVwiLFwiY2xpZW50XCI6XCJBUFBcIixcImlzQXV0aFwiOnRydWUsXCJ1c2VySWRcIjoxMDE2NDEsXCJ1c2VybmFtZVwiOlwiNTU1XCJ9IiwiaXNzIjoibGF6eWJlYXIiLCJleHAiOjE3MjA0MjM0NDQsImlhdCI6MTcxOTgxODY0NH0.rzMgOhaIjhTQl5rfkVpjRP3EVm2PeCS0WhVRTFkjt9DMOI1ven3n2QAhjtPYihYNLPP7GKoJBWTFT80r4kKGrg'
  }, []);

  useEffect(() => {
    axios.defaults.headers['Accept-Language'] = 'zh-CN' ?? null;
  }, []);

  useEffectOnce(() => {
    axios.interceptors.response.use(async (response) => {
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
                console.log('失效');
                
              }
            }
            dispatch(setMessage(response.data.message))
            dispatch(setShowTimes())
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
    });
    
  });


  return null;
}
