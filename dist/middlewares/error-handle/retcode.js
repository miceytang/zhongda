"use strict";
/**
 * 说明：该文件同一错误码，可自行定义。
 **/
Object.defineProperty(exports, "__esModule", { value: true });
const LIMIT_ERROR = 99999; // 频率限制错误
exports.LIMIT_ERROR = LIMIT_ERROR;
const AUTH_ERROR = 100000; // 鉴权错误（建议使用100110 到101000表示各种业务上鉴权错误码）
exports.AUTH_ERROR = AUTH_ERROR;
const VALIDATE_ERROR = 100001; // 参错错误
exports.VALIDATE_ERROR = VALIDATE_ERROR;
const SERVICE_ERROR = 100003; // 服务错误
exports.SERVICE_ERROR = SERVICE_ERROR;
const DIRTY_ERROR = 100004; // 脏词错误
exports.DIRTY_ERROR = DIRTY_ERROR;
const LOGIN_ERROR = 100005; // 登录态校验错误
exports.LOGIN_ERROR = LOGIN_ERROR;
const POST_ERROR = 100100; // postonly错误
exports.POST_ERROR = POST_ERROR;
const REFER_ERROR = 100101; // refer错误
exports.REFER_ERROR = REFER_ERROR;
const TIMOUT_ERROR = 100012; // 服务超时错误
exports.TIMOUT_ERROR = TIMOUT_ERROR;
const SQL_ERROR = 100013; // 数据库异常
exports.SQL_ERROR = SQL_ERROR;
const NOT_FOUND = 100404; // 404 错误
exports.NOT_FOUND = NOT_FOUND;
const NOT_AVAILABLE = 100503; // 接口不可用
exports.NOT_AVAILABLE = NOT_AVAILABLE;
const LEAK_SCAN_RET_CODE = 99992; // 安全扫描 smart 上报的指定错误码
exports.LEAK_SCAN_RET_CODE = LEAK_SCAN_RET_CODE;
const UNKNOWN_ERROR = 111111; // 未知错误
exports.UNKNOWN_ERROR = UNKNOWN_ERROR;
//# sourceMappingURL=retcode.js.map