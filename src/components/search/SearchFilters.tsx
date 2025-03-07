"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SearchFilters as ApiSearchFilters } from "@/lib/api/googleBooks";
import { StableCheckbox } from "./StableCheckbox";

// Sample genre data
const genres = [
	{ id: "fantasy", label: "Fantasy" },
	{ id: "sci-fi", label: "Science Fiction" },
	{ id: "mystery", label: "Mystery" },
	{ id: "thriller", label: "Thriller" },
	{ id: "romance", label: "Romance" },
	{ id: "historical", label: "Historical Fiction" },
];

interface SearchFiltersProps {
	onFilterChange?: (filters: ApiSearchFilters) => void;
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [completionStatus, setCompletionStatus] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("relevance");

	// Helper function to notify parent of filter changes
	const notifyFilterChange = (genres: string[], status: string) => {
		if (!onFilterChange) return;

		const apiFilters: ApiSearchFilters = {
			genre: genres,
			isComplete:
				status === "complete" ? true : status === "ongoing" ? false : undefined,
		};

		onFilterChange(apiFilters);
	};

	// Handle genre checkbox change
	const handleGenreChange = (genreId: string, checked: boolean) => {
		const newGenres = checked
			? [...selectedGenres, genreId]
			: selectedGenres.filter((id) => id !== genreId);

		setSelectedGenres(newGenres);
		notifyFilterChange(newGenres, completionStatus);
	};

	// Handle completion status change
	const handleStatusChange = (status: string) => {
		setCompletionStatus(status);
		notifyFilterChange(selectedGenres, status);
	};

	// Handle clear filters
	const clearFilters = () => {
		setSelectedGenres([]);
		setCompletionStatus("all");
		setSortBy("relevance");
		notifyFilterChange([], "all");
	};

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium mb-3">Genres</h3>
				<div className="space-y-2">
					{genres.map((genre) => (
						<div key={genre.id} className="flex items-center space-x-2">
							<StableCheckbox
								id={`genre-${genre.id}`}
								checked={selectedGenres.includes(genre.id)}
								onChange={(checked) => handleGenreChange(genre.id, checked)}
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
					onValueChange={handleStatusChange}
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
