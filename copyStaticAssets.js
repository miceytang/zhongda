/**
 *  有些文件 tsc 编译的时候不会自动带上，需要运行脚本复制到 dist 相应目录下
 **/

const shell = require('shelljs');

/* 创建目录 */
shell.mkdir('-p', 'dist');

/* 执行 copy 操作 */

// 复制 proto 目录下的所有文件
// shell.cp('-r', 'server/proto', 'dist/');

// 复制 www 目录下的所有文件
shell.cp('-R', 'server/www', 'dist/');