"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDevEnv = void 0;
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const AppError_1 = require("./utils/errors/AppError");
function watcherHandler(folderPath) {
    const watcher = chokidar.watch(folderPath, {
        ignored: /^\./,
        persistent: true,
    });
    watcher
        .on("add", function (path) {
        console.log("File", path, "has been added");
    })
        .on("change", function (path) {
        console.log("File", path, "has been changed");
    })
        .on("unlink", function (path) {
        console.log("File", path, "has been removed");
    })
        .on("error", function (error) {
        console.error("Error happened", error);
    });
}
async function handleDevEnv(commands) {
    const projectFolder = process.cwd();
    const defaultPagesFolder = path.join(projectFolder, "pages");
    const secundaryPagesFolder = path.join(projectFolder, "src", "pages");
    if (fs.existsSync(defaultPagesFolder)) {
        return watcherHandler(defaultPagesFolder);
    }
    if (fs.existsSync(secundaryPagesFolder)) {
        return watcherHandler(secundaryPagesFolder);
    }
    throw new AppError_1.AppError("It looks like your project is missing a pages folder.");
}
exports.handleDevEnv = handleDevEnv;
//# sourceMappingURL=handleDevEnv.js.map