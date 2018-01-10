const template = `<i ng-class="classes()" ng-style="styles()"></i>`

const controller = function iconCtrl($scope) {
  const prefixCls = 'ivu-icon'
  this.$onInit = () => {
    $scope.classes = () => {
      return [`${prefixCls}`, `${prefixCls}-${this.type}`]
    }
    $scope.styles = () => {
      let style = {}

      if (this.size) {
        style['font-size'] = `${this.size}px`
      }

      if (this.color) {
        style.color = this.color
      }

      return style
    }
  }
}

export default {
  template: template,
  controller: ['$scope', controller],
  bindings: {
    type: '@',
    size: '@?',
    color: '@?'
  }
}
