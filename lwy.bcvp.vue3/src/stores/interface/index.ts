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
    authMenuList: Menu.MenuOptions[];
}