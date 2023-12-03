import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';
import {
	notFoundResponse,
	unprocessableEntryResponse,
} from '../utils/response';

const prisma = new PrismaClient();

const getTeamById = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) return unprocessableEntryResponse(res, 'Team id not provided');

	const team = await prisma.team.findUnique({
		where: {
			id,
		},
	});

	if (!team) {
		return notFoundResponse(res, 'Team not found');
	}
	return team;
};

const getTeams = async (req: Request, res: Response) => {
	const { page = 1, limit = 20 } = req.query;
	const teams = await prisma.team.findMany({
		skip: Number(page) - 1,
		take: Number(limit),
	});
	return teams;
};

const createTeam = async (req: Request, res: Response) => {
	const { name, users } = req.body;

	let domains = [];
	let userInfos: User[] = [];
	for (let i = 0; i < users.length; i++) {
		const user = await prisma.user.findUnique({
			where: {
				id: users[i],
			},
		});
		if (!user) {
			return notFoundResponse(res, 'User not found');
		}
		if (domains.includes(user.domain)) {
			return unprocessableEntryResponse(
				res,
				'Users must have unique domains'
			);
		}
		domains.push(user.domain);
		userInfos.push(user);
	}

	const team = await prisma.team.create({
		data: {
			name,
			members: {
				connect: userInfos,
			},
		},
	});

	if (!team) {
		return notFoundResponse(res, 'Team not created');
	}
	return team;
};

export { createTeam, getTeamById, getTeams };
