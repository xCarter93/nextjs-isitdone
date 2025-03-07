"use server";

import {
	searchBooks as apiSearchBooks,
	getBookDetails as apiGetBookDetails,
	getSeriesInfo as apiGetSeriesInfo,
	getAuthorBooks as apiGetAuthorBooks,
	getBooksBySeriesName as apiGetBooksBySeriesName,
	BookVolume,
	SeriesInfo,
	SearchFilters,
} from "../api/googleBooks";

/**
 * Search for books based on query and filters
 */
export async function searchBooks(
	query: string,
	filters?: SearchFilters
): Promise<BookVolume[]> {
	try {
		const results = await apiSearchBooks(query, filters);
		return results;
	} catch (error) {
		console.error("Error in searchBooks action:", error);
		throw new Error("Failed to search books. Please try again later.");
	}
}

/**
 * Get details for a specific book
 */
export async function getBookDetails(
	bookId: string
): Promise<BookVolume | null> {
	try {
		return await apiGetBookDetails(bookId);
	} catch (error) {
		console.error(`Error in getBookDetails action for ${bookId}:`, error);
		throw new Error("Failed to get book details. Please try again later.");
	}
}

/**
 * Get information about a book series
 */
export async function getSeriesInfo(
	seriesId: string
): Promise<SeriesInfo | null> {
	try {
		return await apiGetSeriesInfo(seriesId);
	} catch (error) {
		console.error(`Error in getSeriesInfo action for ${seriesId}:`, error);
		throw new Error(
			"Failed to get series information. Please try again later."
		);
	}
}

/**
 * Get books by a specific author
 */
export async function getAuthorBooks(
	authorName: string
): Promise<BookVolume[]> {
	try {
		return await apiGetAuthorBooks(authorName);
	} catch (error) {
		console.error(`Error in getAuthorBooks action for ${authorName}:`, error);
		throw new Error("Failed to get author books. Please try again later.");
	}
}

/**
 * Get books in a series by series name
 */
export async function getBooksBySeriesName(
	seriesName: string
): Promise<BookVolume[]> {
	try {
		return await apiGetBooksBySeriesName(seriesName);
	} catch (error) {
		console.error(
			`Error in getBooksBySeriesName action for ${seriesName}:`,
			error
		);
		throw new Error(
			"Failed to get books by series name. Please try again later."
		);
	}
}
