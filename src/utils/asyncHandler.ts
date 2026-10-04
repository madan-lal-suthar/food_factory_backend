module.exports = (fn: ExpressHandler) => (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) =>
	Promise.resolve(fn(req, res, next)).catch(next);
