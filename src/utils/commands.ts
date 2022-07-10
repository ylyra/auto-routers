var yargs = require("yargs");

export function loadCommandLine() {
  yargs
    .usage("$0 [options] [path/to/wwwroot]")
    .strict()
    .options({
      dev: {
        alias: "d",
        type: "boolean",
        default: false,
        description: "Run a watcher to automatically rebuild the pages",
      },
      build: {
        alias: "b",
        type: "boolean",
        default: false,
        description: "Build the pages",
      },
      help: {
        alias: "h",
        type: "boolean",
        description: "Show this help.",
      },
    });
  if (yargs.argv.help) {
    yargs.showHelp();
    process.exit();
  }
  // Yargs unhelpfully turns "--option foo --option bar" into { option: ["foo", "bar"] }.
  // Hence replace arrays with the rightmost value. This matters when `npm run` has options
  // built into it, and the user wants to override them with `npm run -- --port 3005` or something.
  // Yargs also seems to have setters, hence why we have to make a shallow copy.
  const argv = Object.assign({}, yargs.argv);
  Object.keys(argv).forEach(function (k) {
    if (k !== "_" && Array.isArray(argv[k])) {
      argv[k] = argv[k][argv[k].length - 1];
    }
  });
  Object.keys(argv).forEach((key) => !argv[key] && delete argv[key]);
  return argv;
}
