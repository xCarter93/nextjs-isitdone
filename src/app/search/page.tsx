"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { SearchForm } from "@/components/search/SearchForm";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	BookVolume,
	SearchFilters as ApiSearchFilters,
} from "@/lib/api/googleBooks";
import { searchBooks } from "@/lib/actions/bookActions";

function SearchContent() {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";

	const [results, setResults] = useState<BookVolume[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState<ApiSearchFilters>({
		genre: [],
		yearStart: undefined,
		yearEnd: undefined,
		isComplete: undefined,
	});

	// Function to perform search with current filters - memoized to prevent recreating on every render
	const performSearch = useCallback(
		async (searchQuery: string, searchFilters: ApiSearchFilters) => {
			if (!searchQuery) return;

			setIsLoading(true);
			setError(null);

			try {
				const books = await searchBooks(searchQuery, searchFilters);
				setResults(books);
			} catch (err) {
				console.error("Error fetching books:", err);
				setError("Failed to fetch books. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	// Handle search results from the SearchForm component
	const handleSearchResults = useCallback(
		(
			searchResults: BookVolume[],
			searchIsLoading: boolean,
			searchError: string | null
		) => {
			setResults(searchResults);
			setIsLoading(searchIsLoading);
			setError(searchError);
		},
		[]
	);

	// Handle filter changes
	const handleFilterChange = useCallback(
		(newFilters: ApiSearchFilters) => {
			setFilters(newFilters);
			// When filters change, perform a new search with current query
			if (query) {
				performSearch(query, newFilters);
			}
		},
		[query, performSearch]
	);

	// Initial search when component mounts or query changes
	useEffect(() => {
		if (query) {
			// Use the current filters state for the initial search
			performSearch(query, filters);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, performSearch]); // Intentionally excluding filters to prevent infinite loops

	return (
		<section className="py-10 w-full">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold mb-6">
					{query ? `Search results for "${query}"` : "Search for Book Series"}
				</h1>

				<div className="mb-8">
					<SearchForm
						initialQuery={query}
						filters={filters}
						onSearchResults={handleSearchResults}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Filters sidebar */}
					<div className="md:col-span-1">
						<Card>
							<CardContent className="p-6">
								<h2 className="text-xl font-semibold mb-4">Filters</h2>
								<SearchFilters onFilterChange={handleFilterChange} />
							</CardContent>
						</Card>
					</div>

					{/* Search results */}
					<div className="md:col-span-3">
						{query ? (
							<SearchResults
								results={results}
								isLoading={isLoading}
								error={error}
							/>
						) : (
							<div className="text-center p-12 border border-dashed rounded-lg">
								<p className="text-muted-foreground">
									Enter a search term to find book series
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default function SearchPage() {
	return (
		<Suspense
			fallback={
				<section className="py-10 w-full">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						Loading search results...
					</div>
				</section>
			}
		>
			<SearchContent />
		</Suspense>
	);
}
