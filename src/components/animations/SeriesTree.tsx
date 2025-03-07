"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookVolume } from "@/lib/api/googleBooks";
import { Button } from "@/components/ui/button";

interface BookNodeProps {
	book: BookVolume;
	index: number;
	isActive: boolean;
	onClick: () => void;
}

const BookNode: React.FC<BookNodeProps> = ({
	book,
	index,
	isActive,
	onClick,
}) => {
	return (
		<div
			className={`book-node transition-all duration-300 ease-in-out p-5 rounded-xl border ${
				isActive
					? "scale-[1.02] shadow-lg border-primary/30 bg-accent/5"
					: "scale-100 border-border hover:border-primary/20 hover:bg-muted/10"
			}`}
			onClick={onClick}
			style={{ animationDelay: `${index * 0.1}s` }}
		>
			<div className="flex items-center gap-5">
				<div className="w-20 h-28 bg-muted/30 flex items-center justify-center overflow-hidden rounded-lg shadow-sm">
					{book.volumeInfo.imageLinks?.thumbnail ? (
						<Image
							src={book.volumeInfo.imageLinks.thumbnail}
							alt={book.volumeInfo.title}
							width={80}
							height={112}
							className="w-full h-full object-cover"
						/>
					) : (
						<span className="text-xs text-center p-1">
							{book.volumeInfo.title}
						</span>
					)}
				</div>
				<div className="flex-1">
					<h3 className="font-medium text-base leading-tight mb-1">
						{book.volumeInfo.title}
					</h3>
					<div className="flex items-center gap-3 mb-1">
						<p className="text-sm text-muted-foreground">
							{book.volumeInfo.publishedDate?.split("-")[0] || "Unknown date"}
						</p>
						{book.volumeInfo.averageRating && (
							<div className="flex items-center text-accent">
								<span className="text-sm mr-1">★</span>
								<span className="text-xs text-muted-foreground">
									{book.volumeInfo.averageRating.toFixed(1)}
								</span>
							</div>
						)}
					</div>
					{book.volumeInfo.authors && (
						<p className="text-sm text-muted-foreground">
							by {book.volumeInfo.authors.join(", ")}
						</p>
					)}
				</div>
			</div>

			{isActive && (
				<div className="book-details mt-5 pt-5 border-t border-border/50 transition-all duration-300 ease-in-out opacity-100 h-auto">
					<p className="text-sm mb-4 leading-relaxed text-muted-foreground">
						{book.volumeInfo.description?.substring(0, 200)}
						{book.volumeInfo.description &&
						book.volumeInfo.description.length > 200
							? "..."
							: ""}
					</p>
					<div className="flex justify-end">
						<Button variant="outline" size="sm" className="text-xs">
							View Details
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

interface SeriesTreeProps {
	books: BookVolume[];
	className?: string;
}

export function SeriesTree({ books, className = "" }: SeriesTreeProps) {
	const [activeBookId, setActiveBookId] = useState<string | null>(null);

	const toggleBook = (bookId: string) => {
		setActiveBookId(activeBookId === bookId ? null : bookId);
	};

	if (!books || books.length === 0) {
		return (
			<div className="text-center py-12 bg-muted/20 rounded-xl">
				<p className="text-muted-foreground">No books found in this series.</p>
			</div>
		);
	}

	return (
		<div className={`series-tree ${className}`}>
			<div className="flex flex-col gap-4">
				{books.map((book, index) => (
					<div key={book.id} className="relative">
						{index > 0 && (
							<div className="absolute left-10 -top-4 w-0.5 h-4 bg-border"></div>
						)}
						<BookNode
							book={book}
							index={index}
							isActive={activeBookId === book.id}
							onClick={() => toggleBook(book.id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
