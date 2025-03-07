"use client";

import { SearchForm } from "@/components/search/SearchForm";
import { Button } from "@/components/ui/button";

export function HeroSection() {
	return (
		<section className="relative py-20 md:py-32 overflow-hidden w-full">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
				<h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
					Is Your Book Series <span className="text-primary">Done Yet?</span>
				</h1>
				<p
					className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in"
					style={{ animationDelay: "0.1s" }}
				>
					Track completion status, find reading orders, and discover new book
					series with our comprehensive database.
				</p>
				<div
					className="mt-10 w-full max-w-2xl animate-fade-in-up"
					style={{ animationDelay: "0.2s" }}
				>
					<SearchForm />
				</div>
				<div
					className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up"
					style={{ animationDelay: "0.3s" }}
				>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-10 w-10 rounded-full bg-primary/10 text-primary font-bold border-none"
						>
							1
						</Button>
						<p className="text-sm">Search for any book series</p>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-10 w-10 rounded-full bg-primary/10 text-primary font-bold border-none"
						>
							2
						</Button>
						<p className="text-sm">Check if it&apos;s complete</p>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-10 w-10 rounded-full bg-primary/10 text-primary font-bold border-none"
						>
							3
						</Button>
						<p className="text-sm">Find the best reading order</p>
					</div>
				</div>
			</div>

			{/* Background decoration */}
			<div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
			<div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
		</section>
	);
}
