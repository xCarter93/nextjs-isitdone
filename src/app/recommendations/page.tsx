"use client";

import { useState } from "react";
import Link from "next/link";

export default function RecommendationsPage() {
	const [step, setStep] = useState(1);
	// We'll keep the formData state for future implementation
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [formData, setFormData] = useState({
		genres: [],
		themes: [],
		length: "medium",
		authors: [],
		pace: "moderate",
		previousBooks: [],
	});

	const handleNext = () => {
		setStep(step + 1);
	};

	const handleBack = () => {
		setStep(step - 1);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real app, this would send the data to an API
		setStep(4); // Show results
	};

	return (
		<section className="py-10 w-full">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold mb-6">
					Get Personalized Book Series Recommendations
				</h1>
				<p className="text-muted-foreground mb-8">
					Tell us about your reading preferences, and we&apos;ll suggest book
					series you might enjoy.
				</p>

				<div className="max-w-2xl mx-auto">
					{/* Progress indicator */}
					<div className="mb-8">
						<div className="flex justify-between">
							<div
								className={`text-sm ${
									step >= 1 ? "text-primary" : "text-muted-foreground"
								}`}
							>
								Step 1: Genres
							</div>
							<div
								className={`text-sm ${
									step >= 2 ? "text-primary" : "text-muted-foreground"
								}`}
							>
								Step 2: Preferences
							</div>
							<div
								className={`text-sm ${
									step >= 3 ? "text-primary" : "text-muted-foreground"
								}`}
							>
								Step 3: History
							</div>
						</div>
						<div className="mt-2 h-2 bg-muted rounded-full">
							<div
								className="h-2 bg-primary rounded-full transition-all duration-300"
								style={{ width: `${((step - 1) / 3) * 100}%` }}
							></div>
						</div>
					</div>

					{/* Step 1: Preferences */}
					{step === 1 && (
						<div className="animate-fade-in">
							<h2 className="text-xl font-semibold mb-4">
								Your Reading Preferences
							</h2>
							<div className="space-y-6">
								<div>
									<label className="block text-sm font-medium mb-2">
										Preferred Genres
									</label>
									<div className="grid grid-cols-2 gap-2">
										{[
											"Fantasy",
											"Science Fiction",
											"Mystery",
											"Romance",
											"Historical",
											"Thriller",
										].map((genre) => (
											<div key={genre} className="flex items-center">
												<input
													type="checkbox"
													id={genre}
													className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
												/>
												<label htmlFor={genre} className="ml-2 text-sm">
													{genre}
												</label>
											</div>
										))}
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Book Length Preference
									</label>
									<div className="flex space-x-4">
										{["Short", "Medium", "Long"].map((length) => (
											<div key={length} className="flex items-center">
												<input
													type="radio"
													id={length}
													name="length"
													value={length.toLowerCase()}
													className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
												/>
												<label htmlFor={length} className="ml-2 text-sm">
													{length}
												</label>
											</div>
										))}
									</div>
								</div>

								<div className="flex justify-end">
									<button
										onClick={handleNext}
										className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
									>
										Next
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Step 2: Reading History */}
					{step === 2 && (
						<div className="animate-fade-in">
							<h2 className="text-xl font-semibold mb-4">
								Your Reading History
							</h2>
							<div className="space-y-6">
								<div>
									<label className="block text-sm font-medium mb-2">
										Favorite Authors
									</label>
									<input
										type="text"
										placeholder="Enter author names, separated by commas"
										className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Reading Pace
									</label>
									<div className="flex space-x-4">
										{["Slow", "Moderate", "Fast"].map((pace) => (
											<div key={pace} className="flex items-center">
												<input
													type="radio"
													id={pace}
													name="pace"
													value={pace.toLowerCase()}
													className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
												/>
												<label htmlFor={pace} className="ml-2 text-sm">
													{pace}
												</label>
											</div>
										))}
									</div>
								</div>

								<div className="flex justify-between">
									<button
										onClick={handleBack}
										className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
									>
										Back
									</button>
									<button
										onClick={handleNext}
										className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
									>
										Next
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Step 3: Review */}
					{step === 3 && (
						<div className="animate-fade-in">
							<h2 className="text-xl font-semibold mb-4">
								Review Your Preferences
							</h2>
							<div className="bg-muted/30 rounded-lg p-6 mb-6">
								<p className="text-sm text-muted-foreground mb-4">
									Based on your selections, we&apos;ll recommend book series
									that match:
								</p>
								<ul className="space-y-2 text-sm">
									<li>• Genres: Fantasy, Science Fiction</li>
									<li>• Book Length: Medium</li>
									<li>• Authors similar to: Brandon Sanderson, N.K. Jemisin</li>
									<li>• Reading Pace: Moderate</li>
								</ul>
							</div>

							<div className="flex justify-between">
								<button
									onClick={handleBack}
									className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
								>
									Back
								</button>
								<button
									onClick={handleSubmit}
									className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
								>
									Get Recommendations
								</button>
							</div>
						</div>
					)}

					{/* Step 4: Results */}
					{step === 4 && (
						<div className="animate-fade-in">
							<h2 className="text-xl font-semibold mb-4">
								Your Personalized Recommendations
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
								{/* Recommendation placeholders */}
								{[1, 2, 3, 4].map((item) => (
									<div
										key={item}
										className="bg-background rounded-lg border border-border/50 overflow-hidden"
									>
										<div className="h-40 bg-muted/20 flex items-center justify-center">
											<p className="text-muted-foreground">Book Cover</p>
										</div>
										<div className="p-4">
											<h3 className="font-semibold">
												Recommended Series {item}
											</h3>
											<p className="text-sm text-muted-foreground mt-1">
												Author Name
											</p>
											<p className="text-xs mt-2">
												<span className="inline-block bg-primary/10 text-primary rounded-full px-2 py-1">
													{item % 2 === 0 ? "Complete" : "Ongoing"}
												</span>
											</p>
											<p className="text-sm mt-3">
												Why we recommend this: Matches your preference for
												fantasy and moderate-length series.
											</p>
										</div>
									</div>
								))}
							</div>

							<div className="flex justify-between">
								<button
									onClick={() => setStep(1)}
									className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
								>
									Start Over
								</button>
								<Link
									href="/search"
									className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
								>
									Browse All Series
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
