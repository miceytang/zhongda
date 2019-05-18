import express from "express";

export default class Render {
  static render(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let path = req.path;
    console.log(path);
    let filePath = path.substring(1, path.length);
    filePath.replace(".html", "");
    console.log(filePath);

    res.render(filePath);
  }
}
