const template = () => (`
  <div ng-style=inputStyles()>
        <div ng-if="$ctrl.type !== 'textarea'" ng-class="wrapClasses()">
            <div class="ivu-input-group-prepend" ng-transclude="prepend" ng-show="$ctrl.prepend"></div>
            <i class="ivu-icon" ng-class="['ivu-icon-' + $ctrl.icon, 'ivu-input-icon', 'ivu-input-icon-normal']" ng-if="$ctrl.icon" ng-click="iconClick()"></i>
            <i class="ivu-icon ivu-icon-load-c ivu-load-loop" ng-class="['ivu-input-icon', 'ivu-input-icon-validate']" ng-if="!$ctrl.icon"></i>
            <input
                autocomplete="{{$ctrl.autocomplete}}"
                ref="input"
                type="{{$ctrl.type}}"
                ng-class="inputClasses()"
                placeholder="{{$ctrl.placeholder}}"
                ng-disabled="$ctrl.disabled"
                maxlength="{{$ctrl.maxlength}}"
                ng-readonly="$ctrl.readonly"
                name="{{$ctrl.name}}"
                ng-model="$ctrl.ngModel"
                number="$ctrl.number"
                ng-focus="focus()"
                ng-blur="blur()"
                ng-change="change()"
                >
            <div class="ivu-input-group-append" ng-transclude="append" ng-show="$ctrl.append"></div>
        </div>
        <textarea ng-if="$ctrl.type === 'textarea'"
            autocomplete="{{$ctrl.autocomplete}}"
            ref="textarea"
            ng-class="textareaClasses()"
            ng-style="textareaStyles"
            placeholder="{{$ctrl.placeholder}}"
            ng-disabled="$ctrl.disabled"
            rows="{{$ctrl.rows}}"
            maxlength="{{$ctrl.maxlength}}"
            ng-readonly="$ctrl.readonly"
            name="{{$ctrl.name}}"
            ng-model="$ctrl.ngModel"
            ng-focus="focus()"
            ng-blur="blur()"
            >
        </textarea>
    </div>
`)

const controller = function inputCtrl ($scope) {
  this.$onInit = () => {
    this.autocomplete = this.autocomplete || 'off'
    this.type = this.type
    this.placeholder = this.placeholder
    this.disabled = this.disabled || false
    this.maxlength = this.maxlength
    this.readonly = this.readonly || false
    this.name = this.name || 'name'
    this.ngModel = this.ngModel
    this.number = this.number || false
    this.icon = this.icon
    this.rows = this.rows
    this.appendShow = this.appendShow
    this.prependShow = this.prependShow
    // 事件
    $scope.change = this.change
    $scope.focus = this.focus
    $scope.blur = this.blur
    $scope.iconClick = this.iconClick
  }
  const prefixCls = 'ivu-input'
  this.$onChanges = () => {
    $scope.wrapClasses = () => {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
          [`${prefixCls}-type`]: this.type,
          [`${prefixCls}-group`]: this.prepend || this.append,
          [`${prefixCls}-group-${this.size}`]: (this.prepend || this.append) && !!this.size,
          [`${prefixCls}-group-with-prepend`]: this.prepend,
          [`${prefixCls}-group-with-append`]: this.append,
          [`${prefixCls}-hide-icon`]: this.append  // #554
        }
      ]
    }
    $scope.inputStyles = () => {
      return {
        width: this.width ? `${this.width}px` : '100%',
        display: `inline-block`
      }
    }
    $scope.inputClasses = () => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-disabled`]: this.disabled
        }
      ]
    }
    $scope.textareaClasses = () => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled
        }
      ]
    }
  }
  this.change = () => {
    this.ngChange()
  }
  this.focus = () => {
    this.ngFocus()
  }
  this.blur = () => {
    this.ngBlur()
  }
  this.iconClick = () => {
    this.iIconClick()
  }
}

export default {
  transclude: {
    'prepend': '?iInputPrepend',
    'append': '?iInputAppend'
  },
  template: template(),
  controller: ['$scope', controller],
  bindings: {
    width: '@?',
    autocomplete: '@?', // 未验证
    type: '@',
    placeholder: '@?',
    disabled: '<?',
    maxlength: '=?',
    readonly: '<?',
    name: '@?',
    ngModel: '=?',
    number: '<?', // 未验证
    autofocus: '<?', // 未解决
    size: '@?',
    icon: '@?',
    rows: '=?',
    prepend: '<?',
    append: '<?',
    // 事件绑定部分
    ngChange: '&',
    ngFocus: '&',
    ngBlur: '&',
    iIconClick: '&'
  }
}
