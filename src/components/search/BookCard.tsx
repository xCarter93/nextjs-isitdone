"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookVolume } from "@/lib/api/googleBooks";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface BookCardProps {
	book: BookVolume;
}

export function BookCard({ book }: BookCardProps) {
	const { volumeInfo } = book;

	// Handle case where volumeInfo is undefined
	if (!volumeInfo) {
		return (
			<Card className="h-full overflow-hidden">
				<CardContent className="p-4">
					<h3 className="font-medium text-base mb-1">Missing Book Data</h3>
					<p className="text-sm text-muted-foreground">ID: {book.id}</p>
				</CardContent>
			</Card>
		);
	}

	// Extract year from published date if available
	const publishedYear = volumeInfo.publishedDate
		? volumeInfo.publishedDate.split("-")[0]
		: "Unknown";

	// Format authors list
	const authors = volumeInfo.authors
		? volumeInfo.authors.join(", ")
		: "Unknown Author";

	// Get cover image or placeholder
	const coverImage =
		volumeInfo.imageLinks?.thumbnail ||
		"https://via.placeholder.com/128x192?text=No+Cover";

	// Calculate rating stars
	const rating = volumeInfo.averageRating || 0;
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;

	return (
		<Link href={`/series/${book.id}`} className="block h-full">
			<Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
				<div className="relative pt-[150%] bg-muted/30">
					<Image
						src={coverImage}
						alt={volumeInfo.title || "Book cover"}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover"
						priority
					/>
				</div>

				<CardContent className="p-4">
					<h3 className="font-medium text-base line-clamp-2 mb-1 leading-tight">
						{volumeInfo.title || "Untitled Book"}
					</h3>

					<p className="text-sm text-muted-foreground line-clamp-1 mb-3">
						{authors}
					</p>

					{rating > 0 && (
						<div className="flex items-center mb-2">
							<div className="flex text-accent mr-2">
								{[...Array(5)].map((_, i) => (
									<span key={i} className="text-lg">
										{i < fullStars
											? "★"
											: i === fullStars && hasHalfStar
											? "⯨"
											: "☆"}
									</span>
								))}
							</div>
							<span className="text-xs text-muted-foreground">
								{rating.toFixed(1)}
							</span>
						</div>
					)}
				</CardContent>

				<CardFooter className="px-4 py-3 border-t border-border/50 bg-muted/10 flex justify-between items-center">
					<span className="text-xs font-medium text-muted-foreground">
						{publishedYear}
					</span>

					{volumeInfo.categories && volumeInfo.categories.length > 0 && (
						<span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
							{volumeInfo.categories[0]}
						</span>
					)}
				</CardFooter>
			</Card>
		</Link>
	);
}
