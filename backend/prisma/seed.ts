import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedFile = './seed.json';
const jsonData = JSON.parse(
	require('fs').readFileSync(seedFile, { encoding: 'utf8', flag: 'r' })
);
const formattedData = jsonData.map((u: any) => {
	const { id, first_name, last_name, ...rest } = u;
	return {
		...rest,
		firstName: u.first_name,
		lastName: u.last_name,
	};
});
console.log(formattedData[0]);
const userData: Prisma.UserCreateInput[] = formattedData;
async function main() {
	console.log(`Seeding started...`);
	await prisma.user.createMany({
		data: userData,
	});
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
