import axios from 'axios';
import { useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import { useAppDispatch } from '../store/selfHook';
import { setMessage } from '../store/toolShow';

export default function Axios() {

  const dispatch = useAppDispatch()

  useEffectOnce(() => {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  });

  useEffect(() => {
    axios.defaults.headers['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJhY2NvdW50XCI6XCJoeWlzYWxscGVvcGxlQGdtYWlsLmNvbVwiLFwiY2xpZW50XCI6XCJQQ1wiLFwiaXNBdXRoXCI6dHJ1ZSxcInVzZXJJZFwiOjEwMTczOCxcInVzZXJuYW1lXCI6XCJlKioqKioqXCJ9IiwiaXNzIjoibGF6eWJlYXIiLCJleHAiOjE3MTU5MTQ3NjgsImlhdCI6MTcxNTMwOTk2OH0.rUsMRbuvwiJwtHS8AUC_xVxbB9o6hwRmWnTo5azOZsztMvqfPKk1XTUgJOoDDnIZ_NAkZXdQ2HLNWjSmB2AspQ';
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
