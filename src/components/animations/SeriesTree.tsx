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
			className={`book-node transition-all duration-300 ease-in-out p-4 rounded-lg border ${
				isActive
					? "scale-105 shadow-lg border-primary"
					: "scale-100 border-border"
			}`}
			onClick={onClick}
			style={{ animationDelay: `${index * 0.1}s` }}
		>
			<div className="flex items-center gap-4">
				<div className="w-16 h-24 bg-muted flex items-center justify-center overflow-hidden rounded">
					{book.volumeInfo.imageLinks?.thumbnail ? (
						<Image
							src={book.volumeInfo.imageLinks.thumbnail}
							alt={book.volumeInfo.title}
							width={64}
							height={96}
							className="w-full h-full object-cover"
						/>
					) : (
						<span className="text-xs text-center p-1">
							{book.volumeInfo.title}
						</span>
					)}
				</div>
				<div>
					<h3 className="font-medium">{book.volumeInfo.title}</h3>
					<p className="text-sm text-muted-foreground">
						{book.volumeInfo.publishedDate?.split("-")[0] || "Unknown date"}
					</p>
				</div>
			</div>

			{isActive && (
				<div className="book-details mt-4 transition-all duration-300 ease-in-out opacity-100 h-auto">
					<p className="text-sm mb-2">
						{book.volumeInfo.description?.substring(0, 150)}
						{book.volumeInfo.description &&
						book.volumeInfo.description.length > 150
							? "..."
							: ""}
					</p>
					<div className="flex justify-end">
						<Button variant="outline" size="sm">
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
			<div className="text-center py-8">No books found in this series.</div>
		);
	}

	return (
		<div className={`series-tree ${className}`}>
			<div className="flex flex-col gap-4">
				{books.map((book, index) => (
					<div key={book.id} className="relative">
						{index > 0 && (
							<div className="absolute left-8 -top-4 w-0.5 h-4 bg-border"></div>
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
