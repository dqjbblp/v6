import { ConnectedWallet } from "@tonconnect/ui-react";
import axios from "axios";
import useUserInfoStore from "../store/useUserInfoStore";

export default function useUserManage() {
  const { setToken, setInfo } = useUserInfoStore();

  /*登录*/
  async function login(connectWallet: ConnectedWallet) {
    const tonProof = connectWallet?.connectItems?.tonProof;
    if (tonProof && "proof" in tonProof) {
      const res2 = await axios.post(
        "http://192.168.1.73:8832/api/v1/userLogin/login",
        {
          address: connectWallet.account.address,
          proof: tonProof.proof,
          // chain: connectWallet?.account.chain,
          // walletStateInit: connectWallet?.account.walletStateInit,
          publicKey: connectWallet.account.publicKey,
        }
      );
      console.log("resData token: ", res2.data);
      console.log(res2);
      setToken(res2.data);
    }
  }
  function logout() {
    setToken();
    setInfo();
  }

  return {
    login,
    logout,
  };
}
