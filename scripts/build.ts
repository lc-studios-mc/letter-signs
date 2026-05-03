import AdmZip from "adm-zip";
import fs from "node:fs";
import path from "node:path";

const bpSourcePath = path.resolve("packs/bp");
const rpSourcePath = path.resolve("packs/rp");

const distDir = path.resolve("dist");
const outputZipPath = path.join(distDir, "letter-signs.zip");
const outputMcaddonPath = path.join(distDir, "letter-signs.mcaddon");

await fs.promises.mkdir(distDir, { recursive: true });

const zip = new AdmZip();

zip.addLocalFolder(bpSourcePath, "letter-signs-bp");
zip.addLocalFolder(rpSourcePath, "letter-signs-rp");

zip.writeZip(outputZipPath);
console.log(`Created ${outputZipPath}`);

zip.writeZip(outputMcaddonPath);
console.log(`Created ${outputMcaddonPath}`);
