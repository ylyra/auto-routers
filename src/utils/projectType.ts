import { IPackageJson } from "../@types/auto-gen";

export function projectCommands(projectPackage: IPackageJson) {
  if (projectPackage.devDependencies["vite"]) {
    return {
      dev: "vite",
      build: "tsc && vite build",
    };
  }

  return {
    dev: "react-scripts start",
    build: "react-scripts build",
  };
}
