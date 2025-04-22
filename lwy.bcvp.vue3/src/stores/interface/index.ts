export type LayoutType = 'vertical' | 'transverse'  //| 'classic' | 'transverse' | 'columns

export type AssemblySizeType = 'large' | 'default' | 'small'

/* GlobalState */
export interface GlobalState {
  layout: LayoutType
  assemblySize: AssemblySizeType
  maximize: boolean
  primary: string
  isDark: boolean
  isGrey: boolean
  isWeak: boolean
  asideInverted: boolean
  headerInverted: boolean
  isCollapse: boolean
  accordion: boolean
  breadcrumb: boolean
  breadcrumbIcon: boolean
  tabs: boolean
  tabsIcon: boolean
  footer: boolean
}

/* UserState */
export interface UserState {
  token: string
  userInfo: { name: string }
}

/* tabsMenuProps */
export interface TabsMenuProps {
  icon: string
  title: string
  path: string
  name: string
  close: boolean
}

/* TabsState */
export interface TabsState {
  tabsMenuList: TabsMenuProps[]
}

/**
 * @description
 * @author YouYou
 * @export
 * @interface AuthState
 */
export interface AuthState {
  routeName: string
  authButtonList: {
    [key: string]: string[]
  }
  authMenuList: Menu.MenuOptions[]
}

/* KeepAliveState */
export interface KeepAliveState {
  keepAliveName: string[]
}
