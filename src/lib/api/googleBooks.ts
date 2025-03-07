// Google Books API Integration
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY || "YOUR_API_KEY";
const BASE_URL = "https://www.googleapis.com/books/v1";

// Types for API responses
export interface BookVolume {
	id: string;
	volumeInfo: {
		title: string;
		authors?: string[];
		publishedDate?: string;
		description?: string;
		imageLinks?: {
			thumbnail?: string;
			smallThumbnail?: string;
		};
		categories?: string[];
		averageRating?: number;
		ratingsCount?: number;
		industryIdentifiers?: Array<{
			type: string;
			identifier: string;
		}>;
		publisher?: string;
		pageCount?: number;
		language?: string;
		previewLink?: string;
		infoLink?: string;
		canonicalVolumeLink?: string;
		subtitle?: string;
	};
	saleInfo?: {
		listPrice?: {
			amount: number;
			currencyCode: string;
		};
		retailPrice?: {
			amount: number;
			currencyCode: string;
		};
		buyLink?: string;
		isEbook?: boolean;
	};
	accessInfo?: {
		webReaderLink?: string;
		publicDomain?: boolean;
		epub?: {
			isAvailable: boolean;
			downloadLink?: string;
		};
		pdf?: {
			isAvailable: boolean;
			downloadLink?: string;
		};
	};
}

export interface GoogleBooksResponse {
	kind: string;
	totalItems: number;
	items?: BookVolume[];
}

export interface SeriesInfo {
	id: string;
	name: string;
	books: BookVolume[];
	isComplete: boolean;
	totalBooks: number;
	publishedBooks: number;
}

export interface SearchFilters {
	genre?: string[];
	yearStart?: number;
	yearEnd?: number;
	isComplete?: boolean;
}

// Helper function to build search query with filters
function buildSearchQuery(query: string, filters?: SearchFilters): string {
	let searchQuery = query;

	// Add genre filter
	if (filters?.genre?.length) {
		const genreQueries = filters.genre.map((genre) => `subject:${genre}`);
		searchQuery += ` ${genreQueries.join(" ")}`;
	}

	// Add year range filter
	if (filters?.yearStart || filters?.yearEnd) {
		if (filters.yearStart && filters.yearEnd) {
			searchQuery += ` publishedDate:${filters.yearStart}-${filters.yearEnd}`;
		} else if (filters.yearStart) {
			searchQuery += ` publishedDate:>=${filters.yearStart}`;
		} else if (filters.yearEnd) {
			searchQuery += ` publishedDate:<=${filters.yearEnd}`;
		}
	}

	return searchQuery;
}

// Search for books based on user input
export async function searchBooks(
	query: string,
	filters?: SearchFilters
): Promise<BookVolume[]> {
	try {
		const searchQuery = buildSearchQuery(query, filters);

		const url = new URL(`${BASE_URL}/volumes`);
		url.searchParams.append("q", searchQuery);
		url.searchParams.append("maxResults", "40"); // Increase from default 10
		url.searchParams.append("key", API_KEY);

		const response = await fetch(url.toString());

		if (!response.ok) {
			throw new Error(
				`Google Books API error: ${response.status} ${response.statusText}`
			);
		}

		const data: GoogleBooksResponse = await response.json();

		return data.items || [];
	} catch (error) {
		console.error("Error searching books:", error);
		throw error;
	}
}

// Retrieve detailed information about a specific book
export async function getBookDetails(
	bookId: string
): Promise<BookVolume | null> {
	try {
		const url = `${BASE_URL}/volumes/${bookId}?key=${API_KEY}`;
		const response = await fetch(url);

		if (!response.ok) {
			if (response.status === 404) {
				return null;
			}
			throw new Error(
				`Google Books API error: ${response.status} ${response.statusText}`
			);
		}

		const data: BookVolume = await response.json();
		return data;
	} catch (error) {
		console.error(`Error getting book details for ${bookId}:`, error);
		throw error;
	}
}

// Helper function to determine if books are in the same series
function booksInSameSeries(books: BookVolume[]): boolean {
	// This is a simplified implementation
	// In a real app, you might use more sophisticated logic or external data

	// Check if books have similar titles that follow patterns like "Book 1: Title", "Book 2: Title"
	const titlePattern = /^(.*?)\s+(\d+)[\s:]+(.*)$/i;
	const seriesTitles = books
		.map((book) => {
			const match = book.volumeInfo.title.match(titlePattern);
			return match ? match[1] : null;
		})
		.filter(Boolean);

	// If we have at least 2 books with series-like titles and they match
	if (seriesTitles.length >= 2) {
		const firstSeries = seriesTitles[0];
		return seriesTitles.every((series) => series === firstSeries);
	}

	return false;
}

