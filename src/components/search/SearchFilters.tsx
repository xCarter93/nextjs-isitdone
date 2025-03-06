"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Sample genre data
const genres = [
	{ id: "fantasy", label: "Fantasy" },
	{ id: "sci-fi", label: "Science Fiction" },
	{ id: "mystery", label: "Mystery" },
	{ id: "thriller", label: "Thriller" },
	{ id: "romance", label: "Romance" },
	{ id: "historical", label: "Historical Fiction" },
];

export function SearchFilters() {
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [completionStatus, setCompletionStatus] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("relevance");

	const toggleGenre = (genreId: string) => {
		setSelectedGenres((prev) =>
			prev.includes(genreId)
				? prev.filter((id) => id !== genreId)
				: [...prev, genreId]
		);
	};

	const clearFilters = () => {
		setSelectedGenres([]);
		setCompletionStatus("all");
		setSortBy("relevance");
	};

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium mb-3">Genres</h3>
				<div className="space-y-2">
					{genres.map((genre) => (
						<div key={genre.id} className="flex items-center space-x-2">
							<Checkbox
								id={`genre-${genre.id}`}
								checked={selectedGenres.includes(genre.id)}
								onCheckedChange={() => toggleGenre(genre.id)}
							/>
							<Label
								htmlFor={`genre-${genre.id}`}
								className="text-sm font-normal cursor-pointer"
							>
								{genre.label}
							</Label>
						</div>
					))}
				</div>
			</div>

			<div>
				<h3 className="text-lg font-medium mb-3">Completion Status</h3>
				<RadioGroup
					value={completionStatus}
					onValueChange={setCompletionStatus}
					className="space-y-2"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="all" id="all" />
						<Label htmlFor="all" className="text-sm font-normal cursor-pointer">
							All
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="complete" id="complete" />
						<Label
							htmlFor="complete"
							className="text-sm font-normal cursor-pointer"
						>
							Complete
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="ongoing" id="ongoing" />
						<Label
							htmlFor="ongoing"
							className="text-sm font-normal cursor-pointer"
						>
							Ongoing
						</Label>
					</div>
				</RadioGroup>
			</div>

			<div>
				<h3 className="text-lg font-medium mb-3">Sort By</h3>
				<Select value={sortBy} onValueChange={setSortBy}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select sort order" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="relevance">Relevance</SelectItem>
						<SelectItem value="newest">Newest First</SelectItem>
						<SelectItem value="oldest">Oldest First</SelectItem>
						<SelectItem value="a-z">A-Z</SelectItem>
						<SelectItem value="z-a">Z-A</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Button variant="outline" className="w-full" onClick={clearFilters}>
				Clear Filters
			</Button>
		</div>
	);
}
