import { join } from "@std/path";
import { serveDir } from "@std/http/file-server";

const DIST_DIR = join(import.meta.dirname!, "..", "dist");

export async function serveFiles(req: Request): Promise<Response> {
  const distDir = Deno.readDirSync(DIST_DIR);
  const hasFiles = distDir.some((v) => v.isFile && v.name !== "meta.json");

  if (!hasFiles) {
    const metaModule = await import("../dist/meta.json", {
      with: { type: "json" },
    });
    const meta = metaModule.default;
    const fileNames = meta.files;
    const filePromises = fileNames.map(async (name) => {
      const url = `${meta.baseUrl}/${name}`;
      const response = await fetch(url);
      const content = await response.text();
      return { name, content };
    });
    const files = await Promise.all(filePromises);

    await Promise.all(files.map(async (file) => {
      const filePath = join(DIST_DIR, file.name);
      await Deno.writeTextFile(filePath, file.content);
    }));
  }

  return serveDir(req, {
    fsRoot: DIST_DIR,
    enableCors: true,
  });
}
