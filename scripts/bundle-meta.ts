import { join } from "@std/path";
import config from "../deno.json" with { type: "json" };

const DIST_DIR = join(import.meta.dirname!, "..", "dist");

const files = Array.from(
  Deno.readDirSync(DIST_DIR).filter((v) => v.isFile).map((v) => v.name),
);

const meta = {
  baseUrl: `https://jsr.io/${config.name}/${config.version}/dist/`,
  files,
};

Deno.writeTextFileSync(join(DIST_DIR, "meta.json"), JSON.stringify(meta));
