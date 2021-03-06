'use strict';

angular.module('luna')
  .run(
    ['$rootScope', '$state', '$stateParams',
      function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        //初始化弹窗
        $('[data-toggle="popover"]').popover();
      }
    ]
  )
  .config(
    ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
      function($stateProvider, $urlRouterProvider, JQ_CONFIG) {
        $urlRouterProvider
          .otherwise('/index');
        //portal
        $stateProvider
          .state('portal', {
            abstract: true,
            url: '/portal',
            templateUrl: 'tpl/portal/portal.html',
            resolve: {
              css: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'styles/portal.css',
                ]);
              }]
            }
          })
          .state('portal.index', {
            url: '^/index',
            templateUrl: 'tpl/portal/index.html',
            controller: 'IndexController',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/portal/index.js',
                  'scripts/directives/portal/portal-header.js',
                  'scripts/directives/portal/portal-footer.js'
                ]);
              }]
            }
          })
          .state('portal.login', {
            url: '/signin',
            templateUrl: 'tpl/portal/login.html',
            controller: 'LoginController',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/portal/login.js',
                  'scripts/directives/portal/portal-footer.js',
                  'scripts/directives/portal/portal-header.js'
                ]);
              }]
            }
          })
          //app
          .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'tpl/app/app.html',
            controller:'AppCtrl',
            resolve: {
              css: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app.js',
                  'styles/app.css',
                  'ngDialog'
                ]);
              }]
            }
          })

          //数据管理
          .state('app.data', {//二级导航栏
            abstract: true,
            url: '/data',
            templateUrl: 'tpl/app/dataMng/datamenu.html',
            controller:'DataCtrl',
            resolve: {
              css: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/dataMng/dataCtrl.js',
                ]);
              }]
            }
          })
          .state('app.data.insertEconomy', {
            url: '^/data/insertEconomy',
            templateUrl: 'tpl/app/dataMng/insertEconomy.html',
            controller: 'EconomyDataInsertCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/dataMng/economyDataInsertCtrl.js',
                ]);
              }]
            }
          })
           .state('app.data.insertPopulation', {
             url: '^/data/insertPopulation',
             templateUrl: 'tpl/app/dataMng/insertPopulation.html',
             controller: 'PopulationDataInsertCtrl',
             resolve: {
               controller: ['$ocLazyLoad', function($ocLazyLoad) {
                 return $ocLazyLoad.load([
                   'scripts/controllers/app/dataMng/populationDataInsertCtrl.js',
                 ]);
               }]
             }
           })
           //数据管理
          //economy 
          .state('app.index', {
            abstract: true,
            url: '^/app/index',
            templateUrl: 'tpl/app/economy/emenu.html',
            controller: 'AppIndexController',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/app-index.js',
                ]);
              }]
            }
          })
          .state('app.index.economy', {
            abstract: true,
            url: '^/app/index/economy',
            templateUrl: 'tpl/app/economy/economy.html',
            controller: 'AppEconomyCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/economy/app-economy.js',
                ]);
              }]
            }
          })
          .state('app.index.economy.gdp', {
            url: '^/app/index/economy/gdp/:title',
            templateUrl: 'tpl/app/economy/economy-gdp.html',
            controller: 'EconomyGdpCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/economy/economy-gdp.js',
                ]);
              }]
            }
          })
          .state('app.index.economy.tax', {
            url: '^/app/index/economy/tax/:title',
            templateUrl: 'tpl/app/economy/economy-tax.html',
            controller: 'EconomyTaxCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/economy/economy-tax.js',
                ]);
              }]
            }
          })
          .state('app.index.economy.keqiang', {
            url: '^/app/index/economy/keqiang/:title',
            templateUrl: 'tpl/app/economy/economy-keqiang.html',
            controller: 'EconomyKeqiangCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/economy/economy-keqiang.js',
                ]);
              }]
            }
          })
          .state('app.index.economy.powerconsumption', {
            url: '^/app/index/economy/powerconsumption/:title',
            templateUrl: 'tpl/app/economy/economy-powerconsumption.html',
            controller: 'PowerCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/economy/power/power.js',
                  'scripts/controllers/app/economy/power/power-total.js',
                  'scripts/controllers/app/economy/power/power-industry.js',
                  'scripts/controllers/app/economy/power/power-industry-solo.js',
                  'scripts/controllers/app/economy/power/power-enterprise-average.js',
                ]);
              }]
            }
          })
          .state('app.index.economy.powerconsumptionofenterprises', {
            url: '^/app/index/economy/powerconsumption/enterprises/:title',
            templateUrl: 'tpl/app/economy/economy-powerconsumption-enterprises.html',
            controller: 'PowerEnterpriseSoloCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/economy/power/power-enterprise-solo.js',
                ]);
              }]
            }
          })
          //economy end

          //environment start
          .state('app.emenu', {
            abstract: true,
            url: '^/app/emenu',
            templateUrl: 'tpl/app/environment/emenu.html',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/environment/angular-scroll.js',
                ]);
              }]
            }
          })
          .state('app.emenu.air', {
            url: '^/app/emenu/air',
            templateUrl: 'tpl/app/environment/air.html',
            controller: 'AirCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/environment/air.js',
                ]);
              }]
            }
          })
          .state('app.emenu.water', {
            url: '^/app/emenu/water',
            templateUrl: 'tpl/app/environment/water.html',
            controller: 'WaterCtrl',
            resolve: {
            controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'scripts/controllers/app/environment/water.js',
                ]);
              }]
            }
          })
          //environment end 

          //population start
          .state('app.pmenu', {
            abstract: true,
            url: '^/app/pmenu',
            templateUrl: 'tpl/app/population/pmenu.html',
            controller: 'AppPopulationController',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/population/app-population.js',
                ]);
              }]
            }
          })
          .state('app.pmenu.populationstructure', {
            url: '^/app/pmenu/populationstructure',
            templateUrl: 'tpl/app/population/populationstructure.html',
            controller: 'PopulationStructureCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/population/populationstructure.js',
                  'scripts/controllers/app/population/echarts.js',
                ]);
              }]
            }
          })
           .state('app.pmenu.prelation', {
            url: '^/app/pmenu/prelation',
            templateUrl: 'tpl/app/population/prelation.html',
            controller: 'PrelationCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/population/prelation.js',
                  'scripts/controllers/app/population/echarts.js',
                ]);
              }]
            }
          })
           .state('app.pmenu.livelihood', {
            url: '^/app/pmenu/livelihood',
            templateUrl: 'tpl/app/population/livelihood.html',
            controller: 'LivelihoodCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/population/livelihood.js'
                ]);
              }]
            }
          })
          //population end
          
          .state('app.profile', {
            abstract: true,
            url: '^/app/profile',
            templateUrl: 'tpl/app/profile/profile.html',
            controller: 'ProfileCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/profile/profile.js'
                ]);
              }]
            }
          })
          .state('app.profile.person', {
            url: '^/app/profile/person',
            templateUrl: 'tpl/app/profile/profile-person.html',
            resolve: {

            }
          })
          .state('app.profile.password', {
            url: '^/app/profile/password',
            templateUrl: 'tpl/app/profile/profile-password.html',
            controller: 'ProfilePswCtrl',
            resolve: {
              controller: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'scripts/controllers/app/profile/psw.js'
                ]);
              }]
            }
          })
          .state('app.message', {
            url: '^/app/message',
            templateUrl: 'tpl/app/message.html',
            resolve: {

            }
          })
          ;
      }
    ]
  )
  .run(
  );

//定义请求地址，可修改
var base_Url = 'http://localhost:8080';
