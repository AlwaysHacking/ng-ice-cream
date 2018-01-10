import AsyncValidator from 'async-validator'
const directive = function () {
  const prefixCls = `ivu-form-item`
  const template = `
  <div ng-class="classes()">
    <label class="${prefixCls}-label" for="labelFor" ng-style="labelStyles()" ng-if="label">{{ label }}</label>
    <div class="${prefixCls}-content" ng-style="contentStyles()">
      <ng-transclude></ng-transclude>
      <div class="${prefixCls}-error-tip" ng-if="validateState === 'error'">{{ validateMessage }}</div>
    </div>
  </div>
  `
  const link = function(scope, element, attrs, iFormCtrl) {
    iFormCtrl.fields.push(scope)
    scope.rules = iFormCtrl.rules[scope.prop]
    if (scope.rules.length) {
      scope.rules.every(rule => {
        if (rule.required) {
          scope.isRequired = true
          return false
        }
      })
    }
    scope.initialValue = iFormCtrl.model[scope.prop]
    scope.validateDisabled = false
    scope.validateMessage = ''
    scope.$watch(() => iFormCtrl.model[scope.prop], (newValue, oldValue) => {
      if (oldValue !== newValue && !scope.validateDisabled) {
        scope.validate()
      }
      scope.validateDisabled = false
    })
    scope.classes = () => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-required`]: scope.required === 'true' || scope.isRequired,
          [`${prefixCls}-error`]: scope.validateState === 'error',
          [`${prefixCls}-validating`]: scope.validateState === 'validating'
        }
      ]
    }
    scope.labelStyles = () => {
      let style = {}
      const labelWidth = scope.labelWidth || iFormCtrl.labelWidth
      if (labelWidth) {
        style.width = `${labelWidth}px`
      }
      return style
    }
    scope.contentStyles = () => {
      let style = {}
      const labelWidth = scope.labelWidth || iFormCtrl.labelWidth
      if (labelWidth) {
        style.marginLeft = `${labelWidth}px`
      }
      return style
    }
    scope.validate = (callback = function () {}) => {
      if (!scope.rules || scope.rules.length === 0) {
        callback()
        return true
      }

      scope.validateState = 'validating'

      let descriptor = {}
      descriptor[scope.prop] = scope.rules

      const validator = new AsyncValidator(descriptor)
      let model = {}

      model[scope.prop] = iFormCtrl.model[scope.prop]

      validator.validate(model, { firstFields: true }, errors => {
        scope.validateState = !errors ? 'success' : 'error'
        scope.validateMessage = errors ? errors[0].message : ''

        callback(scope.validateMessage)
      })
      scope.validateDisabled = false
    }
    scope.resetField = () => {
      scope.validateState = ''
      scope.validateMessage = ''
      iFormCtrl.model[scope.prop] = scope.initialValue
      scope.validateDisabled = true
    }
  }
  return {
    restrict: 'E',
    link,
    template,
    require: '^^iForm',
    scope: {
      prop: '@',
      label: '@',
      labelWidth: '@',
      labelPosition: '@',
      labelFor: '@',
      required: '@',
      rules: '<',
      error: '@',
      showMessage: '@'
    },
    transclude: true
  }
}
export default directive
