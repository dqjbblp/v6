export interface IResponse<T> {
    code: number;
    data: T;
    msg?: string;
    success: boolean;
  }

  export interface ISupportTypes1Title {
    local: string;
    content: string;
  }
  
  export interface ISupportTypes1 {
    id: number;
    titles: ISupportTypes1Title[];
    level: number;
    parentId?: number;
    stats: boolean;
    createTimeStamp: number;
  }

  export interface IPageParams {
    pageIndex: number;
    pageSize: number;
  }
  
  export type IPage<T> = IPageParams & {
    records: T[];
    total: number;
  };

  
export interface IPointsRecord {
    createTimeStamp: number;
    id: number;
    integral: number;
    recordId: number;
    remark: string;
    type: number;
    userId: number;
  }

  
export interface ICoupon {
    amount: string;
    blindId: number;
    createTime: string;
    endTime: string;
    id: number;
    // params: Params;
    // 1->未使用 2 已使用 3->已失效
    status: number;
    symbol: string;
    updateTime: string;
    userId: number;
    endTimeStamp: number;
    type: number;
    source: number;
    batchName?: string;
    batchRemark?: string;
    //
    useScope?: string;
  }