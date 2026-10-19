// Line icons, 24×24, drawn with the current text colour.
export const ICON_PATHS = {
  bag: "M5 8h14l-1 12H6ZM9 8V6a3 3 0 0 1 6 0v2",
  sunrise: "M3 18h18M7 18a5 5 0 0 1 10 0M12 4v4M9.5 6.5 12 4l2.5 2.5M4.5 10.5l1.5 1.5M19.5 10.5 18 12",
  waves: "M2 8q2.5-3 5 0t5 0 5 0 5 0M2 13q2.5-3 5 0t5 0 5 0 5 0M2 18q2.5-3 5 0t5 0 5 0 5 0",
  sunset: "M3 17h18M6 21h12M7 17a5 5 0 0 1 10 0M12 4v5M9.5 6.5 12 9l2.5-2.5",
  chat: "M4 5h16v11H9l-5 4Z M8 10h8",
  mail: "M3 6h18v12H3Z M3 7l9 7 9-7",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M12 7v5l3 2",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M20 20l-4-4",
  close: "M6 6l12 12M18 6 6 18",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  ice: "M5 9l7-4 7 4v7l-7 4-7-4Z M5 9l7 4 7-4 M12 13v7",
  moon: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z",
} as const;

export type IconName = keyof typeof ICON_PATHS;
