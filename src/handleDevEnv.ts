import * as fs from "fs";
import * as path from "path";
import * as chokidar from "chokidar";

import { ICommandProps } from "./@types/auto-gen";
import { AppError } from "./utils/errors/AppError";

function watcherHandler(folderPath: string) {
  const watcher = chokidar.watch(folderPath, {
    ignored: /^\./,
    persistent: true,
  });

  watcher
    .on("add", function (path) {
      const finalPath = path.replace(folderPath, "").split("/");
      console.log("File", finalPath, "has been added");
    })
    .on("change", function (path) {
      const finalPath = path.replace(folderPath, "").split("/");
      console.log("File", finalPath, "has been changed");
    })
    .on("unlink", function (path) {
      const finalPath = path.replace(folderPath, "").split("/");
      console.log("File", finalPath, "has been removed");
    })
    .on("error", function (error) {
      console.error("Error happened", error);
    });
}

export async function handleDevEnv(commands: ICommandProps) {
  const projectFolder = process.cwd();
  const defaultPagesFolder = path.join(projectFolder, "pages");
  const secundaryPagesFolder = path.join(projectFolder, "src", "pages");

  if (fs.existsSync(defaultPagesFolder)) {
    return watcherHandler(defaultPagesFolder);
  }

  if (fs.existsSync(secundaryPagesFolder)) {
    return watcherHandler(secundaryPagesFolder);
  }

  throw new AppError("It looks like your project is missing a pages folder.");
}
