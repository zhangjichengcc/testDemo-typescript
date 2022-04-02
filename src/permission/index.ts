/*
 * @Author: your name
 * @Date: 2022-04-02 14:24:16
 * @LastEditTime: 2022-04-02 16:29:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \typeScriptDemo\src\permission\index.ts
 */

type PermissionCode = number;
type PermissionsItem = {
  /** 权限关键字 */
  key: string,
  /** 权限code，number类型 0x3 === 0b11 */
  code: PermissionCode,
  /** code二进制字符串 */
  stringCode?: string,
  /** 权限说明 */
  description: string,
}

class Permission {

  public permission: PermissionCode;
  static permissionList: PermissionsItem[];

  constructor(permission: PermissionCode) {
    /**
     * 当前权限code
     */
    this.permission = permission;
  }

  /**
   * 设置权限规则列表
   * @param pRules 
   */
  static setPermissionList(pRules: PermissionsItem[]): PermissionsItem[] {
    // 获取所有权限中code的最大长度
    const stringLength = Math.max(...pRules.map(item => item.code)).toString(2).length;
    // 格式化stringCode，返回包含每一位权限的string
    function displayStringCode(code: PermissionCode): string {
      const _code = code.toString(2);
      const prefix = new Array(stringLength - _code.length).fill('0').join('');
      return prefix + _code;
    }
    return Permission.permissionList = pRules.map((item: PermissionsItem) => ({
      ...item,
      stringCode: displayStringCode(item.code),
    }));
  }

  /**
   * 获取当前权限列表
   * @returns permissionList
   */
  public getPermission(): PermissionsItem[] {
    return Permission.permissionList.filter(item => {
      const { code } = item;
      return this.hasPermission(code);
    })
  }

  /**
   * 返回是否包括某种权限
   * @param code 
   * @returns boolean
   */
  public hasPermission(code: PermissionCode): boolean {
    /**
     * 与 & 操作后若相等，则表示包含对应的权限
     * 0b100 & 0b100 = 0b100 === 0b100
     * 0b110 & 0b100 = 0b100 === 0b100
     * 0b010 & 0b100 = 0b000 !== 0b100
     */
    return (this.permission & code) === code;
  }

  /**
   * 添加权限
   * @param code 
   * @returns Permission
   */
  public addPermission(code: PermissionCode): Permission {
    /**
     * 通过或 | 实现
     */
    this.permission = this.permission | code;
    return this;
  }

  /**
   * 移除权限
   * @param code 
   * @returns Permission
   */
  public removePermission(code: PermissionCode): Permission {
    /**
     * 按位异或 ^ 处理
     * 0b100 ^ 0b100 = 0b000
     * 0b000 ^ 0b100 = 0b100
     * 可见 ^ 实际为 toggle 操作，有则删除，无则添加
     */
    /**
     * 可以通过 先取反，再取与的方式实现
     * 0b100 & (~0b100) => 0b100 & 0b011 = 0b000
     * 0b000 & (~0b100) => 0b000 & 0b011 = 0b000
     */
    this.permission = this.permission & (~code);
    return this;
  }
}


/** HOW TO USE -------------------------------------------------------------------------------------------------------- */

// 设置权限列表
Permission.setPermissionList([
  {key: 'r', code: 0b100, description: '读'},
  {key: 'w', code: 0b010, description: '写'},
  {key: 'd', code: 0b001, description: '删除'}
])
// >> (3) [{…}, {…}, {…}]
// >>   1:{key: 'w', code: 2, description: '写', stringCode: '010'}
// >>   0:{key: 'r', code: 4, description: '读', stringCode: '100'}
// >>   2:{key: 'd', code: 1, description: '删除', stringCode: '001'}
// >> length: 3

const permission = new Permission(0);

// 获取当前权限列表
permission.getPermission(); 
// >> []

// 添加读写权限
permission.addPermission(0b110);
// >> Permission {permission: 6}

// 查看当前权限
permission.getPermission();
// >> (2) [{…}, {…}]
// >>   0:{key: 'r', code: 4, description: '读', stringCode: '100'}
// >>   1:{key: 'w', code: 2, description: '写', stringCode: '010'}
// >> length: 2

// 移除读删除权限
permission.removePermission(0b101);
// >> Permission {permission: 2}

// 查看当前权限
permission.getPermission();
// >> 0:{key: 'w', code: 2, description: '写', stringCode: '010'}
// >> length: 1