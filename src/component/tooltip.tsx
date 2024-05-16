import {notification } from "antd";
import type { NotificationArgsProps } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/selfHook";
import { open, setMessage, setPlace } from "../store/toolShow";
type NotificationPlacement = NotificationArgsProps["placement"];

const ToolTip = () => {

  const message = useAppSelector(state=>state.tool.message)
  const place = useAppSelector(state=>state.tool.place)
  const dispatch = useAppDispatch()

  const Context = React.createContext({ name: "Default" });
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
      onClose:()=>{
        dispatch(open(false))
        dispatch(setPlace('topRight'))
        dispatch(setMessage(''))
      },
      duration:1
    });
  };


  useEffect(()=>{
    message&&openNotification(place)
  },[place,message])

  const contextValue = {name: message };
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
    </Context.Provider>
  );
};

export default ToolTip;
