import { isDate, isNumber, isString } from 'lodash';

// 获取cookie
export const getItem = (sKey: string) => {
  return (
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(`(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`),
        '$1'
      )
    ) || null
  );
};

// 设置cookie
export const setItem = (
  sKey: string,
  sValue: any,
  vEnd: Date | number | string,
  sPath?: string,
  sDomain?: string,
  bSecure?: boolean
) => {
  if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
    return false;
  }
  let sExpires = '';
  if (isNumber(vEnd)) {
    sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : `; max-age=${vEnd}`;
  } else if (isString(vEnd)) {
    sExpires = `; expires=${vEnd}`;
  } else if (isDate(vEnd)) {
    sExpires = `; expires=${vEnd.toUTCString()}`;
  }
  document.cookie = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}${sExpires}${
    sDomain ? `; domain=${sDomain}` : ''
  }${sPath ? `; path=${sPath}` : ''}${bSecure ? '; secure' : ''}`;
  return true;
};

// 是否存在cookie
export const hasItem = (sKey: string) => {
  return new RegExp(`(?:^|;\\s*)${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=`).test(document.cookie);
};

// 删除cookie
export const removeItem = (sKey: string, sPath: string, sDomain: string) => {
  if (!sKey || !hasItem(sKey)) {
    return false;
  }
  document.cookie = `${encodeURIComponent(sKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${
    sDomain ? `; domain=${sDomain}` : ''
  }${sPath ? `; path=${sPath}` : ''}`;
  return true;
};
