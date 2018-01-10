const directive = function() {
  const prefixCls = 'ivu-menu'
  const template = `
  <li class="${prefixCls}-item-group">
    <div class="${prefixCls}-item-group-title">{{ name }}</div>
    <ul><ng-transclude></ng-transclude></ul>
  </li>
  `
  return {
    restrict: 'E',
    template: template,
    transclude: true,
    scope: {
      name: '@'
    }
  }
}

export default directive
