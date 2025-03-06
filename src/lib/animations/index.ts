// Animation utility functions

/**
 * Applies a staggered animation delay to a list of elements
 * @param index The index of the current element
 * @param baseDelay The base delay in seconds
 * @returns CSS animation-delay value
 */
export function getStaggeredDelay(
	index: number,
	baseDelay: number = 0.1
): string {
	return `${baseDelay * index}s`;
}

/**
 * Creates a CSS transition string with specified properties and timing
 * @param properties Array of CSS properties to transition
 * @param duration Duration in seconds
 * @param easing Easing function
 * @returns CSS transition value
 */
export function createTransition(
	properties: string[] = ["all"],
	duration: number = 0.3,
	easing: string = "ease-in-out"
): string {
	return properties.map((prop) => `${prop} ${duration}s ${easing}`).join(", ");
}

/**
 * Utility to create keyframe animation for tree visualization
 * @param direction Direction of the animation ('in' | 'out')
 * @param type Type of animation ('fade' | 'slide' | 'scale')
 * @returns CSS animation properties
 */
export function treeNodeAnimation(
	direction: "in" | "out" = "in",
	type: "fade" | "slide" | "scale" = "fade"
): { [key: string]: string } {
	const baseAnimation = {
		animationDuration: "0.3s",
		animationFillMode: "forwards",
		animationTimingFunction: "ease-in-out",
	};

	if (type === "fade") {
		return {
			...baseAnimation,
			animationName: direction === "in" ? "fade-in" : "fade-out",
		};
	}

	if (type === "slide") {
		return {
			...baseAnimation,
			animationName: direction === "in" ? "fade-in-down" : "fade-out-up",
		};
	}

	if (type === "scale") {
		return {
			...baseAnimation,
			animationName: direction === "in" ? "scale-in" : "scale-out",
		};
	}

	return baseAnimation;
}
