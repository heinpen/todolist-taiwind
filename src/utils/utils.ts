import { TaskState } from "../types/types";

export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getSelectedPriority = (priority: string): TaskState["priority"] => {
    const selectedValue = priority.toLowerCase();
    if (selectedValue === "high" || selectedValue === "normal" || selectedValue === "low") {
        // Valid priority value selected
        return selectedValue;
    } else {
        // Invalid priority value selected
        return "high";
    }
}
