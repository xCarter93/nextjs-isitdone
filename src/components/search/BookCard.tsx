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

	return (
		<Link href={`/series/${book.id}`} className="block h-full">
			<Card className="h-full transition-all duration-300 hover:shadow-md">
				<CardContent className="p-4">
					<div className="aspect-[2/3] w-full bg-muted rounded overflow-hidden mb-4">
						<Image
							src={coverImage}
							alt={volumeInfo.title}
							width={128}
							height={192}
							className="w-full h-full object-cover"
						/>
					</div>

					<h3 className="font-medium line-clamp-2 mb-1">{volumeInfo.title}</h3>

					<p className="text-sm text-muted-foreground line-clamp-1 mb-2">
						{authors}
					</p>

					<div className="flex items-center justify-between">
						<span className="text-xs bg-muted px-2 py-1 rounded">
							{publishedYear}
						</span>

						{volumeInfo.averageRating && (
							<span className="text-xs flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-4 h-4 text-yellow-500 mr-1"
								>
									<path
										fillRule="evenodd"
										d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
										clipRule="evenodd"
									/>
								</svg>
								{volumeInfo.averageRating.toFixed(1)}
							</span>
						)}
					</div>
				</CardContent>

				<CardFooter className="p-4 pt-0">
					<div className="w-full">
						{volumeInfo.categories && volumeInfo.categories.length > 0 && (
							<div className="flex flex-wrap gap-1">
								{volumeInfo.categories.slice(0, 2).map((category, index) => (
									<span
										key={index}
										className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
									>
										{category}
									</span>
								))}
							</div>
						)}
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}
