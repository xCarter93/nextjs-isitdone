import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Sample data for popular series
const popularSeries = [
	{
		id: "1",
		title: "Harry Potter",
		author: "J.K. Rowling",
		coverUrl:
			"https://images.unsplash.com/photo-1626618012641-bfbca5a31239?q=80&w=400&h=600&auto=format&fit=crop",
		isComplete: true,
		books: 7,
	},
	{
		id: "2",
		title: "A Song of Ice and Fire",
		author: "George R.R. Martin",
		coverUrl:
			"https://images.unsplash.com/photo-1518744386442-2d48ac47a7eb?q=80&w=400&h=600&auto=format&fit=crop",
		isComplete: false,
		books: 5,
	},
	{
		id: "3",
		title: "The Lord of the Rings",
		author: "J.R.R. Tolkien",
		coverUrl:
			"https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=400&h=600&auto=format&fit=crop",
		isComplete: true,
		books: 3,
	},
	{
		id: "4",
		title: "The Stormlight Archive",
		author: "Brandon Sanderson",
		coverUrl:
			"https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&h=600&auto=format&fit=crop",
		isComplete: false,
		books: 4,
	},
];

export function PopularSeriesSection() {
	return (
		<section className="py-20 w-full">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
					<div>
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
							Popular Book Series
						</h2>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
							Explore some of the most popular book series tracked on our
							platform.
						</p>
					</div>
					<Button asChild className="mt-4 md:mt-0">
						<Link href="/search">View All Series</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{popularSeries.map((series) => (
						<Link
							key={series.id}
							href={`/series/${series.id}`}
							className="block"
						>
							<Card className="h-full overflow-hidden group hover:shadow-md transition-all">
								<div className="aspect-[2/3] relative overflow-hidden">
									<Image
										src={series.coverUrl}
										alt={`${series.title} cover`}
										fill
										className="object-cover transition-transform group-hover:scale-105"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
									<div className="absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-medium bg-background/80">
										{series.isComplete ? (
											<span className="text-green-500">Complete</span>
										) : (
											<span className="text-amber-500">Ongoing</span>
										)}
									</div>
								</div>
								<CardContent className="p-4">
									<h3 className="font-semibold line-clamp-1">{series.title}</h3>
									<p className="text-sm text-muted-foreground mt-1">
										{series.author}
									</p>
								</CardContent>
								<CardFooter className="p-4 pt-0">
									<p className="text-xs text-muted-foreground">
										{series.books} book{series.books > 1 ? "s" : ""}
									</p>
								</CardFooter>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
