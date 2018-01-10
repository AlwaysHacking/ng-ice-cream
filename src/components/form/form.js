const directive = function () {
  const prefixCls = `ivu-form`
  const template = `<form ng-class="classes()" autocomplete="autocomplete" ng-transclude></form>`
  const link = function(scope, element, attrs, ctrl) {
    scope.labelPosition = scope.labelPosition || 'right'
    scope.showMessage = scope.showMessage || 'true'
    scope.classes = () => {
      return [
        `${prefixCls}`,
        `${prefixCls}-label-${scope.labelPosition}`,
        {
          [`${prefixCls}-inline`]: scope.inline === 'true'
        }
      ]
    }
    scope.resetFields = () => {
      scope.fields.forEach(field => {
        field.resetField()
      })
    }
    scope.validate = (callback) => {
      return new Promise(resolve => {
        let valid = true
        let count = 0
        scope.fields.forEach(field => {
          field.validate(errors => {
            if (errors) {
              valid = false
            }
            if (++count === scope.fields.length) {
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    }
  }
  const controller = function(scope) {
    scope.fields = []
    this.labelWidth = scope.labelWidth
    this.rules = scope.rules
    this.model = scope.model
    this.fields = scope.fields
  }
  return {
    restrict: 'E',
    link: link,
    template: template,
    controller: ['$scope', controller],
    scope: {
      model: '=',
      rules: '<',
      inline: '@',
      labelPosition: '@',
      labelWidth: '@',
      showMessage: '@',
      autocomplete: '@'
    },
    transclude: true
  }
}
export default directive
