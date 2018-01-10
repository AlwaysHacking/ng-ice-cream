const template = () => (`
  <spin ng-class="classes()">
    <div ng-class="mainClasses()">
      <span ng-class="dotClasses()" ng-hide="$ctrl.hasText"></span>
      <div ng-show="$ctrl.hasText" ng-transclude="diffText"></div>
    </div>
  </spin>
`)

const controller = function spinCtrl($scope) {
  const prefixCls = 'ivu-spin'
  this.$onInit = () => {
    if (this.hasText === undefined) {
      this.hasText = false
    }
    $scope.classes = () => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-fix`]: this.fix,
          [`${prefixCls}-show-text`]: this.showText
        }
      ]
    }
    $scope.mainClasses = () => {
      return `${prefixCls}-main`
    }
    $scope.dotClasses = () => {
      return `${prefixCls}-dot`
    }
  }
}

export default {
  transclude: {
    'diffText': '?iSpinText'
  },
  template: template(),
  controller: ['$scope', controller],
  bindings: {
    size: '@?',
    fix: '=?',
    hasText: '=?'
  }
}
