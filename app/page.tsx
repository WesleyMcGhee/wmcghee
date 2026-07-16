import Link from "next/link";
import { ExperienceSection } from "@/components/experience/ExperienceSection.component";
import { ProjectsSection } from "@/components/projects/ProjectsSection.component";
import { getAllPosts } from "@/lib/blog";

export default function Page() {
	const posts = getAllPosts().slice(0, 3);

	return (
		<div className="relative bg-slate-950/70">
			<div className="fixed inset-0 -z-10 pointer-events-none">
				<img
					src="/header-background.svg"
					alt=""
					className="h-full w-full object-cover opacity-20 brightness-[2]"
				/>
			</div>
			<section className="relative flex flex-col md:flex-row items-center gap-8 md:gap-4 px-6 py-12 md:min-h-[400px] overflow-hidden text-center md:text-left">
				<div className="w-full md:w-1/2 flex items-center justify-center md:justify-end">
					<div>
						<h1 className="font-bold text-4xl sm:text-5xl">
							Wesley McGhee<span className="text-cyan-500">.</span>
						</h1>
						<p className="text-2xl sm:text-3xl md:text-4xl mt-1 md:mt-0">
							Engineer. Apologist. Student
						</p>
					</div>
				</div>
				<div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-4">
					<img
						src="/headshot.jpeg"
						alt="Wesley McGhee"
						className="h-[220px] w-[155px] sm:h-[250px] sm:w-[175px] object-cover object-top rounded"
					/>
					<p className="max-w-sm md:max-w-none">
						Blessed be the God and Father of our Lord Jesus Christ, who
						according to His great mercy has caused us to be born again to a
						living hope through the resurrection of Jesus Christ from the dead{" "}
						<span className="block">
							<sub>1 Pet. 1:3</sub>
						</span>
					</p>
				</div>
			</section>
			{/* Experience */}
			<section className="w-full flex flex-col center center py-12 gap-4">
      <h2 className="text-3xl text-center">Experience</h2>
				<ExperienceSection />
			</section>
			{/* Projects */}
      <ProjectsSection />
			{/* Blog */}
      <section className="w-full flex flex-col items-center py-12 gap-4">
        <h2 className="text-3xl text-center">Blog</h2>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet — check back soon.</p>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-2xl px-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-white rounded-2xl p-4 hover:bg-slate-900 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl">{post.title}</h3>
                  <time className="text-sm text-muted-foreground whitespace-nowrap">
                    {post.date}
                  </time>
                </div>
                <p className="mt-2">{post.description}</p>
              </Link>
            ))}
          </div>
        )}
        <Link href="/blog" className="text-cyan-500 underline">
          View all posts
        </Link>
      </section>
		</div>
	);
}
