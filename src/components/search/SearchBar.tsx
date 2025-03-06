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
				<Search className="absolute left-3 h-5 w-5 text-muted-foreground pointer-events-none" />
				<Input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for book series..."
					className="h-12 w-full rounded-full pl-10 pr-24"
				/>
				<Button
					type="submit"
					className="absolute right-1 rounded-full px-4 h-10"
					disabled={!query.trim()}
				>
					Search
				</Button>
			</div>
		</form>
	);
}
