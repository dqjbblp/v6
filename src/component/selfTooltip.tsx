import { useDeferredValue, useEffect, useState } from "react";
import useSelfTool, { IToast } from "../store/useSelfTool";
import _ from 'lodash';

const SelfTool = () => {
  const { desc,setDesc } = useSelfTool();
  const [toasts, setToasts] = useState<IToast[]>([]);
  const toastsDeferred = useDeferredValue(toasts);

  useEffect(() => {
    if (!desc) return;
    
    if (_.isEqual(_.last(toasts), desc)) return;

    /*
     * 添加到尾部
     * */
    setToasts((x) => _.concat(x, desc));
    
    setDesc(undefined);
    /*
     * 2 秒后移除刚才添加的 Toast
     * */
    _.delay(() => {
      setToasts((x) => _.tail(x));
    }, 2 * 1000);
  }, [setDesc, desc, toasts]);

  return (
    <div
      className={`fixed ${
        toastsDeferred.length > 0 ? "top-0" : "-top-10"
      }  right-1/2 translate-x-1/2 transform transition-all duration-500 flex flex-col gap-4 father`}
    >
      {toastsDeferred.map((item, index) => {
        return (
          <div
            key={index}
            className={`${toastsDeferred ? "bg-bg" : " bg-transparent"} w-64 h-8 border rounded-2xl text-center my${index}`}
          >
            {item.message}
          </div>
        );
      })}
    </div>
  );
};

export default SelfTool;
