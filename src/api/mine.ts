import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IResponse } from "../types";
import { IUserInfo } from "../types/mine";
import useUserInfoStore from "../store/useUserInfoStore";

//获取用户信息
export const useGetUserInfoQuery = () => {
  const { token } = useUserInfoStore();
  return useQuery<IResponse<IUserInfo>>({
    queryKey: ["userInfo", "get"],
    queryFn: () => axios.get("/api/v1/userInfo/profile"),
    enabled: !!token,
  });
};
