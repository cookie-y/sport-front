// request请求参数
export interface request {
  url: string;
  data?: any;
  method?: 'GET' | 'POST' | 'OPTIONS' | 'HEAD' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined;
  dataType?: string;
  header?: any;
}

// 指定方法的请求参数
export interface specificRequest {
  data?: unknown;
  dataType?: string;
}

// 接口返回的数据格式
export interface resStructure {
  message: string;
  code: number;
  data: any;
}

// 分页接口返回数据格式
export interface resStructurePaging {
  page: number;
  pageSize: number;
  total: number;
  list: Array<any>;
}

// 提交数据接口返回数据格式
export interface resStructureSubmit extends resStructure {
  data: null;
}
