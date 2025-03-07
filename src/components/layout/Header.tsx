"use client";

import Link from "next/link";
import { Menu, Moon, Sun, Search, BookOpen } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center gap-2">
						<BookOpen className="h-6 w-6 text-primary" />
						<span className="text-xl font-medium tracking-tight">IsItDone</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-8">
					<Link
						href="/search"
						className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary"
					>
						<Search className="h-4 w-4" />
						Search
					</Link>
					<Link
						href="/recommendations"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						Recommendations
					</Link>
					<Link
						href="/about"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						About
					</Link>
					<Button
						variant="outline"
						size="icon"
						onClick={toggleTheme}
						className="rounded-full border-border/60 ml-2"
					>
						{theme === "dark" ? (
							<Sun className="h-4 w-4" />
						) : (
							<Moon className="h-4 w-4" />
						)}
						<span className="sr-only">Toggle theme</span>
					</Button>
				</nav>

				{/* Mobile Navigation */}
				<div className="flex md:hidden items-center gap-4">
					<Link
						href="/search"
						className="flex items-center justify-center h-9 w-9 rounded-full bg-muted/30"
					>
						<Search className="h-4 w-4" />
						<span className="sr-only">Search</span>
					</Link>
					<Button
						variant="outline"
						size="icon"
						onClick={toggleTheme}
						className="rounded-full border-border/60"
					>
						{theme === "dark" ? (
							<Sun className="h-4 w-4" />
						) : (
							<Moon className="h-4 w-4" />
						)}
						<span className="sr-only">Toggle theme</span>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="rounded-full border-border/60"
							>
								<Menu className="h-4 w-4" />
								<span className="sr-only">Open menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-[180px] rounded-xl p-2"
						>
							<DropdownMenuItem asChild className="rounded-lg cursor-pointer">
								<Link href="/search" className="flex items-center gap-2 py-2">
									<Search className="h-4 w-4" />
									Search
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild className="rounded-lg cursor-pointer">
								<Link
									href="/recommendations"
									className="flex items-center gap-2 py-2"
								>
									Recommendations
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild className="rounded-lg cursor-pointer">
								<Link href="/about" className="flex items-center gap-2 py-2">
									About
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
