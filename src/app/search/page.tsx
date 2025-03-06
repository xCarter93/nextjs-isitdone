"use client";

import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchFilters } from "@/components/search/SearchFilters";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";

function SearchContent() {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";

	return (
		<section className="py-10 w-full">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold mb-6">
					{query ? `Search results for "${query}"` : "Search for Book Series"}
				</h1>

				<div className="mb-8">
					<SearchBar />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Filters sidebar */}
					<div className="md:col-span-1">
						<Card>
							<CardContent className="p-6">
								<h2 className="text-xl font-semibold mb-4">Filters</h2>
								<SearchFilters />
							</CardContent>
						</Card>
					</div>

					{/* Search results */}
					<div className="md:col-span-3">
						{query ? (
							<div>
								<p className="text-muted-foreground mb-4">
									Showing results for &ldquo;{query}&rdquo;...
								</p>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
									{/* This would be populated with actual search results */}
									<Card className="overflow-hidden">
										<div className="aspect-[2/3] bg-muted/20 flex items-center justify-center">
											<p className="text-muted-foreground">Result 1</p>
										</div>
										<CardContent className="p-4">
											<h3 className="font-semibold">Book Series Title</h3>
											<p className="text-sm text-muted-foreground">
												Author Name
											</p>
										</CardContent>
									</Card>
									<Card className="overflow-hidden">
										<div className="aspect-[2/3] bg-muted/20 flex items-center justify-center">
											<p className="text-muted-foreground">Result 2</p>
										</div>
										<CardContent className="p-4">
											<h3 className="font-semibold">Book Series Title</h3>
											<p className="text-sm text-muted-foreground">
												Author Name
											</p>
										</CardContent>
									</Card>
									<Card className="overflow-hidden">
										<div className="aspect-[2/3] bg-muted/20 flex items-center justify-center">
											<p className="text-muted-foreground">Result 3</p>
										</div>
										<CardContent className="p-4">
											<h3 className="font-semibold">Book Series Title</h3>
											<p className="text-sm text-muted-foreground">
												Author Name
											</p>
										</CardContent>
									</Card>
								</div>
							</div>
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
