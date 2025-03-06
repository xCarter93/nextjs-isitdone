import React from "react";
import { getSeriesInfo } from "@/lib/api/googleBooks";
import { SeriesDetail } from "@/components/series/SeriesDetail";
import { notFound } from "next/navigation";

interface SeriesPageProps {
	params: {
		id: string;
	};
}

export default async function SeriesPage({ params }: SeriesPageProps) {
	const { id } = params;

	// Fetch series information
	const seriesInfo = await getSeriesInfo(id);

	// If series not found, show 404 page
	if (!seriesInfo) {
		notFound();
	}

	return (
		<main className="flex min-h-screen flex-col items-center">
			<section className="py-12 w-full">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<SeriesDetail seriesInfo={seriesInfo} />
				</div>
			</section>
		</main>
	);
}
