import { BookOpen, Search, ListChecks, BookMarked } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function FeaturesSection() {
	return (
		<section className="py-20 bg-muted/30 w-full">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
						Everything You Need to Know About Book Series
					</h2>
					<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
						Our platform provides comprehensive information to help you navigate
						the world of book series.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Feature 1 */}
					<Card className="flex flex-col items-center text-center">
						<CardHeader>
							<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
								<Search className="h-6 w-6 text-primary" />
							</div>
							<CardTitle>Powerful Search</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Find any book series with our comprehensive search
								functionality.
							</CardDescription>
						</CardContent>
					</Card>

					{/* Feature 2 */}
					<Card className="flex flex-col items-center text-center">
						<CardHeader>
							<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
								<ListChecks className="h-6 w-6 text-primary" />
							</div>
							<CardTitle>Completion Status</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Know at a glance if a series is complete or still ongoing.
							</CardDescription>
						</CardContent>
					</Card>

					{/* Feature 3 */}
					<Card className="flex flex-col items-center text-center">
						<CardHeader>
							<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
								<BookOpen className="h-6 w-6 text-primary" />
							</div>
							<CardTitle>Reading Orders</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Get recommended reading orders for complex book series.
							</CardDescription>
						</CardContent>
					</Card>

					{/* Feature 4 */}
					<Card className="flex flex-col items-center text-center">
						<CardHeader>
							<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
								<BookMarked className="h-6 w-6 text-primary" />
							</div>
							<CardTitle>Recommendations</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Discover new series based on your reading preferences.
							</CardDescription>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
