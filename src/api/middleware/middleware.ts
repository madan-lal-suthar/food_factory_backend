import RequestLogger from "./RequestLogger";
import TokenVerifier from "./TokenVerifier"
import logger from "../common/log";
import date from "../common/date";
import { Request, Response, NextFunction } from "express";
interface Error {
	status?: number;
	message?: string;
}

class Middleware {
	static allowAccess(req : Request, res: Response, next: NextFunction) {
		const corsHeaders = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
			"Access-Control-Allow-Headers": "X-Requested-With,content-type",
			"Access-Control-Allow-Credentials": true,
		};

		Object.entries(corsHeaders).forEach(([key, value]) => {
			res.setHeader(key, value as string);
		});

		next();
	}

	static handleError(req : Request, res : Response, next: NextFunction) {
		const err = new Error(`Not Found: ${req.method}:${req.originalUrl}`) as Error & { status?: number };
		logger.error(err);
		err.status = 404;
		next(err);
	}

	static async verifyToken(req : Request, res : Response, next: NextFunction) {
		if (!TokenVerifier.isLoginRequired(req.path)) return next();

		const token = req.headers["authorization"];
		if (!token) {
			return res.status(401).json({
				status: 401,
				message: "No token provided.",
			});
		}

		const isValid = await TokenVerifier.verifyAndValidateToken(token, req, res);
		if (!isValid) {
			return res.status(401).json({
				status: 401,
				message:
					"You are forcefully logged out, please try to login again or contact administrator.",
			});
		}

		next();
	}

	static printLogs(req : Request, res : Response, next: NextFunction) {
		logger.info({
			Time: date,
			url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
			body: req.body,
			header: req.headers,
			clientInfo: "",
		});
		next();
	}

	static logAllRequests(req : Request, res : Response, next: NextFunction) {
		if (req.method !== "OPTIONS") {
			new RequestLogger(req, res);
		}
		next();
	}
}

export default Middleware;