export interface IPackageJson {
  devDependencies: { [key: string]: string };
}

export interface ICommandProps {
  dev: string;
  build: string;
}
