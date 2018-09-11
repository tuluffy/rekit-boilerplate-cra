export interface IAction {
  type: string
  payload: any
}

export type IAyncComponentLoader = () => Promise<any>

export interface IRoute {
  autoIndexRoute?: boolean
  childRoutes?: IRoute[]
  component?: React.ComponentClass | React.SFC
  exact?: boolean
  isIndex?: boolean
  name?: any
  path: string
  redirect?: boolean
  load?: IAyncComponentLoader
}