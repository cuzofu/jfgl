import memoizeOne from 'memoize-one';
import pathToRegexp from 'path-to-regexp';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi/locale';

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }

      const result = {
        ...item,
        name: formatMessage({ id: locale, defaultMessage: item.name }),
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);
const formatMenuData = routes => memoizeOneFormatter(routes);

/**
 * 获取面包屑映射
 * @param {Object} routes 菜单配置
 */
function getBreadcrumbNameMap(routes) {
  const routerMap = {};
  const mergeMenuAndRouter = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        mergeMenuAndRouter(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  mergeMenuAndRouter(formatMenuData(routes));
  return routerMap;
}

export function editMenuData(routes) {
  return formatMenuData(routes);
}

export function matchParamsPath(pathname, routes) {
  const breadcrumbNameMap = getBreadcrumbNameMap(routes);
  const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
  return breadcrumbNameMap[pathKey];
}
