import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { PopularSeriesSection } from "@/components/home/PopularSeriesSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<PopularSeriesSection />
			<CTASection />
		</>
	);
}
