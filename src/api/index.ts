import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ICoupon,
  IPage,
  IPointsRecord,
  IResponse,
  ISupportTypes1,
} from "../types";

/*
 * 获取二级标题列表
 * */
export const useSupportTypes2Query = (data: { id: number }) =>
  useQuery<IResponse<ISupportTypes1[]>>({
    queryKey: ["support", "types", "2", data],
    enabled: data.id > 0,
    queryFn: () =>
      axios.get(`/user/support/document/typesLevel2`, {
        params: {
          parendId: data.id,
        },
      }),
  });

/*
 * 积分领取记录 & 使用记录
 * */
export const usePointsRecordsQuery = (data: { type: 1 | 2 }) =>
  useInfiniteQuery<IPage<IPointsRecord>>({
    queryKey: ["points", "record", "list", data],
    queryFn: async ({ pageParam }) => {
      const resp = await axios.post("/user/app-api/v1/reward/integralRecords", {
        pageIndex: pageParam,
        pageSize: 20,
        type: data.type,
      });
      return resp.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.records.length < lastPage.pageSize) {
        return undefined;
      } else {
        return lastPage.pageIndex + 1;
      }
    },
  });

/**
 *  点券列表
 */
export const useCouponListQuery = (data: { status: 1 | 2 | 3 }) =>
  useInfiniteQuery<IPage<ICoupon>>({
    retry: false,
    queryKey: ["coupon", "list", data],
    queryFn: async ({ pageParam }) => {
      const resp = await axios.post("/user/app-api/v1/coupon/couponFeeList", {
        pageIndex: pageParam,
        pageSize: 20,
        status: data.status,
      });
      return resp.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.records.length < lastPage.pageSize) {
        return undefined;
      } else {
        return lastPage.pageIndex + 1;
      }
    },
  });
