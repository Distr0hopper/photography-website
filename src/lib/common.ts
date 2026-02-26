export const slugify = (title: string) => {
	let slug = title
		.toLowerCase()
		.replace(/^\d+\.\s*/, '') // Remove leading number like "1. "
		.replace(/\s+/g, '-') // Replace spaces with dashes
		.replace(/[^a-z0-9-]/g, ''); // Remove special characters
	return slug;
};
