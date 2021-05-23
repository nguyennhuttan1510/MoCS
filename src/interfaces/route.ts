export default interface IRoute {
    name: string;
    path: string;
    component: any;
    layout: any;
    exact: boolean;
    props?: any;
}