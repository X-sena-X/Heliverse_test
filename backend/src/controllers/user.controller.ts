import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
    internalErrorResponse,
    notFoundResponse,
    successResponse,
    unprocessableEntryResponse,
} from "../utils/response";

const prisma = new PrismaClient();

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return unprocessableEntryResponse(res, "User id not provided");

    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    if (!user) {
        return notFoundResponse(res, "User not found");
    }
    return user;
};

const getUsers = async (req: Request, res: Response) => {
    const { page = 1, limit = 20 } = req.query;
    const users = await prisma.user.findMany({
        skip: Number(page - 1) * Number(limit),
        take: Number(limit),
    });
    return successResponse(res, users);
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
        return notFoundResponse(res, "User not found");
    }
    return successResponse(res, user);
};

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return unprocessableEntryResponse(res, "User id not provided");

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
            return notFoundResponse(res, "User not found");
        }

        return successResponse(res, updatedUser);
    } catch (error) {
        console.error(error);
        return internalErrorResponse(res, error);
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return unprocessableEntryResponse(res, "User id not provided");

    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id,
            },
        });

        if (!deletedUser) {
            return notFoundResponse(res, "User not found");
        }

        return deletedUser;
    } catch (error) {
        console.error(error);
        return internalErrorResponse(res, error);
    }
};

const searchByName = async (req: Request, res: Response) => {
    const { name, page = 1, limit = 20 } = req.query;
    console.log(name);
    if (!name) return unprocessableEntryResponse(res, "Name not provided");

    const users = await prisma.user.findMany({
        skip: Number(page - 1) * Number(limit),
        take: Number(limit),
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
        return notFoundResponse(res, "Users not found");
    }
    return successResponse(res, users);
};

const filters = async (req: Request, res: Response) => {
    const { domain, gender, available } = req.query;

    if (!domain && !gender && !available)
        return unprocessableEntryResponse(res, "Domain not provided");

    const whereConditions = {};

    const addCondition = (
        field: string,
        value: boolean | string | undefined
    ) => {
        if (value !== undefined) {
            if (value === false) return;
            whereConditions[field] = { equals: value };
        }
    };

    addCondition("domain", domain);
    addCondition("gender", gender);
    addCondition("available", Boolean(available));

    const users = await prisma.user.findMany({
        where: whereConditions,
    });
    console.log(whereConditions);
    if (!users) {
        return notFoundResponse(res, "Users not found with this domain");
    }
    return successResponse(res, users);
};

const filterByGender = async (req: Request, res: Response) => {
    const { gender } = req.query;
    if (!gender) return unprocessableEntryResponse(res, "Gender not provided");
    if (gender != "Male" || gender != "Female")
        return unprocessableEntryResponse(res, "Gender not valid");

    const users = await prisma.user.findMany({
        where: {
            gender: {
                equals: gender,
            },
        },
    });

    if (!users) {
        return notFoundResponse(res, "Users not found with this gender");
    }
    return users;
};

const filterByAvailability = async (req: Request, res: Response) => {
    const { available } = req.query;
    if (!available)
        return unprocessableEntryResponse(res, "Availability not provided");
    if (available != "true" || available != "false")
        return unprocessableEntryResponse(res, "Availability not valid");

    const users = await prisma.user.findMany({
        where: {
            available: {
                equals: available,
            },
        },
    });

    if (!users) {
        return notFoundResponse(res, "Users not found with this availability");
    }
    return users;
};

export {
    createUser,
    deleteUser,
    filters,
    getUserById,
    getUsers,
    searchByName,
    updateUser,
};
