import { Button } from "antd"
import { useCallback, useEffect, useState } from "react";
import getProvider from "../utils/getProvider";
import { PublicKey } from "@solana/web3.js";
import { TLog } from "../types";

const Phantom = () => {
  const [logs, setLogs] = useState<TLog[]>([]);


  const createLog = useCallback(
    (log: TLog) => {
      return setLogs((logs) => [...logs, log]);
    },
    [setLogs]
  );

  const provider = getProvider();
  const handleConnect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.connect();
    } catch (error:any) {
      createLog({
        status: 'error',
        method: 'connect',
        message: error.message,
      });
    }
  }, [createLog]);

  const handleDisconnect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.disconnect();
    } catch (error:any) {
      createLog({
        status: 'error',
        method: 'disconnect',
        message: error.message,
      });
    }
  }, [createLog]);

  useEffect(() => {
    if (!provider) return;

    // attempt to eagerly connect
    provider.connect({ onlyIfTrusted: true }).catch(() => {
      // fail silently
    });

    provider.on('connect', (publicKey: PublicKey) => {
      createLog({
        status: 'success',
        method: 'connect',
        message: `Connected to account: ${publicKey.toBase58()}`,
      });
    });

    provider.on('disconnect', () => {
      createLog({
        status: 'warning',
        method: 'disconnect',
        message: '👋',
      });
    });

    provider.on('accountChanged', (publicKey: PublicKey | null) => {
      if (publicKey) {
        createLog({
          status: 'info',
          method: 'accountChanged',
          message: `Switched to account ${publicKey.toBase58()}`,
        });
      } else {
        createLog({
          status: 'info',
          method: 'accountChanged',
          message: 'Attempting to switch accounts.',
        });

        provider.connect().catch((error) => {
          createLog({
            status: 'error',
            method: 'accountChanged',
            message: `Failed to re-connect: ${error.message}`,
          });
        });
      }
    });

    return () => {
      provider.disconnect();
    };
  }, [createLog]);

  useEffect(()=>{
    console.log(logs);
    
  },[logs])

  // const handleSignAndSendTransaction = useCallback(async () => {
  //   if (!provider) return;

  //   try {
  //     const transaction = await createTransferTransaction(provider.publicKey as PublicKey, connection);
  //     createLog({
  //       status: 'info',
  //       method: 'signAndSendTransaction',
  //       message: `Requesting signature for: ${JSON.stringify(transaction)}`,
  //     });
  //     const signature = await signAndSendTransaction(provider, transaction);
  //     createLog({
  //       status: 'info',
  //       method: 'signAndSendTransaction',
  //       message: `Signed and submitted transaction ${signature}.`,
  //     });
  //     pollSignatureStatus(signature, connection, createLog);
  //   } catch (error:any) {
  //     createLog({
  //       status: 'error',
  //       method: 'signAndSendTransaction',
  //       message: error.message,
  //     });
  //   }
  // }, [createLog]);

  return (
    <div>
      <div>
        <div>
          {
            logs.length<=0&&'暂无日志'
          }
          {
            logs.map((item,index)=>{
              return (
                <div key={index}>
                  {item.message}
                </div>
              )
            })
          }
        </div>
        <Button onClick={handleConnect}>连接</Button>
        <Button onClick={handleDisconnect}>断开连接</Button>
      </div>
    </div>
  )
}

export default Phantom