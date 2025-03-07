"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar({ className = "" }: { className?: string }) {
	const [query, setQuery] = useState("");
	const router = useRouter();

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			if (query.trim()) {
				router.push(`/search?q=${encodeURIComponent(query.trim())}`);
			}
		},
		[query, router]
	);

	return (
		<form
			onSubmit={handleSubmit}
			className={`relative w-full max-w-2xl ${className}`}
		>
			<div className="relative flex items-center">
				<Search className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none" />
				<Input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for book series..."
					className="h-12 w-full rounded-full pl-11 pr-28 border-border/60 bg-muted/10 focus:bg-background focus:border-primary/30 focus:ring-primary/20 transition-colors"
				/>
				<Button
					type="submit"
					className="absolute right-1.5 rounded-full px-5 h-9 text-sm font-medium shadow-sm"
					disabled={!query.trim()}
				>
					Search
				</Button>
			</div>
		</form>
	);
}
