import Link from "next/link";

const currentYear = new Date().getFullYear();

export function Footer() {
	return (
		<footer className="border-t border-border/40 py-6 md:py-0">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 md:h-16">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center gap-2">
						<span className="font-semibold">IsItDone</span>
					</Link>
				</div>

				<div className="flex items-center gap-6">
					<Link
						href="/about"
						className="text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						About
					</Link>
					<Link
						href="/privacy"
						className="text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						Privacy
					</Link>
					<Link
						href="/terms"
						className="text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						Terms
					</Link>
				</div>

				<div className="text-sm text-muted-foreground">
					&copy; {currentYear} IsItDone. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
