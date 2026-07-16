import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";

const mdxComponents = {
	h1: (props: React.ComponentProps<"h1">) => (
		<h1 className="text-3xl mt-8 mb-4" {...props} />
	),
	h2: (props: React.ComponentProps<"h2">) => (
		<h2 className="text-2xl mt-8 mb-4" {...props} />
	),
	h3: (props: React.ComponentProps<"h3">) => (
		<h3 className="text-xl mt-6 mb-3" {...props} />
	),
	p: (props: React.ComponentProps<"p">) => (
		<p className="leading-7 mb-4" {...props} />
	),
	ul: (props: React.ComponentProps<"ul">) => (
		<ul className="list-disc pl-6 mb-4" {...props} />
	),
	ol: (props: React.ComponentProps<"ol">) => (
		<ol className="list-decimal pl-6 mb-4" {...props} />
	),
	a: (props: React.ComponentProps<"a">) => (
		<a className="text-cyan-500 underline" {...props} />
	),
	code: (props: React.ComponentProps<"code">) => (
		<code className="bg-slate-900 rounded px-1 py-0.5 text-sm" {...props} />
	),
};

export function generateStaticParams() {
	return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post || !post.published) return {};

	return {
		title: post.title,
		description: post.description,
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post || !post.published) notFound();

	return (
		<article className="bg-slate-950 min-h-screen py-12 px-4">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-4xl mb-2">{post.title}</h1>
				<time className="text-sm text-muted-foreground">{post.date}</time>
				{post.tags?.length > 0 && (
					<div className="mt-3 flex gap-2 flex-wrap">
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="text-xs border border-white rounded-full px-2 py-0.5"
							>
								{tag}
							</span>
						))}
					</div>
				)}
				<div className="mt-8">
					<MDXRemote source={post.content} components={mdxComponents} />
				</div>
			</div>
		</article>
	);
}
