import React, { useMemo } from 'react';
import { Button, Divider, InputNumber, notification, Space, Switch } from 'antd';
import { Outlet, useParams } from 'react-router-dom';

const Context = React.createContext({ name: 'Default' });

const AntdCom: React.FC = () => {
  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(3);
  const [api, contextHolder] = notification.useNotification({
    stack: enabled
      ? {
          threshold,
        }
      : false,
  });

  const {id} = useParams()
  console.log(id);
  

  const openNotification = () => {
    api.open({
      message: 'Notification Title',
      description: `${Array(Math.round(Math.random() * 5) + 1)
        .fill('This is the content of the notification.')
        .join('\n')}`,
      duration: 3,
    });
  };

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div>
        <Space size="large">
          <Space style={{ width: '100%' }}>
            <span>Enabled: </span>
            <Switch checked={enabled} onChange={(v) => setEnabled(v)} />
          </Space>
          <Space style={{ width: '100%' }}>
            <span>Threshold: </span>
            <InputNumber
              disabled={!enabled}
              value={threshold}
              step={1}
              min={1}
              max={10}
              onChange={(v) => setThreshold(v || 0)}
            />
          </Space>
        </Space>
        <Divider />
        <Button type="primary" onClick={openNotification}>
          Open the notification box
        </Button>

        <Outlet />
      </div>
    </Context.Provider>
  );
};

export default AntdCom;