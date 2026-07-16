import { experience } from "./experience.data";
import { ExperienceCard } from "./ExperienceCard.component";

export function ExperienceSection() {
	return (
		<div className="flex justify-center w-full">
			<div className="inline-flex flex-col gap-2 border-l border-l-white pl-4">
				{experience.map((exp) => (
					<ExperienceCard
						name={exp.name}
						startEndDate={exp.startEndDate}
						description={exp.description}
            key={exp.name}
					/>
				))}
			</div>
		</div>
	);
}
