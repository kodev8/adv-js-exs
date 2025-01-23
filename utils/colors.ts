export const PROJECT_COLORS = {
  red: ["#FF416C", "#FF4B2B"],
  blue: ["#00C6FB", "#005BEA"],
  green: ["#56AB2F", "#A8E063"],
  yellow: ["#F7971E", "#FFD200"],
  purple: ["#8E2DE2", "#4A00E0"],
  orange: ["#F2994A", "#F2C94C"],
  black: ["#434343", "#000000"],
  gray: ["#808080", "#3F3F3F"]
} as const;

export const getGradientColors = (color: keyof typeof PROJECT_COLORS) => {
  return PROJECT_COLORS[color];
}; 