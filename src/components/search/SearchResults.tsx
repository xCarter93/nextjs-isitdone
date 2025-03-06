"use client";

import React from "react";
import { BookVolume } from "@/lib/api/googleBooks";
import { BookCard } from "./BookCard";
import { FadeIn } from "@/components/animations/FadeIn";

interface SearchResultsProps {
	results: BookVolume[];
	isLoading?: boolean;
	error?: string | null;
}

export function SearchResults({
	results,
	isLoading = false,
	error = null,
}: SearchResultsProps) {
	if (isLoading) {
		return (
			<div className="w-full py-12 text-center">
				<div className="inline-block animate-pulse bg-muted h-6 w-24 rounded mb-4"></div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{Array.from({ length: 8 }).map((_, index) => (
						<div
							key={index}
							className="bg-card rounded-lg shadow-sm p-4 animate-pulse"
						>
							<div className="w-full h-48 bg-muted rounded mb-4"></div>
							<div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
							<div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
							<div className="h-3 bg-muted rounded w-1/4"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="w-full py-12 text-center">
				<h3 className="text-xl font-semibold mb-2">Error</h3>
				<p className="text-muted-foreground">{error}</p>
			</div>
		);
	}

	if (results.length === 0) {
		return (
			<div className="w-full py-12 text-center">
				<h3 className="text-xl font-semibold mb-2">No results found</h3>
				<p className="text-muted-foreground">
					Try adjusting your search or filters
				</p>
			</div>
		);
	}

	return (
		<div className="w-full py-8">
			<h2 className="text-2xl font-semibold mb-6">Search Results</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{results.map((book, index) => (
					<FadeIn key={book.id} delay={index * 0.05} direction="up">
						<BookCard book={book} />
					</FadeIn>
				))}
			</div>
		</div>
	);
}
