export default function AboutPage() {
	return (
		<section className="py-10 w-full">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold mb-6">About IsItDone</h1>

				<div className="max-w-3xl">
					<p className="text-lg mb-6">
						IsItDone is a modern web application designed to help readers track
						and discover book series. Our platform allows you to check if a book
						series is complete, find the recommended reading order, and get
						personalized book recommendations based on your preferences.
					</p>

					<h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
					<p className="mb-6">
						Our mission is to help readers navigate the complex world of book
						series. We understand the frustration of starting a series only to
						discover it&apos;s unfinished, or reading books in the wrong order.
						IsItDone solves these problems by providing clear, up-to-date
						information about book series completion status and reading orders.
					</p>

					<h2 className="text-2xl font-semibold mt-10 mb-4">Key Features</h2>
					<ul className="list-disc pl-6 space-y-2 mb-6">
						<li>Comprehensive database of book series</li>
						<li>Up-to-date completion status information</li>
						<li>
							Multiple reading order options (chronological, publication,
							author-recommended)
						</li>
						<li>Personalized book series recommendations</li>
						<li>Interactive series visualizations</li>
					</ul>

					<h2 className="text-2xl font-semibold mt-10 mb-4">Data Sources</h2>
					<p className="mb-6">
						IsItDone aggregates data from multiple sources, including the Google
						Books API, to provide the most accurate and comprehensive
						information about book series. We regularly update our database to
						ensure you have access to the latest information.
					</p>

					<h2 className="text-2xl font-semibold mt-10 mb-4">Contact Us</h2>
					<p className="mb-10">
						Have questions, suggestions, or feedback? We&apos;d love to hear
						from you! Please visit our{" "}
						<a href="/contact" className="text-primary hover:underline">
							Contact page
						</a>{" "}
						to get in touch with our team.
					</p>
				</div>
			</div>
		</section>
	);
}
