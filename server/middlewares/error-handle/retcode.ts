/**
 * 说明：该文件同一错误码，可自行定义。
 **/

const LIMIT_ERROR: number = 99999; // 频率限制错误
const AUTH_ERROR: number = 100000; // 鉴权错误（建议使用100110 到101000表示各种业务上鉴权错误码）
const VALIDATE_ERROR: number = 100001; // 参错错误
const SERVICE_ERROR: number = 100003; // 服务错误
const DIRTY_ERROR: number = 100004; // 脏词错误
const LOGIN_ERROR: number = 100005; // 登录态校验错误
const POST_ERROR: number = 100100; // postonly错误
const REFER_ERROR: number = 100101; // refer错误
const TIMOUT_ERROR: number = 100012; // 服务超时错误
const SQL_ERROR: number = 100013; // 数据库异常
const NOT_FOUND: number = 100404; // 404 错误
const NOT_AVAILABLE: number = 100503; // 接口不可用
const LEAK_SCAN_RET_CODE: number = 99992; // 安全扫描 smart 上报的指定错误码
const UNKNOWN_ERROR: number = 111111; // 未知错误

export {
  LIMIT_ERROR,
  AUTH_ERROR,
  VALIDATE_ERROR,
  SERVICE_ERROR,
  DIRTY_ERROR,
  LOGIN_ERROR,
  POST_ERROR,
  REFER_ERROR,
  TIMOUT_ERROR,
  SQL_ERROR,
  NOT_FOUND,
  NOT_AVAILABLE,
  LEAK_SCAN_RET_CODE,
  UNKNOWN_ERROR
};
