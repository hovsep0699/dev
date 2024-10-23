export interface IRoute {
  title?: string;
  path: string;
  link?: string;
  exact?: boolean;
  main?: () => ReactElement;
  submenu?: IRoute[];
  roles?: string[];
}
