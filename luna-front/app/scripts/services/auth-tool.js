angular.module('luna')
  .service('AuthTool', ['$sessionStorage', '$localStorage', function($localStorage, $sessionStorage) {
    'ngInject';
  //常量
   var TOKEN_KEY = 'X-Auth-Token',
       TOKEN_HEADER = 'x-auth-token',
       LOGIN_USER = 'Login-User',
       CURR_WORKSPACE = 'Curr-Workspace',
       WORKSPACE_LIST = 'Workspace-List',
       USERNAME = 'username',
       PASSWORD = 'password';

    var md = {};

    md = {
      TOKEN_KEY: TOKEN_KEY,
      TOKEN_HEADER: TOKEN_HEADER,
      LOGIN_USER: LOGIN_USER,
      CURR_WORKSPACE: CURR_WORKSPACE,
      WORKSPACE_LIST: WORKSPACE_LIST,
      USERNAME : USERNAME,
      PASSWORD : PASSWORD
    };

    md.isLogin = function () {
      return $sessionStorage[LOGIN_USER] && $sessionStorage[TOKEN_KEY];
    };

    md.login = function (user, token) {
      $sessionStorage[LOGIN_USER] = user;
      $sessionStorage[TOKEN_KEY] = token;
    };

    md.logout = function () {
      var loginUser = md.getLoginUser();

      delete $sessionStorage[CURR_WORKSPACE];
      delete $sessionStorage[WORKSPACE_LIST];

      if(loginUser && loginUser.id)
        delete $localStorage[CURR_WORKSPACE + loginUser.id];

      delete $sessionStorage[LOGIN_USER];
      delete $sessionStorage[TOKEN_KEY];

      delete $localStorage[USERNAME];
      delete $localStorage[PASSWORD];
    };

    md.getLoginUser = function () {
      return $sessionStorage[LOGIN_USER];
    };

    md.updateLoginUser = function (user) {
      $sessionStorage[LOGIN_USER] = user;
    };

    md.updateLoginUserRolesAndPermissions = function (roles, permissions) {
      $sessionStorage[LOGIN_USER].roles = roles;
      $sessionStorage[LOGIN_USER].permissions = {};
      angular.forEach(permissions, function (item) {
        $sessionStorage[LOGIN_USER].permissions[item.code] = item.value;
      });
    };

    md.saveLoginInfo = function (username, password) {
      $localStorage[USERNAME] = username;
      $localStorage[PASSWORD] = password;
    };

    md.saveWorkspaceInfo = function (workspace) {
      var loginUser = md.getLoginUser();
      $localStorage[CURR_WORKSPACE + loginUser.id] = workspace;
    };

    md.getCurrWorkspace = function () {
      return $sessionStorage[CURR_WORKSPACE];
    };

    md.updateCurrWorkspace = function (workspace) {
      $sessionStorage[CURR_WORKSPACE] = workspace;

      var list = md.getWorkspaceList();
      for(var i = 0; i < list.length; i++) {
        if(list[i].id == workspace.id) {
          list[i] = workspace;
          break;
        }
      }
    };

    md.checkCurrWorkspace = function () {
      var workspaceList = md.getWorkspaceList();
      /**
       * 检查localstorage是否保存最近访问团队的记录,
       * 存在则设置当前团队为最近访问团队, 不存在则设置当前团队为列表第一个团队
       */

      var historyWorkspace = md.loadWorkspaceInfo();
      if(historyWorkspace && historyWorkspace.id) {
        var i, len;
        for(i = 0, len = workspaceList.length; i < len; i++) {
          if(historyWorkspace.id == workspaceList[i].id) {
            md.updateCurrWorkspace(workspaceList[i]);
          }
        }

        if(!md.getCurrWorkspace()) {
          md.updateCurrWorkspace(workspaceList[0]);
          md.saveWorkspaceInfo(workspaceList[0]);
        }
      } else {
        md.updateCurrWorkspace(workspaceList[0]);
        md.saveWorkspaceInfo(workspaceList[0]);
      }
    };

    // 删除当前所在团队
    md.deleteCurrWorkspace = function () {
      var currWorkspace = md.getCurrWorkspace(),
        workspaceList = md.getWorkspaceList();

      var i, len;
      for(i = 0, len = workspaceList.length; i < len; i++) {
        if(currWorkspace.id == workspaceList[i].id) {
          workspaceList.splice(i, 1);
          break;
        }
      }

      md.updateWorkspaceList(workspaceList);
    };

    // 跳转到个人贷款空间
    md.jumpPersonalWorkspace = function () {
      var i, len, workspaceList = md.getWorkspaceList();

      // 跳转到个人贷款空间
      var personWorkspace = null;
      for(i = 0, len = workspaceList.length; i < len; i++) {
        if(workspaceList[i].isDefault || workspaceList[i].type.code == 'PERSONAL') {
          personWorkspace = workspaceList[i];
        }
      }
      if(!personWorkspace) {
        personWorkspace = workspaceList[0];
      }
      md.updateCurrWorkspace(personWorkspace);
      md.saveWorkspaceInfo(personWorkspace);
    };

    md.getWorkspaceList = function () {
      return $sessionStorage[WORKSPACE_LIST];
    };

    md.updateWorkspaceList = function (workspaceList) {
      $sessionStorage[WORKSPACE_LIST] = workspaceList;
    };

    md.loadLoginInfo = function () {
      if ($localStorage[USERNAME] && $localStorage[PASSWORD]) {
        return {
          username: $localStorage[USERNAME],
          password: $localStorage[PASSWORD]
        }
      } else {
        return null;
      }
    };

    md.loadWorkspaceInfo = function () {
      var loginUser = md.getLoginUser();
      return $localStorage[CURR_WORKSPACE + loginUser.id];
    };

    // 密码加密函数
    md.encryptPassword = function (password, username, sbin) {
      var code = sbin === undefined ? '1234' : sbin;

      return md5(md5(md5(password) + username) + code.toUpperCase());
    };

   return md;
}]);
