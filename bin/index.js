#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#!/usr/bin/env npx ts-node
const fs = require("fs/promises");
const path = require("path");
const projectType_1 = require("./utils/projectType");
const commands_1 = require("./utils/commands");
const AppError_1 = require("./utils/errors/AppError");
const handleDevEnv_1 = require("./handleDevEnv");
async function main() {
    try {
        const argumments = (0, commands_1.loadCommandLine)();
        const projectFolder = process.cwd();
        const packageFile = await fs.readFile(path.join(projectFolder, "package.json"), { encoding: "utf8" });
        const packageJson = JSON.parse(packageFile);
        const commands = (0, projectType_1.projectCommands)(packageJson);
        if (argumments.dev || argumments.d) {
            await (0, handleDevEnv_1.handleDevEnv)(commands);
        }
    }
    catch (err) {
        if (err instanceof AppError_1.AppError) {
            console.error(err.message);
        }
        else {
            console.error("Something went wrong");
        }
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map