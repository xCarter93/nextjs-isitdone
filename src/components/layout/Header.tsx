"use client";

import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
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
						<span className="text-xl font-bold">IsItDone</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-6">
					<Link
						href="/search"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
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
						variant="ghost"
						size="icon"
						onClick={toggleTheme}
						className="rounded-full"
					>
						{theme === "dark" ? (
							<Sun className="h-5 w-5" />
						) : (
							<Moon className="h-5 w-5" />
						)}
						<span className="sr-only">Toggle theme</span>
					</Button>
				</nav>

				{/* Mobile Navigation */}
				<div className="flex md:hidden items-center gap-4">
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleTheme}
						className="rounded-full"
					>
						{theme === "dark" ? (
							<Sun className="h-5 w-5" />
						) : (
							<Moon className="h-5 w-5" />
						)}
						<span className="sr-only">Toggle theme</span>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="rounded-full">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Open menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem asChild>
								<Link href="/search">Search</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/recommendations">Recommendations</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/about">About</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
