"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

export function ProjectCard({
	name,
	description,
	skills,
}: {
	name: string;
	description: string;
	skills: string[];
}) {
	const [open, setOpen] = useState<boolean>(false);
	const isDesktop = useMediaQuery("(min-width: 786px)");

	if (isDesktop)
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>
					<ProjectCardTrigger name={name} description={description} />
				</DialogTrigger>
				<DialogContent className="bg-slate-950 border border-white rounded-2xl">
					<ProjectCardContent
						name={name}
						description={description}
						techStack={skills}
						isDesktop={isDesktop}
					/>
				</DialogContent>
			</Dialog>
		);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger>
				<ProjectCardTrigger name={name} description={description} />
			</DrawerTrigger>
			<DrawerContent className="p-4 bg-slate-950 border border-white">
				<ProjectCardContent
					name={name}
					description={description}
					techStack={skills}
					isDesktop={isDesktop}
				/>
			</DrawerContent>
		</Drawer>
	);
}

function ProjectCardTrigger({
	name,
	description,
}: {
	name: string;
	description: string;
}) {
	return (
		<div className="border border-white rounded-2xl w-full max-w-87.5 p-4">
			<div className="border-b border-b-white">
				<h3 className="text-xl">{name}</h3>
			</div>
			<div className="pt-2">
				<h3 className="mb-2 font-bold">Description</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

function ProjectCardContent({
	name,
	description,
	techStack,
	isDesktop,
}: {
	name: string;
	description: string;
	techStack: string[];
	isDesktop: boolean;
}) {
	return (
		<div className={cn("min-w-0", isDesktop ? "" : "h-[80vh]")}>
			<div className={`border-b border-b-white`}>
				<h2 className="text-center text-2xl">{name}</h2>
			</div>
			<div className="mt-2 min-w-0">
				<h3 className="text-lg mb-2">Tech Stack</h3>
				<div className="flex gap-2 overflow-x-auto min-w-0 pb-1">
					{techStack.map((tech) => (
						<SkillCard skill={tech} key={tech} />
					))}
				</div>
			</div>
			<div className="mt-2">
				<h3 className="text-lg font-bold">Description</h3>
				<p className="text-lg">{description}</p>
			</div>
		</div>
	);
}

function SkillCard({ skill }: { skill: string }) {
	return (
		<div className="border border-white rounded-lg p-2 shrink-0">
			<div className="flex justify-center">
				<i className={`devicon-${skill}-plain text-5xl`} />
			</div>
			<p className="text-center">
				{skill === "amazonwebservices" ? "AWS" : skill}
			</p>
		</div>
	);
}
