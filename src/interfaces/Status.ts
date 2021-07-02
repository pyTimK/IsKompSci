export type Status = "taken" | "taking" | "not-taken";
export const statusToColor = (status: Status) => `var(--${status}Color)`;
