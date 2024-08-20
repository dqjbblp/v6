import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import axios from "axios";
import { useEffect } from "react";

import { useGetUserInfoQuery } from "../api/mine";
import useUserManage from "../Hook/useUserManage";
import useUserInfoStore from "../store/useUserInfoStore";

export default function ConnectAndLogin() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const { setInfo } = useUserInfoStore();
  const { logout, login } = useUserManage();
  const query = useGetUserInfoQuery();

  useEffect(() => {
    if (!wallet) {
      createPayload();
    }
  }, [wallet]);

  useEffect(() => {
    tonConnectUI.onStatusChange(
      (wallet) => {
        if (wallet?.connectItems?.tonProof) {
          login(wallet);
        } else {
          logout();
        }
      },
      async (err) => {
        console.log(err);
      }
    );
  }, [tonConnectUI]);
  /*获取用户令牌*/
  useEffect(() => {
    if (query.data?.success) {
      setInfo(query.data?.data);
    }
  }, [query.data?.data, query.data?.success, setInfo]);
  async function createPayload() {
    tonConnectUI.setConnectRequestParameters({ state: "loading" });
    const res = await axios.post(
      "http://192.168.1.73:8832/api/v1/userLogin/getSignatureRaw"
    );
    if (res && res.data) {
      // console.log(tonConnectUI.setConnectRequestParameters);
      tonConnectUI.setConnectRequestParameters({
        state: "ready",
        value: {
          tonProof: res.data,
        },
      });
    } else {
      tonConnectUI.setConnectRequestParameters(null);
    }
  }

  return <></>;
}
