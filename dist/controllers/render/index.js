"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Render {
    static render(req, res, next) {
        let path = req.path;
        console.log(path);
        let filePath = path.substring(1, path.length);
        filePath.replace(".html", '');
        console.log(filePath);
        res.render(filePath);
    }
}
exports.default = Render;
//# sourceMappingURL=index.js.map