// Aggregate information about books in a series
export async function getSeriesInfo(
	seriesId: string
): Promise<SeriesInfo | null> {
	try {
		// First, get the details of the initial book
		const initialBook = await getBookDetails(seriesId);
		if (!initialBook) {
			return null;
		}

		// Extract potential series name from the title
		// This is a simplified approach - in reality, you might need more sophisticated logic
		const seriesName = initialBook.volumeInfo.title.split(":")[0].trim();

		// Search for other books in the same series
		// We'll use the author and potential series name as search criteria
		const author = initialBook.volumeInfo.authors?.[0];
		if (!author) {
			// If no author, just return this book as a standalone
			return {
				id: seriesId,
				name: seriesName,
				books: [initialBook],
				isComplete: true, // Assume complete if only one book
				totalBooks: 1,
				publishedBooks: 1,
			};
		}

		// Search for books by the same author
		const authorBooks = await getAuthorBooks(author);

		// Filter books that might be in the same series
		// This is a simplified approach - in reality, you might need more sophisticated logic
		const seriesBooks = authorBooks.filter(
			(book) =>
				book.volumeInfo.title.includes(seriesName) ||
				(initialBook.volumeInfo.categories &&
					book.volumeInfo.categories &&
					initialBook.volumeInfo.categories.some((cat) =>
						book.volumeInfo.categories?.includes(cat)
					))
		);

		// If we couldn't find related books, just return the initial book
		if (seriesBooks.length <= 1) {
			return {
				id: seriesId,
				name: seriesName,
				books: [initialBook],
				isComplete: true, // Assume complete if only one book
				totalBooks: 1,
				publishedBooks: 1,
			};
		}

		// Check if the books appear to be in the same series based on title patterns
		const isSeries = booksInSameSeries(seriesBooks);

		// Sort books by publication date
		seriesBooks.sort((a, b) => {
			const dateA = a.volumeInfo.publishedDate || "";
			const dateB = b.volumeInfo.publishedDate || "";
			return dateA.localeCompare(dateB);
		});

		// Determine if the series is complete
		// This is a simplified approach - in reality, you might need external data
		const currentYear = new Date().getFullYear();
		const latestBook = seriesBooks[seriesBooks.length - 1];
		const latestBookYear = latestBook.volumeInfo.publishedDate
			? parseInt(latestBook.volumeInfo.publishedDate.split("-")[0])
			: 0;

		// If the latest book was published more than 3 years ago, assume the series is complete
		const isComplete = latestBookYear > 0 && currentYear - latestBookYear > 3;

		return {
			id: seriesId,
			name: seriesName,
			books: seriesBooks,
			isComplete: isSeries ? isComplete : true, // If not a series, mark as complete
			totalBooks: seriesBooks.length,
			publishedBooks: seriesBooks.length,
		};
	} catch (error) {
		console.error(`Error getting series info for ${seriesId}:`, error);
		throw error;
	}
}

// Get all books by a specific author
export async function getAuthorBooks(
	authorName: string
): Promise<BookVolume[]> {
	try {
		const url = new URL(`${BASE_URL}/volumes`);
		url.searchParams.append("q", `inauthor:"${authorName}"`);
		url.searchParams.append("maxResults", "40"); // Increase from default 10
		url.searchParams.append("key", API_KEY);

		const response = await fetch(url.toString());

		if (!response.ok) {
			throw new Error(
				`Google Books API error: ${response.status} ${response.statusText}`
			);
		}

		const data: GoogleBooksResponse = await response.json();
		return data.items || [];
	} catch (error) {
		console.error(`Error getting books by author ${authorName}:`, error);
		throw error;
	}
}

// Get books in a series by series name
export async function getBooksBySeriesName(
	seriesName: string
): Promise<BookVolume[]> {
	try {
		const url = new URL(`${BASE_URL}/volumes`);
		url.searchParams.append("q", `intitle:"${seriesName}"`);
		url.searchParams.append("maxResults", "40");
		url.searchParams.append("key", API_KEY);

		const response = await fetch(url.toString());

		if (!response.ok) {
			throw new Error(
				`Google Books API error: ${response.status} ${response.statusText}`
			);
		}

		const data: GoogleBooksResponse = await response.json();
		return data.items || [];
	} catch (error) {
		console.error(`Error getting books in series ${seriesName}:`, error);
		throw error;
	}
}
