const template = `<i ng-class="classes()" ng-style="styles()"></i>`

const controller = function iconCtrl(scope) {
  const prefixCls = 'ivu-icon'
  this.$onInit = () => {
    scope.classes = () => {
      return [`${prefixCls}`, `${prefixCls}-${scope.type}`]
    }
    scope.styles = () => {
      let style = {}

      if (scope.size) {
        style['font-size'] = `${scope.size}px`
      }

      if (scope.color) {
        style.color = scope.color
      }

      return style
    }
  }
}

const directive = function() {
  return {
    template,
    controller: ['$scope', controller],
    scope: {
      type: '@',
      size: '@',
      color: '@'
    },
    replace: true
  }
}

export default directive
