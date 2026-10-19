// Fails when a source file grows past the limit: a long file is a sign it needs splitting.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const LIMIT = 250;
const ROOTS = ["src"];
const EXT = /\.(tsx?|scss)$/;

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : EXT.test(name) ? [path] : [];
  });

const tooLong = ROOTS.flatMap(walk)
  .map((path) => [path, readFileSync(path, "utf8").split("\n").length])
  .filter(([, lines]) => lines > LIMIT);

if (tooLong.length) {
  tooLong.forEach(([path, lines]) => console.error(`${path}: ${lines} líneas (máximo ${LIMIT})`));
  process.exit(1);
}
console.log(`OK: ningún archivo pasa de ${LIMIT} líneas.`);
