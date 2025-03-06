import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
	return (
		<section className="py-20 bg-primary/5 w-full">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
						Ready to Discover Your Next Reading Adventure?
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Get personalized book series recommendations based on your
						preferences and reading history.
					</p>
					<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild size="lg">
							<Link href="/recommendations">Get Recommendations</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link href="/search">Browse All Series</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
