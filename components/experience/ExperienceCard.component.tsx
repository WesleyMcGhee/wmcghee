"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "../ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "../ui/drawer";

export function ExperienceCard({
	name,
	startEndDate,
	description,
}: {
	name: string;
	startEndDate: string;
	description: string;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop)
		return (
			<div className="hover:bg-slate-900 rounded-xl">
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger>
						<div className="text-left p-2">
							<p className="font-bold">{name}</p>
							<p className="italic">{startEndDate}</p>
						</div>
					</DialogTrigger>
					<DialogContent className="bg-slate-900 rounded-xl border border-white">
						<DialogHeader>
							<h2 className="text-xl">{name}</h2>
						</DialogHeader>
						<div className="border-t border-t-white pt-2">
							<h3 className="font-bold mb-1">Description:</h3>
							<p>{description}</p>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		);

	return (
		<div className="hover:bg-slate-900 rounded-xl">
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger>
					<div className="text-left p-2">
						<p className="font-bold">{name}</p>
						<p className="italic">{startEndDate}</p>
					</div>
				</DrawerTrigger>
        <DrawerContent className="bg-slate-900 rounded-xl border border-white min-h-[80vh] p-4">
          <DrawerHeader>
            <h2 className="text-2xl">{name}</h2>
          </DrawerHeader>
          <div className="border-t border-t-white pt-2">
            <h3 className="font-bold mb-1 text-lg">Description:</h3>
            <p className="text-lg">{description}</p>
          </div>
        </DrawerContent>
			</Drawer>
		</div>
	);
}
