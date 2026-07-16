import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";
import { ProjectCard } from "./ProjectCard.component";
import { projects } from "./projects.data";

export function ProjectsSection() {
	return (
		<section className="py-4 px-4">
			<h2 className="text-3xl text-center">Projects</h2>
      <div className="flex justify-center">
			<Carousel className="mt-4 w-full max-w-100">
				<CarouselContent>
					{projects.map((project) => (
						<CarouselItem key={project.name} className="flex justify-center">
							<ProjectCard
								name={project.name}
								description={project.description}
                skills={project.skills}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
				<CarouselDots className="mt-4 sm:hidden" />
			</Carousel>
      </div>
		</section>
	);
}
