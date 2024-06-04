import { PublicKey, Transaction, VersionedTransaction, SendOptions } from "@solana/web3.js";

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

type DisplayEncoding = 'utf8' | 'hex';

type PhantomEvent = 'connect' | 'disconnect' | 'accountChanged';

type PhantomRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signAndSendTransaction'
  | 'signAndSendTransactionV0'
  | 'signAndSendTransactionV0WithLookupTable'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage';

interface ConnectOpts {
  onlyIfTrusted: boolean;
}


export interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signAndSendTransaction: (
    transaction: Transaction | VersionedTransaction,
    opts?: SendOptions
  ) => Promise<{ signature: string; publicKey: PublicKey }>;
  signTransaction: (
    transaction: Transaction | VersionedTransaction
  ) => Promise<Transaction | VersionedTransaction>;
  signAllTransactions: (
    transactions: (Transaction | VersionedTransaction)[]
  ) => Promise<(Transaction | VersionedTransaction)[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

export type Status = "success" | "warning" | "error" | "info";

export interface TLog {
  status: Status;
  method?: PhantomRequestMethod | Extract<PhantomEvent, "accountChanged">;
  message: string;
  messageTwo?: string;
}
