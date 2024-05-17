import axios from 'axios';
import { useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import { useAppDispatch } from '../store/selfHook';
import { setMessage, setShowTimes } from '../store/toolShow';

export default function Axios() {

  const dispatch = useAppDispatch()

  useEffectOnce(() => {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  });

  useEffect(() => {
    axios.defaults.headers['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJhY2NvdW50XCI6XCIyODI0MDU3NTQ2QHFxLmNvbVwiLFwiY2xpZW50XCI6XCJQQ1wiLFwiaXNBdXRoXCI6dHJ1ZSxcInVzZXJJZFwiOjEwMTczNCxcInVzZXJuYW1lXCI6XCLpmL_ph4zlt7Tlt7TkuI7lm5vljYHlpKfnm5fnmoTniLHmg4XkubDljZZcIn0iLCJpc3MiOiJsYXp5YmVhciIsImV4cCI6MTcxNjUzNTM0OCwiaWF0IjoxNzE1OTMwNTQ4fQ.8ivzvx_eZbN1re4RGvy_LHq0Mg2Bpj4jOxXcEY6IrZE6DueQPQmmS-eLKRpWXlwsaE3sYr2Mg43Yjn_LWl_bPg';
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
