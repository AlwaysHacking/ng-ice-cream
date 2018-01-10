const directive = function() {
  const prefixCls = 'ivu-tabs-tabpane'
  const template = `<div class="${prefixCls}" ng-show="selected" ng-transclude></div>`

  const link = function(scope, element, attrs, iTabsCtrl) {
    iTabsCtrl.addPane(scope)
  }
  return {
    restrict: 'E',
    require: '^^iTabs',
    template: template,
    link: link,
    transclude: true,
    scope: {
      tab: '@',
      key: '@',
      icon: '@?'
    }
  }
}

export default directive
