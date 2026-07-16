import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface PostMetadata {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	published: boolean;
}

export interface Post extends PostMetadata {
	content: string;
}

function getPostFileNames(): string[] {
	return fs
		.readdirSync(postsDirectory)
		.filter((fileName) => /\.mdx?$/.test(fileName));
}

export function getAllPosts(): PostMetadata[] {
	const allPosts = getPostFileNames().map((fileName) => {
		const slug = fileName.replace(/\.mdx?$/, "");
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");

		const { data } = matter(fileContents);

		return {
			slug,
			...data,
		} as PostMetadata;
	});

	return allPosts
		.filter((post) => post.published)
		.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
	return getPostFileNames().map((fileName) => fileName.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
	const fileName = getPostFileNames().find(
		(name) => name.replace(/\.mdx?$/, "") === slug,
	);

	if (!fileName) return null;

	const fullPath = path.join(postsDirectory, fileName);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	const { data, content } = matter(fileContents);

	return {
		slug,
		content,
		...data,
	} as Post;
}
