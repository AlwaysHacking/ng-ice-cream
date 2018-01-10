import angular from 'angular'

const template = () => (`
  <div ng-class="wrapClasses()">
        <div ng-class="handlerClasses()">
            <a
                ng-click="up()"
                ng-mousedown="preventDefault($event)"
                ng-class="upClasses()">
                <span ng-class="innerUpClasses()" ng-click="preventDefault($event)"></span>
            </a>
            <a
                ng-click="down()"
                ng-mousedown="preventDefault($event)"
                ng-class="downClasses()">
                <span ng-class="innerDownClasses()" ng-click="preventDefault($event)"></span>
            </a>
        </div>
        <div ng-class="inputWrapClasses()">
            <input
                ng-class="inputClasses()"
                ng-disabled="$ctrl.disabled"
                autocomplete="off"
                ng-focus="focus()"
                ng-blur="blur()"
                ng-keydown="keyDown($event)"
                ng-change="change()"
                name="{{$ctrl.name}}"
                ng-model="$ctrl.ngModel"
                ng-readonly="$ctrl.readonly"
                >
        </div>
    </div>
`)

const controller = function inputCtrl($scope) {
  this.$onInit = () => {
    this.disabled = this.disabled || false
    this.readonly = this.readonly || false
    this.name = this.name || 'name'
    this.step = this.step || 1
    this.ngModel = this.ngModel || 1
    if (this.max === 0) {
      this.max = 0
    } else {
      this.max = this.max || Infinity
    }
    if (this.min === 0) {
      this.min = 0
    } else {
      this.min = this.min || -Infinity
    }
    // 事件
    $scope.change = this.change
    $scope.focus = this.focus
    $scope.blur = this.blur
    $scope.keyDown = this.keyDown
    $scope.preventDefault = this.preventDefault
    $scope.up = this.up
    $scope.down = this.down
  }
  const prefixCls = 'ivu-input-number'
  const iconPrefixCls = 'ivu-icon'
  this.$onChanges = () => {
    $scope.wrapClasses = () => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-focused`]: this.focused
        }
      ]
    }
    $scope.handlerClasses = () => {
      return `${prefixCls}-handler-wrap`
    }
    $scope.upClasses = () => {
      return [
        `${prefixCls}-handler`,
        `${prefixCls}-handler-up`,
        {
          [`${prefixCls}-handler-up-disabled`]: this.upDisabled
        }
      ]
    }
    $scope.innerUpClasses = () => {
      return `${prefixCls}-handler-up-inner ${iconPrefixCls} ${iconPrefixCls}-ios-arrow-up`
    }
    $scope.downClasses = () => {
      return [
        `${prefixCls}-handler`,
        `${prefixCls}-handler-down`,
        {
          [`${prefixCls}-handler-down-disabled`]: this.downDisabled
        }
      ]
    }
    $scope.innerDownClasses = () => {
      return `${prefixCls}-handler-down-inner ${iconPrefixCls} ${iconPrefixCls}-ios-arrow-down`
    }
    $scope.inputWrapClasses = () => {
      return `${prefixCls}-input-wrap`
    }
    $scope.inputClasses = () => {
      return `${prefixCls}-input`
    }
  }

  function addNum(num1, num2) {
    let sq1, sq2, m
    try {
      sq1 = num1.toString().split('.')[1].length
    } catch (e) {
      sq1 = 0
    }
    try {
      sq2 = num2.toString().split('.')[1].length
    } catch (e) {
      sq2 = 0
    }
    m = Math.pow(10, Math.max(sq1, sq2))
    return (Math.round(num1 * m) + Math.round(num2 * m)) / m
  }

  function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '')
  }

  this.change = () => {
    let oldVal = $scope.e
    let newVal = angular.copy(this.ngModel + '')
    let positionPoint = newVal.indexOf('.')
    $scope.pointAll = ''
    if (positionPoint !== '-1') {
      let beforePoint = newVal.substring(0, positionPoint)
      let afterPoint = newVal.substring(positionPoint + 1, newVal.length)
      $scope.pointAll = beforePoint + afterPoint
    }
    const max = this.max
    const min = this.min
    if (isValueNumber($scope.pointAll)) {
      if (newVal > max) {
        this.ngModel = max
      } else if (newVal < min) {
        this.ngModel = min
      } else {
        this.ngModel = newVal
      }
      this.ngChange()
    } else {
      if (newVal === '-') {
        this.ngModel = newVal
        this.ngChange()
      } else {
        this.ngModel = oldVal
      }
    }
  }
  this.focus = () => {
    this.ngFocus()
  }
  this.blur = () => {
    if (this.ngModel === '-') {
      this.ngModel = $scope.e
    }
    this.ngBlur()
  }
  this.keyDown = (e) => {
    if (isValueNumber(e.target.value.trim())) {
      $scope.e = e.target.value.trim()
    }
    if (e.keyCode === 38) {
      e.preventDefault()
      this.up(e)
    } else if (e.keyCode === 40) {
      e.preventDefault()
      this.down(e)
    }
  }
  this.preventDefault = (e) => {
    e.preventDefault()
  }
  this.up = () => {
    const targetVal = Number(this.ngModel)
    if (this.upDisabled && isNaN(targetVal)) {
      return false
    }
    this.changeStep('up')
  }
  this.down = () => {
    const targetVal = Number(this.ngModel)
    if (this.downDisabled && isNaN(targetVal)) {
      return false
    }
    this.changeStep('down')
  }
  this.changeStep = (type) => {
    if (this.disabled) {
      return false
    }
    const targetVal = Number(this.ngModel)
    let val = Number(this.ngModel)
    const step = Number(this.step)
    if (isNaN(val)) {
      return false
    }
    if (!isNaN(targetVal)) {
      if (type === 'up') {
        if (addNum(targetVal, step) <= this.max) {
          val = targetVal
        } else {
          return false
        }
      } else if (type === 'down') {
        if (addNum(targetVal, -step) >= this.min) {
          val = targetVal
        } else {
          return false
        }
      }
    }

    if (type === 'up') {
      val = addNum(val, step)
    } else if (type === 'down') {
      val = addNum(val, -step)
    }
    this.ngModel = val
    if (this.ngModel >= this.max || (this.ngModel + this.step) > this.max) {
      this.upDisabled = true
    } else {
      this.upDisabled = false
    }
    if (this.ngModel <= this.min || (this.ngModel - this.step) < this.min) {
      this.downDisabled = true
    } else {
      this.downDisabled = false
    }
  }
}

export default {
  transclude: true,
  template: template(),
  controller: ['$scope', controller],
  bindings: {
    disabled: '<?',
    readonly: '<?',
    name: '@?',
    ngModel: '=?',
    size: '@?',
    max: '=?',
    min: '=?',
    step: '=?',
    // 事件绑定部分
    ngChange: '&',
    ngFocus: '&',
    ngBlur: '&'
  }
}
