export interface ISubscribe {
  isReady: boolean;
  val: NoticeMessage | null;
  val2: TradeMessage | null;
  val3: KlineMessage | null;
  subscribeToEvent: (
    method: string,
    event: "notice" | "kline",
    tokenId?: string,
    period?: string
  ) => void;
  unsubscribeFromEvent: (event: "notice" | "kline") => void;
}

export interface ICrown {
  avatar: string;
  marketCap: number;
  nickName: string;
  reply: number;
  tokenImage: string;
  tokenName: string;
  tokenSymbol: string;
  userId: number;
}

export interface ITrade {
  isBuy: boolean;
  nickName: string;
  quantity: number;
  tokenId: number;
  tokenImage: string;
  tokenSymbol: string;
  userId: number;
  avatar: string;
}

export interface IKline {
  amount: number;
  close: number;
  count: number;
  hight: number;
  low: number;
  open: number;
  period: string;
  quantity: number;
  time: number;
  tokenId: number;
}

export interface NoticeMessage {
  method: "SUBSCRIBE";
  event: "notice";
  data: ICrown;
}

export interface TradeMessage {
  method: "SUBSCRIBE";
  event: "trade";
  data: ITrade;
}

export interface KlineMessage {
  method: "SUBSCRIBE";
  event: "kline";
  data: IKline;
}
