const directive = function() {
  const prefixCls = 'ivu-btn-group'
  const template = `
  <div ng-class="classes()" ng-transclude></div>
  `
  const controller = function buttonGroupCtrl(scope) {
    this.$onInit = () => {
      scope.classes = () => {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-${scope.size}`]: !!scope.size,
            [`${prefixCls}-${scope.shape}`]: !!scope.shape,
            [`${prefixCls}-vertical`]: scope.vertical
          }]
      }
    }
  }
  return {
    template,
    controller: ['$scope', controller],
    transclude: true,
    scope: {
      size: '@',
      shape: '@',
      vertical: '<'
    }
  }
}

export default directive
