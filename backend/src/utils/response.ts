import { Response } from 'express';

enum VerificationType {
	EMAIL = 'email',
	PHONE = 'phone',
	APPROVAL = 'approval',
}

interface UnverifiedUser {
	id: string;
	type: VerificationType;
	message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const successResponse = (res: Response, data: any) => {
	return res.json({ success: true, data });
};

const badRequestResponse = (res: Response, message: string) => {
	return res
		.status(400)
		.json({ success: false, error: { code: 400, message } });
};

const unauthorisedResponse = (
	res: Response,
	message: string | UnverifiedUser
) => {
	return res
		.status(401)
		.json({ success: false, error: { code: 401, message } });
};

const forbiddenResponse = (res: Response, message: string) => {
	return res
		.status(403)
		.json({ success: false, error: { code: 403, message } });
};

const notFoundResponse = (res: Response, message: string) => {
	return res
		.status(404)
		.json({ success: false, error: { code: 404, message } });
};

const unprocessableEntryResponse = (res: Response, message: string) => {
	return res
		.status(422)
		.json({ success: false, error: { code: 422, message } });
};

const internalErrorResponse = (res: Response, message: string) => {
	return res
		.status(500)
		.json({ success: false, error: { code: 500, message } });
};

export {
	VerificationType,
	badRequestResponse,
	forbiddenResponse,
	internalErrorResponse,
	notFoundResponse,
	successResponse,
	unauthorisedResponse,
	unprocessableEntryResponse,
};
