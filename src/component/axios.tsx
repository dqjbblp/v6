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
    axios.defaults.headers['Authorization'] = JSON.parse(localStorage.getItem('x-store-user') as string).state.accessToken
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
