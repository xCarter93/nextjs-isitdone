"use client";

import React, { ReactNode } from "react";

interface FadeInProps {
	children: ReactNode;
	direction?: "up" | "down" | "none";
	delay?: number;
	duration?: number;
	className?: string;
}

export function FadeIn({
	children,
	direction = "none",
	delay = 0,
	duration = 0.5,
	className = "",
}: FadeInProps) {
	const getAnimationClass = () => {
		switch (direction) {
			case "up":
				return "animate-fade-in-up";
			case "down":
				return "animate-fade-in-down";
			default:
				return "animate-fade-in";
		}
	};

	return (
		<div
			className={`${getAnimationClass()} ${className}`}
			style={{
				animationDelay: `${delay}s`,
				animationDuration: `${duration}s`,
			}}
		>
			{children}
		</div>
	);
}
