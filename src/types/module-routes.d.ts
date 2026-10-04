type ExpressRequest = import('express').Request;
type ExpressResponse = import('express').Response;
type ExpressNextFunction = import('express').NextFunction;
type ExpressHandler = import('express').RequestHandler;
type ExpressQuery = import('express').Request['query'];
type HttpError = Error & { status?: number };

declare namespace Express {
  interface Request {
    user?: string | import('jsonwebtoken').JwtPayload;
  }
}
