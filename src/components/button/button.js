const directive = function() {
  const prefixCls = 'ivu-btn'
  const template = `
    <button ng-class="classes()">
      <i class="ivu-load-loop ivu-icon ivu-icon-load-c" ng-if="loading"></i>
      <i-icon type="{{icon}}" ng-if="icon && !loading"></i-icon>
      <ng-transclude>
      </ng-transclude>
    </button>
  `
  const controller = function buttonCtrl(scope) {
    this.$onInit = () => {
      scope.classes = () => {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-${scope.type}`]: !!scope.type,
            [`${prefixCls}-long`]: scope.long,
            [`${prefixCls}-${scope.shape}`]: !!scope.shape,
            [`${prefixCls}-${scope.size}`]: !!scope.size,
            [`${prefixCls}-loading`]: scope.loading,
            [`${prefixCls}-icon-only`]: !scope.showSlot && (!!scope.icon || scope.loading)
          }
        ]
      }
    }
  }
  return {
    transclude: true,
    template,
    controller: ['$scope', controller],
    scope: {
      type: '@',
      size: '@',
      shape: '@',
      long: '<',
      loading: '<',
      icon: '@'
    },
    replace: true
  }
}

export default directive
