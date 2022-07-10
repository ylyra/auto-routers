#!/usr/bin/env node
//#!/usr/bin/env npx ts-node
import * as fs from "fs/promises";
import * as path from "path";

import { IPackageJson } from "./@types/auto-gen";
import { projectCommands } from "./utils/projectType";
import { loadCommandLine } from "./utils/commands";
import { AppError } from "./utils/errors/AppError";
import { handleDevEnv } from "./handleDevEnv";

async function main() {
  try {
    const argumments = loadCommandLine();
    const projectFolder = process.cwd();
    const packageFile = await fs.readFile(
      path.join(projectFolder, "package.json"),
      { encoding: "utf8" }
    );
    const packageJson = JSON.parse(packageFile) as IPackageJson;
    const commands = projectCommands(packageJson);

    if (argumments.dev || argumments.d) {
      await handleDevEnv(commands);
    }
  } catch (err) {
    if (err instanceof AppError) {
      console.error(err.message);
    } else {
      console.error("Something went wrong");
    }

    process.exit(1);
  }
}

main();
