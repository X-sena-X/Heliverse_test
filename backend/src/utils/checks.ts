const checkEnvVariables = (requiredEnvVars: string[]) => {
	const unsetEnvVars = requiredEnvVars.filter((envVar) => {
		const envValue = process.env[envVar];
		return !(envValue && envValue.length > 0);
	});
	if (unsetEnvVars.length > 0) {
		console.error(
			`Required environment variables not set: ${unsetEnvVars.join(', ')}`
		);
		process.exit(1);
	}
};

export { checkEnvVariables };
