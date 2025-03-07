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
				<div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
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
			<div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
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
				<div className="flex flex-col md:flex-row gap-8 mb-16">
					{/* Cover Image */}
					<div className="w-full md:w-1/3 lg:w-1/4">
						<div className="aspect-[2/3] bg-muted/30 rounded-xl overflow-hidden shadow-md">
							{seriesInfo.books[0]?.volumeInfo.imageLinks?.thumbnail ? (
								<Image
									src={seriesInfo.books[0].volumeInfo.imageLinks.thumbnail}
									alt={seriesInfo.name}
									width={300}
									height={450}
									className="w-full h-full object-cover"
									priority
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
						<h1 className="text-3xl font-medium mb-2 tracking-tight">
							{seriesInfo.name}
						</h1>

						{seriesInfo.books[0]?.volumeInfo.authors && (
							<p className="text-lg text-muted-foreground mb-5">
								by {seriesInfo.books[0].volumeInfo.authors.join(", ")}
							</p>
						)}

						<div className="mb-8">{renderCompletionStatus()}</div>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
							<div className="bg-muted/20 p-5 rounded-xl">
								<h3 className="text-sm font-medium text-muted-foreground mb-1">
									Total Books
								</h3>
								<p className="text-2xl font-semibold">
									{seriesInfo.totalBooks}
								</p>
							</div>

							<div className="bg-muted/20 p-5 rounded-xl">
								<h3 className="text-sm font-medium text-muted-foreground mb-1">
									Published
								</h3>
								<p className="text-2xl font-semibold">
									{seriesInfo.publishedBooks}
								</p>
							</div>

							<div className="bg-muted/20 p-5 rounded-xl">
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

						<div className="prose prose-sm max-w-none mb-8 text-muted-foreground leading-relaxed">
							<p>
								{seriesInfo.books[0]?.volumeInfo.description ||
									"No description available."}
							</p>
						</div>

						<div className="flex flex-wrap gap-3">
							<Button className="rounded-full px-6">Track Progress</Button>
							<Button variant="outline" className="rounded-full px-6">
								Share Series
							</Button>
						</div>
					</div>
				</div>
			</FadeIn>

			<FadeIn delay={0.2}>
				<div className="mb-16">
					<h2 className="text-2xl font-medium mb-8 tracking-tight">
						Recommended Reading Order
					</h2>

					<div className="flex border-b mb-8">
						<button
							className={`px-5 py-3 font-medium text-sm transition-colors ${
								activeTab === "chronological"
									? "border-b-2 border-primary text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
							onClick={() => setActiveTab("chronological")}
						>
							Chronological
						</button>
						<button
							className={`px-5 py-3 font-medium text-sm transition-colors ${
								activeTab === "publication"
									? "border-b-2 border-primary text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
							onClick={() => setActiveTab("publication")}
						>
							Publication Order
						</button>
						<button
							className={`px-5 py-3 font-medium text-sm transition-colors ${
								activeTab === "recommended"
									? "border-b-2 border-primary text-foreground"
									: "text-muted-foreground hover:text-foreground"
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
					<h2 className="text-2xl font-medium mb-8 tracking-tight">
						Related Series
					</h2>

					<div className="text-center py-16 bg-muted/20 rounded-xl">
						<p className="text-muted-foreground">
							Related series will appear here
						</p>
					</div>
				</div>
			</FadeIn>
		</div>
	);
}
