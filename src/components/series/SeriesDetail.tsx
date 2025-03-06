"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SeriesInfo } from "@/lib/api/googleBooks";
import { SeriesTree } from "@/components/animations/SeriesTree";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";

interface SeriesDetailProps {
	seriesInfo: SeriesInfo;
}

export function SeriesDetail({ seriesInfo }: SeriesDetailProps) {
	const [activeTab, setActiveTab] = useState<
		"chronological" | "publication" | "recommended"
	>("chronological");

	const renderCompletionStatus = () => {
		if (seriesInfo.isComplete) {
			return (
				<div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
					<svg
						className="w-4 h-4 mr-1.5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						></path>
					</svg>
					Complete Series
				</div>
			);
		}

		return (
			<div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
				<svg
					className="w-4 h-4 mr-1.5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
						clipRule="evenodd"
					></path>
				</svg>
				Ongoing Series
			</div>
		);
	};

	return (
		<div className="w-full">
			<FadeIn>
				<div className="flex flex-col md:flex-row gap-8 mb-12">
					{/* Cover Image */}
					<div className="w-full md:w-1/3 lg:w-1/4">
						<div className="aspect-[2/3] bg-muted rounded-lg overflow-hidden shadow-md">
							{seriesInfo.books[0]?.volumeInfo.imageLinks?.thumbnail ? (
								<Image
									src={seriesInfo.books[0].volumeInfo.imageLinks.thumbnail}
									alt={seriesInfo.name}
									width={300}
									height={450}
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center p-4 text-center">
									<span>{seriesInfo.name}</span>
								</div>
							)}
						</div>
					</div>

					{/* Series Info */}
					<div className="flex-1">
						<h1 className="text-3xl font-bold mb-2">{seriesInfo.name}</h1>

						{seriesInfo.books[0]?.volumeInfo.authors && (
							<p className="text-lg text-muted-foreground mb-4">
								by {seriesInfo.books[0].volumeInfo.authors.join(", ")}
							</p>
						)}

						<div className="mb-6">{renderCompletionStatus()}</div>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
							<div className="bg-muted/30 p-4 rounded-lg">
								<h3 className="text-sm font-medium text-muted-foreground mb-1">
									Total Books
								</h3>
								<p className="text-2xl font-semibold">
									{seriesInfo.totalBooks}
								</p>
							</div>

							<div className="bg-muted/30 p-4 rounded-lg">
								<h3 className="text-sm font-medium text-muted-foreground mb-1">
									Published
								</h3>
								<p className="text-2xl font-semibold">
									{seriesInfo.publishedBooks}
								</p>
							</div>

							<div className="bg-muted/30 p-4 rounded-lg">
								<h3 className="text-sm font-medium text-muted-foreground mb-1">
									First Published
								</h3>
								<p className="text-2xl font-semibold">
									{seriesInfo.books[0]?.volumeInfo.publishedDate?.split(
										"-"
									)[0] || "Unknown"}
								</p>
							</div>
						</div>

						<div className="prose prose-sm max-w-none mb-6">
							<p>
								{seriesInfo.books[0]?.volumeInfo.description ||
									"No description available."}
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							<Button>Track Progress</Button>
							<Button variant="outline">Share Series</Button>
						</div>
					</div>
				</div>
			</FadeIn>

			<FadeIn delay={0.2}>
				<div className="mb-12">
					<h2 className="text-2xl font-semibold mb-6">
						Recommended Reading Order
					</h2>

					<div className="flex border-b mb-6">
						<button
							className={`px-4 py-2 font-medium text-sm ${
								activeTab === "chronological"
									? "border-b-2 border-primary"
									: "text-muted-foreground"
							}`}
							onClick={() => setActiveTab("chronological")}
						>
							Chronological
						</button>
						<button
							className={`px-4 py-2 font-medium text-sm ${
								activeTab === "publication"
									? "border-b-2 border-primary"
									: "text-muted-foreground"
							}`}
							onClick={() => setActiveTab("publication")}
						>
							Publication Order
						</button>
						<button
							className={`px-4 py-2 font-medium text-sm ${
								activeTab === "recommended"
									? "border-b-2 border-primary"
									: "text-muted-foreground"
							}`}
							onClick={() => setActiveTab("recommended")}
						>
							Author Recommended
						</button>
					</div>

					<SeriesTree books={seriesInfo.books} />
				</div>
			</FadeIn>

			<FadeIn delay={0.4}>
				<div>
					<h2 className="text-2xl font-semibold mb-6">Related Series</h2>

					<div className="text-center py-8 bg-muted/30 rounded-lg">
						<p className="text-muted-foreground">
							Related series will appear here
						</p>
					</div>
				</div>
			</FadeIn>
		</div>
	);
}
