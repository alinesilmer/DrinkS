// Every photo the site uses, in one place. Files live in /public/media
// (credits in CREDITOS.txt). Free stock for now: swap paths for your own shots.
const photo = (name: string) => `/media/photos/${name}.webp`;

/** Product photo by product id. */
export const productPhoto = (id: string) => photo(`p-${id}`);
