/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @author YouYou
 * @export
 * @param {Menu.MenuOptions[]} menuList 菜单列表
 * @return {*}  {Menu.MenuOptions[]}
 */
export function getFlatMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
    let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList)) //深拷贝  避免修改原始菜单对象
    //flatMap 多层数据转换为单层数据
    return newMenuList.flatMap(item => [item, ...(item.children? getFlatMenuList(item.children) : [])])
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @author YouYou
 * @export
 * @param {Menu.MenuOptions[]} menuList
 * @return {*}  
 */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
    let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
    return newMenuList.filter(item => {
        //短路逻辑
        item.children?.length && (item.children = getShowMenuList(item.children))
        // return !item.IsHide
        return !item.IsButton
    })
}

/**
 * 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param menuList 
 * @param parent 
 * @param result 
 * @returns 
 */
export const getAllBreadcrumbList = (menuList: Menu.MenuOptions[], parent = [], result: { [key: string]: any } = {}) => {
    for (const item of menuList) {
        result[item.path] = [...parent, item]
        if (item.children) {
            getAllBreadcrumbList(item.children, result[item.path], result)
        }
    }
    return result
}

/**
 * @description 使用递归处理路由菜单 path，生成一维数组 (第一版本地路由鉴权会用到，该函数暂未使用)
 * @author YouYou
 * @export
 * @param {Menu.MenuOptions[]} menuList 所有菜单列表
 * @param {string[]} menuPathArr 菜单地址的一维数组 ['**','**']
 * @return {*}  {string[]}
 */
export function getMenuListPath(menuList: Menu.MenuOptions[], menuPathArr: string[]): string[] {
    for (const item of menuList) {
        if (typeof item === "object" && item.path) {
            menuPathArr.push(item.path)
        }
        if (item.children?.length) {
            getMenuListPath(item.children,menuPathArr)
        }
    }
    return menuPathArr
}

/**
 * @description 递归查询当前 path 所对应的菜单对象 (该函数暂未使用)
 * @param {Array} menuList 菜单列表
 * @param {String} path 当前访问地址
 * @returns {Object | null}
 */
export function findMenuByPath(menuList: Menu.MenuOptions[], path: string): Menu.MenuOptions | null {
    for (const item of menuList) {
      if (item.path === path) return item;
      if (item.children) {
        const res = findMenuByPath(item.children, path);
        if (res) return res;
      }
    }
    return null;
}


export function getButtonList(routePath: string, routers: Menu.MenuOptions[]): Menu.MenuOptions[] {
    let buttonList: Menu.MenuOptions[] = [];
    const findButtons = (path: string, routes: Menu.MenuOptions[]) => {
      for (let element of routes) {
        if (path && element.path) {
          const currentPath = path.toLowerCase();
          if (element.path && element.path.toLowerCase() === currentPath) {
            buttonList = element.children || [];
            return;
          } else if (element.children) {
            findButtons(currentPath, element.children);
          }
        }
      }
    };
    findButtons(routePath.toLowerCase(), routers);
    return buttonList;
  }
  
  
/**
 * 格式化日期为指定格式的字符串
 * @param date - Date 对象或日期字符串
 * @param format - 目标日期格式，例如：'yyyy-MM-dd' 或 'yyyy年MM月dd日 hh:mm:ss'
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | string, format: string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const padZero = (num: number) => (num < 10 ? '0' : '') + num;

  const replacements: Record<string, string> = {
    'yyyy': date.getFullYear().toString(),
    'MM': padZero(date.getMonth() + 1),
    'dd': padZero(date.getDate()),
    'hh': padZero(date.getHours()),
    'mm': padZero(date.getMinutes()),
    'ss': padZero(date.getSeconds())
  };

  return format.replace(/yyyy|MM|dd|hh|mm|ss/g, match => replacements[match]);
}