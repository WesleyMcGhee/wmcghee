import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Page() {
	const posts = getAllPosts();

	return (
		<section className="bg-slate-950 min-h-screen py-12 px-4">
			<h1 className="text-3xl text-center mb-8">Blog</h1>
			<div className="flex flex-col items-center gap-4">
				{posts.length === 0 && (
					<p className="text-center text-muted-foreground">
						No posts yet — check back soon.
					</p>
				)}
				{posts.map((post) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="border border-white rounded-2xl w-full max-w-2xl p-4 hover:bg-slate-900 transition-colors"
					>
						<div className="flex items-baseline justify-between gap-4">
							<h2 className="text-xl">{post.title}</h2>
							<time className="text-sm text-muted-foreground whitespace-nowrap">
								{post.date}
							</time>
						</div>
						<p className="mt-2">{post.description}</p>
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
					</Link>
				))}
			</div>
		</section>
	);
}
