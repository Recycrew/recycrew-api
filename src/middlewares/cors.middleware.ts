import { NextFunction, Response } from "express";

const CorsMiddleware = (_: any, response: Response, next: NextFunction) => {
  response.setHeader("Access-Control-Allow-Origin", "*"); // url
  response.setHeader("Access-Control-Allow-Methods", "*"); // methods name
  response.setHeader("Access-Control-Allow-Headers", "*"); // headers name
  next();
};

export default CorsMiddleware;
