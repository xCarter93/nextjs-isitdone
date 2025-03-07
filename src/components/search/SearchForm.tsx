"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	BookVolume,
	SearchFilters as ApiSearchFilters,
} from "@/lib/api/googleBooks";
import { searchBooks } from "@/lib/actions/bookActions";

interface SearchFormProps {
	initialQuery?: string;
	filters?: ApiSearchFilters;
	onSearchResults?: (
		results: BookVolume[],
		isLoading: boolean,
		error: string | null
	) => void;
}

export function SearchForm({
	initialQuery = "",
	filters = {},
	onSearchResults,
}: SearchFormProps) {
	// Only use initialQuery as the initial state, don't update it when initialQuery changes
	const [query, setQuery] = useState(initialQuery);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// This function will be called when the form is submitted
	async function handleSubmit(formData: FormData) {
		// Get the search query from the form data
		const searchQuery = formData.get("query") as string;

		if (!searchQuery?.trim()) return;

		// If we're just navigating to the search page
		if (!onSearchResults) {
			router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
			return;
		}

		// If we're handling the search results directly
		setIsLoading(true);

		try {
			// Call the server action directly with the form data and filters
			const results = await searchBooks(searchQuery, filters);
			onSearchResults(results, false, null);
		} catch (error) {
			console.error("Search error:", error);
			onSearchResults([], false, "Failed to search books. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form action={handleSubmit} className="relative w-full max-w-2xl">
			<div className="relative flex items-center">
				<Search className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none" />
				<Input
					type="text"
					name="query"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for book series..."
					className="h-12 w-full rounded-full pl-11 pr-28 border-border/60 bg-muted/10 focus:bg-background focus:border-primary/30 focus:ring-primary/20 transition-colors"
				/>
				<Button
					type="submit"
					className="absolute right-1.5 rounded-full px-5 h-9 text-sm font-medium shadow-sm"
					disabled={!query.trim() || isLoading}
				>
					{isLoading ? "Searching..." : "Search"}
				</Button>
			</div>
		</form>
	);
}
