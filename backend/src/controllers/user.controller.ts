import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import {
	internalErrorResponse,
	notFoundResponse,
	unprocessableEntryResponse,
} from '../utils/response';

const prisma = new PrismaClient();

const getUserById = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) return unprocessableEntryResponse(res, 'User id not provided');

	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	if (!user) {
		return notFoundResponse(res, 'User not found');
	}
	return user;
};

const getUsers = async (req: Request, res: Response) => {
	const { page = 1, limit = 20 } = req.query;
	const users = await prisma.user.findMany({
		skip: Number(page) - 1,
		take: Number(limit),
	});
	return users;
};

const createUser = async (req: Request, res: Response) => {
	const { firstName, lastName, email, gender, avatar, domain, available } =
		req.body;
	const user = await prisma.user.create({
		data: {
			firstName,
			lastName,
			email,
			gender,
			avatar,
			domain,
			available,
		},
	});

	if (!user) {
		return notFoundResponse(res, 'User not found');
	}
	return user;
};

const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) return unprocessableEntryResponse(res, 'User id not provided');

	const { firstName, lastName, email, gender, avatar, domain, available } =
		req.body;

	try {
		const updatedUser = await prisma.user.update({
			where: {
				id,
			},
			data: {
				firstName,
				lastName,
				email,
				gender,
				avatar,
				domain,
				available,
			},
		});

		if (!updatedUser) {
			return notFoundResponse(res, 'User not found');
		}

		return updatedUser;
	} catch (error) {
		console.error(error);
		return internalErrorResponse(res, error);
	}
};

const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) return unprocessableEntryResponse(res, 'User id not provided');

	try {
		const deletedUser = await prisma.user.delete({
			where: {
				id,
			},
		});

		if (!deletedUser) {
			return notFoundResponse(res, 'User not found');
		}

		return deletedUser;
	} catch (error) {
		console.error(error);
		return internalErrorResponse(res, error);
	}
};

const searchByName = async (req: Request, res: Response) => {
	const { name } = req.query;
	if (!name) return unprocessableEntryResponse(res, 'Name not provided');

	const users = await prisma.user.findMany({
		where: {
			OR: [
				{
					firstName: {
						contains: name,
					},
				},
				{
					lastName: {
						contains: name,
					},
				},
			],
		},
	});

	if (!users) {
		return notFoundResponse(res, 'Users not found');
	}
	return users;
};

const filterByDomain = async (req: Request, res: Response) => {
	const { domain } = req.query;
	if (!domain) return unprocessableEntryResponse(res, 'Domain not provided');

	const users = await prisma.user.findMany({
		where: {
			domain: {
				contains: domain,
			},
		},
	});

	if (!users) {
		return notFoundResponse(res, 'Users not found with this domain');
	}
	return users;
};

const filterByGender = async (req: Request, res: Response) => {
	const { gender } = req.query;
	if (!gender) return unprocessableEntryResponse(res, 'Gender not provided');
	if (gender != 'Male' || gender != 'Female')
		return unprocessableEntryResponse(res, 'Gender not valid');

	const users = await prisma.user.findMany({
		where: {
			gender: {
				equals: gender,
			},
		},
	});

	if (!users) {
		return notFoundResponse(res, 'Users not found with this gender');
	}
	return users;
};

const filterByAvailability = async (req: Request, res: Response) => {
	const { available } = req.query;
	if (!available)
		return unprocessableEntryResponse(res, 'Availability not provided');
	if (available != 'true' || available != 'false')
		return unprocessableEntryResponse(res, 'Availability not valid');

	const users = await prisma.user.findMany({
		where: {
			available: {
				equals: available,
			},
		},
	});

	if (!users) {
		return notFoundResponse(res, 'Users not found with this availability');
	}
	return users;
};

export {
	createUser,
	deleteUser,
	filterByAvailability,
	filterByDomain,
	filterByGender,
	getUserById,
	getUsers,
	searchByName,
	updateUser,
};
