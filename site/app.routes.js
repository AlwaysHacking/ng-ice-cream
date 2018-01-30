routes.$inject = ['$urlRouterProvider', '$stateProvider']

export default function routes($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/')
  $stateProvider
    .state('button', {
      url: '/button',
      template: '<button-view></button-view>'
    })
    .state('button-group', {
      url: '/button-group',
      template: '<button-group-view></button-group-view>'
    })
    .state('tabs', {
      url: '/tabs',
      template: '<tabs-view></tabs-view>'
    })
    .state('modal', {
      url: '/modal',
      template: '<modal-view></modal-view>'
    })
    .state('form', {
      url: '/form',
      template: '<form-view></form-view>'
    })
    .state('menu', {
      url: '/menu',
      template: '<menu-view></menu-view>'
    })
    .state('grid', {
      url: '/grid',
      template: '<grid-view></grid-view>'
    })
}
