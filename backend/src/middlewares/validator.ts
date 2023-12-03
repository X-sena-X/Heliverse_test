import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import {
	internalErrorResponse,
	unprocessableEntryResponse,
} from '../utils/response';

const bodyValidator =
	(schema: Joi.ObjectSchema) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			const { error } = schema.validate(req.body);
			if (error) {
				return unprocessableEntryResponse(res, error.message);
			}
			return next();
		} catch (e) {
			if (e instanceof Error) {
				console.error(`Couldn't validate request body: ${e.message}`);
				return internalErrorResponse(
					res,
					"Couldn't validate request body"
				);
			}
		}
	};

export default bodyValidator;
