import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copies the entry image to the grader's output directory.
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, "entry.png"), join(outDir, "entry.png"));

// Self-check: the copied entry must match the source byte for byte in size.
const srcStat = statSync(join(here, "entry.png"));
const dstStat = statSync(join(outDir, "entry.png"));
if (srcStat.size !== dstStat.size) {
  throw new Error(
    `entry.png size mismatch: source ${srcStat.size} vs output ${dstStat.size}`,
  );
}
console.log(`entry.png copied OK (${dstStat.size} bytes)`);
