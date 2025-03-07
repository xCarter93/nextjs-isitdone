"use client";

import React, { useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface StableCheckboxProps {
	id: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: React.ReactNode;
}

// Create a stable checkbox component that won't cause infinite loops
const StableCheckboxComponent = React.memo(
	({ id, checked, onChange }: StableCheckboxProps) => {
		// Create a stable callback that won't change on every render
		const handleCheckedChange = useCallback(
			(value: boolean | "indeterminate") => {
				onChange(value === true);
			},
			[onChange]
		);

		return (
			<Checkbox
				id={id}
				checked={checked}
				onCheckedChange={handleCheckedChange}
			/>
		);
	}
);

// Add display name to fix linter error
StableCheckboxComponent.displayName = "StableCheckbox";

export const StableCheckbox = StableCheckboxComponent;
