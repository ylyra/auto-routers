"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectCommands = void 0;
function projectCommands(projectPackage) {
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
exports.projectCommands = projectCommands;
//# sourceMappingURL=projectType.js.map