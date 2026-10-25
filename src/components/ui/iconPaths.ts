// Line icons, 24×24, drawn with the current text colour.
export const ICON_PATHS = {
  bag: "M5 8h14l-1 12H6ZM9 8V6a3 3 0 0 1 6 0v2",
  chat: "M4 5h16v11H9l-5 4Z M8 10h8",
  mail: "M3 6h18v12H3Z M3 7l9 7 9-7",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M12 7v5l3 2",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M20 20l-4-4",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  ice: "M5 9l7-4 7 4v7l-7 4-7-4Z M5 9l7 4 7-4 M12 13v7",
} as const;

export type IconName = keyof typeof ICON_PATHS;
