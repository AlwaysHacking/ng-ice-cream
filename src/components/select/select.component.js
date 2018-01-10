import angular from 'angular'
// import $ from 'jquery'

const template = () => (`
  <div ng-class="classes()" ng-style=selectStyles() tabindex='-1' ng-blur="$ctrl.handleClose($event)">
        <div
            ng-class="selectionCls()"
            ref="reference"
            ng-click="$ctrl.toggleMenu()">
                <!--<div class="ivu-tag" v-for="(item, index) in selectedMultiple">-->
                    <!--<span class="ivu-tag-text">{{ item.value }}</span>-->
                    <!--<Icon type="ios-close-empty" @click.native.stop="removeTag(index)"></Icon>-->
                <!--</div>-->
                <span class="ivu-select-placeholder" ng-show="!$ctrl.ngModel && !$ctrl.filterable">{{$ctrl.placeholder}}</span>
                <span class="ivu-select-selected-value" ng-show="$ctrl.ngModel && !$ctrl.multiple && !$ctrl.filterable">{{ $ctrl.ngModel.label }}</span>
                <input
                    type="text"
                    ng-if="$ctrl.filterable"
                    ng-model="$ctrl.ngModel"
                    ng-disabled="$ctrl.disabled"
                    class="ivu-select-input"
                    placeholder="{{$ctrl.placeholder}}"
                    ng-blur="$ctrl.handleClose($event)"
                    ng-style="inputStyle()"
                    ref="input">
                <i-icon type="ios-close" class="ivu-select-arrow" ng-show="!$ctrl.multiple && $ctrl.clearable && !!$ctrl.ngModel" ng-click="$ctrl.clearSingleSelect($event)"></i-icon>
                <i-icon type="arrow-down-b" class="ivu-select-arrow" ng-if="!remote" ng-hide="$ctrl.clearable && !!$ctrl.ngModel"></i-icon>
        </div>
        <div ng-class="dropdownCls()" class="ivu-select-dropdown" ng-class="className()" ng-style="styles()" ng-show="$ctrl.dropVisible()">
          <!--<ul ng-show="$ctrl.notFoundShow" class="ivu-select-not-found"><li>无匹配数据</li></ul>-->
          <ul ng-show="(!notFound && !remote) || (remote && !loading && !notFound)" class="ivu-select-dropdown-list" ng-if="$ctrl.optionGroup">
            <li class="ivu-select-group-wrap" ng-show="!hidden" ng-repeat="item in $ctrl.iOptionDataAll">
              <div class="ivu-select-group-title">{{ item.optionGroup }}</div>
              <ul>
                <li class="ivu-select-group">
                  <li ref="options" ng-class="[optionClasses(),{true:'ivu-select-item-disabled',false:''}[optionItem.disabled],{true:'ivu-select-item-selected',false:''}[optionItem.selected]]" ng-click="$ctrl.select('group',$parent.$index,$index,$event)" ng-mouseout="$ctrl.blur()" ng-show="!hidden" ng-repeat="optionItem in item.option">{{ optionItem.label }}</li>
                 </li>
              </ul>
            </li>
          </ul>
          <ul ng-show="(!notFound && !remote) || (remote && !loading && !notFound)" class="ivu-select-dropdown-list" ng-if="!$ctrl.optionGroup">
            <li ref="options" ng-class="[optionClasses(),{true:'ivu-select-item-disabled',false:''}[item.disabled],{true:'ivu-select-item-selected',false:''}[item.selected]]" ng-click="$ctrl.select('',0,$index,$event)" ng-mouseout="$ctrl.blur()" ng-show="!hidden" ng-repeat="item in $ctrl.iOptionDataAll">{{ item.label }}</li>
          </ul>
          <!--<ul ng-show="loading" class="ivu-select-loading">{{ localeLoadingText }}</ul>-->
        </div>
    </div>
`)

const controller = function inputCtrl ($scope) {
  var ctrl = this
  this.$onInit = () => {
    document.addEventListener('keydown', this.handleKeydown)
    this.iOptionDataAll = angular.copy(this.iOptionData)
    $scope.filterable = this.filterable || false
    $scope.clearable = this.clearable || false
    $scope.optionGroup = this.optionGroup || false
    $scope.size = this.size
    $scope.disabled = this.disabled || false
    $scope.placeholder = this.placeholder
    $scope.focusIndex = this.focusIndex
    // $scope.notFoundShow = this.notFoundShow
    // 事件
    $scope.handleClose = this.handleClose
    $scope.hideMenu = this.hideMenu
    $scope.toggleMenu = this.toggleMenu
    $scope.dropVisible = this.dropVisible
    $scope.clearSingleSelect = this.clearSingleSelect
    $scope.inputState = this.inputState
    if (this.ngModel) {
      if (this.optionGroup) {
        for (let i = 0; i < this.iOptionDataAll.length; i++) {
          for (let j = 0; j < this.iOptionDataAll[i].option.length; j++) {
            if (this.iOptionDataAll[i].option[j].value === this.ngModel) {
              this.iOptionDataAll[i].option[j].selected = true
            }
          }
        }
      } else {
        for (let i = 0; i < this.iOptionDataAll.length; i++) {
          if (this.iOptionDataAll[i].value === this.ngModel) {
            this.iOptionDataAll[i].selected = true
          }
        }
      }
    }
  }
  const prefixCls = 'ivu-select'
  const prefixClsOption = 'ivu-select-item'
  this.$onChanges = () => {
    $scope.classes = () => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-visible`]: this.visible,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-multiple`]: this.multiple,
          [`${prefixCls}-single`]: !this.multiple,
          [`${prefixCls}-show-clear`]: this.showCloseIcon,
          [`${prefixCls}-${this.size}`]: !!this.size
        }
      ]
    }
    $scope.dropdownCls = () => {
      return {
        [prefixCls + '-dropdown-transfer']: this.transfer,
        [prefixCls + '-multiple']: this.multiple && this.transfer,
        'ivu-auto-complete': this.autoComplete
      }
    }
    $scope.selectionCls = () => {
      return {
        [`${prefixCls}-selection`]: !this.autoComplete
      }
    }
    $scope.inputStyle = () => {
      let style = {}
      if (this.multiple) {
        style.width = '100%'
        // else {
        //   style.width = `${this.inputLength}px`
        // }
      }
      return style
    }
    $scope.selectStyles = () => {
      return {
        width: `${this.width}px` || '100%'
      }
    }
    $scope.styles = () => {
      let style = {}
      if (this.width) style.width = `${this.width}px`
      return style
    }
    $scope.optionClasses = () => {
      return [
        `${prefixClsOption}`,
        {
          [`${prefixClsOption}-focus`]: this.isFocus
        }
      ]
    }
  }
  this.handleClose = (e) => {
    this.hideMenu(e)
  }
  this.hideMenu = (e) => {
    angular.element(e.target).children().find('li.ivu-select-item').removeClass('ivu-select-item-focus')
    this.visible = false
  }
  this.toggleMenu = () => {
    if (this.disabled || this.autoComplete) {
      return false
    }
    this.visible = !this.visible
    this.focusIndex = -1
  }
  this.dropVisible = () => {
    let status = true
    if (!this.loading && this.remote) status = false
    if (this.autoComplete) status = false
    return this.visible && status
  }
  this.select = (type, group, item, e) => {
    if (type) {
      if (this.iOptionDataAll[group].option[item].disabled) {
        return false
      } else {
        this.ngModel = this.iOptionDataAll[group].option[item]
        angular.element(e.target).addClass('ivu-select-item-selected')
        angular.element(e.target).siblings().removeClass('ivu-select-item-selected')
        angular.element(e.target).parent().parent().siblings().children().find('li').removeClass('ivu-select-item-selected')
        this.hideMenu(e)
      }
    } else {
      if (this.iOptionDataAll[item].disabled) {
        return false
      } else {
        this.ngModel = this.iOptionDataAll[item]
        angular.element(e.target).addClass('ivu-select-item-selected').siblings().removeClass('ivu-select-item-selected')
        this.hideMenu(e)
      }
    }
  }
  this.inputState = (e) => {
  }
  $scope.$watch('$ctrl.ngModel', function (n, o) {
    if (n === '') {
      ctrl.iOptionDataAll = angular.copy(ctrl.iOptionData)
    }
  }, true)
  this.handleKeydown = (e) => {
    if (this.visible) {
      const keyCode = e.keyCode
      // Esc slide-up
      if (keyCode === 27) {
        e.stopPropagation()
        this.hideMenu(e)
        $scope.$apply()
      }
      // next
      if (keyCode === 40) {
        e.preventDefault()
        this.navigateOptions('next', e)
      }
      // prev
      if (keyCode === 38) {
        e.preventDefault()
        this.navigateOptions('prev', e)
      }
      // enter
      if (keyCode === 13) {
        e.stopPropagation()
        if (this.filterable) {
          for (let i = 0; i < angular.element(e.target).parent().siblings().find('li.ivu-select-item').length; i++) {
            if (angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i).hasClass('ivu-select-item-focus')) {
              if (this.optionGroup) {
                this.ngModel = angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i)[0].innerHTML
                angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i).removeClass('ivu-select-item-focus')
                angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i).addClass('ivu-select-item-selected')
                angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i).siblings().removeClass('ivu-select-item-selected')
                angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i).parent().parent().siblings().children().find('li').removeClass('ivu-select-item-selected')
                this.hideMenu(e)
              } else {
                this.ngModel = angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i)[0].innerHTML
                angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i).removeClass('ivu-select-item-focus')
                angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i).addClass('ivu-select-item-selected').siblings().removeClass('ivu-select-item-selected')
                this.hideMenu(e)
              }
            }
          }
        } else {
          for (let i = 0; i < angular.element(e.target).children().find('li.ivu-select-item').length; i++) {
            if (angular.element(e.target).children().find('li.ivu-select-item').eq(i).hasClass('ivu-select-item-focus')) {
              if (this.optionGroup) {
                this.ngModel = angular.element(e.target).children().find('li.ivu-select-item').eq(i)[0].innerHTML
                angular.element(e.target).children().find('li.ivu-select-item').eq(i).removeClass('ivu-select-item-focus')
                angular.element(e.target).children().find('li.ivu-select-item').eq(i).addClass('ivu-select-item-selected')
                angular.element(e.target).children().find('li.ivu-select-item').eq(i).siblings().removeClass('ivu-select-item-selected')
                angular.element(e.target).children().find('li.ivu-select-item').eq(i).parent().parent().siblings().children().find('li').removeClass('ivu-select-item-selected')
                this.hideMenu(e)
              } else {
                this.ngModel = angular.element(e.target).children().find('li.ivu-select-item').eq(i)[0].innerHTML
                angular.element(e.target).children().find('li.ivu-select-item').eq(i).removeClass('ivu-select-item-focus')
                angular.element(e.target).children().find('li.ivu-select-item').eq(i).addClass('ivu-select-item-selected').siblings().removeClass('ivu-select-item-selected')
                this.hideMenu(e)
              }
            }
          }
        }
        $scope.$apply()
      }
      // delete
      if (this.filterable) { // 搜索功能待修复
        // $scope.$watch('$ctrl.ngModel', function (a, b) {
        //   if (a !== b) {
        //     console.log(a + ' ' + b)
        //   }
        // })
        // if (this.ngModel.length >= 0) {
        //   for (let i = 0; i < angular.element(e.target).parent().siblings().find('li.ivu-select-item').length; i++) {
        //     if (angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i)[0].innerHTML.indexOf(this.ngModel) === -1) {
        //       angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i)[0].style.display = 'none'
        //     } else {
        //       angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i)[0].style.display = 'block'
        //     }
        //   }
        //   $scope.noFound = 0
        //   for (let i = 0; i < angular.element(e.target).parent().siblings().find('li.ivu-select-item').length; i++) {
        //     if (angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(i)[0].style.display === 'none') {
        //       $scope.noFound++
        //     }
        //   }
        //   // if ($scope.noFound === angular.element(e.target).parent().siblings().find('li.ivu-select-item').length) {
        //   //   this.notFoundShow = true
        //   // } else {
        //   //   this.notFoundShow = false
        //   // }
        // }
        // $scope.$apply()
      } else {
        return false
      }
    }
  }
  this.navigateOptions = (direction, e) => {
    if (this.filterable) {
      if (direction === 'next') {
        this.focusIndex = this.focusIndex + 1
        angular.element(e.target).parent().siblings().find('li.ivu-select-item').removeClass('ivu-select-item-focus')
        angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(this.eqNext(direction, e, this.focusIndex)).addClass('ivu-select-item-focus')
        this.focusIndex = (this.focusIndex === angular.element(e.target).parent().siblings().find('li.ivu-select-item').length) ? 0 : this.focusIndex
      } else if (direction === 'prev') {
        this.focusIndex = this.focusIndex - 1
        angular.element(e.target).parent().siblings().find('li.ivu-select-item').removeClass('ivu-select-item-focus')
        angular.element(e.target).parent().siblings().find('li.ivu-select-item').eq(this.eqNext(direction, e, this.focusIndex)).addClass('ivu-select-item-focus')
        this.focusIndex = (this.focusIndex < 0) ? angular.element(e.target).parent().siblings().find('li.ivu-select-item').length - 1 : this.focusIndex
      }
    } else {
      if (direction === 'next') {
        this.focusIndex = this.focusIndex + 1
        angular.element(e.target).children().find('li.ivu-select-item').removeClass('ivu-select-item-focus')
        angular.element(e.target).children().find('li.ivu-select-item').eq(this.eqNext(direction, e, this.focusIndex)).addClass('ivu-select-item-focus')
        this.focusIndex = (this.focusIndex === angular.element(e.target).children().find('li.ivu-select-item').length) ? 0 : this.focusIndex
      } else if (direction === 'prev') {
        this.focusIndex = this.focusIndex - 1
        angular.element(e.target).children().find('li.ivu-select-item').removeClass('ivu-select-item-focus')
        angular.element(e.target).children().find('li.ivu-select-item').eq(this.eqNext(direction, e, this.focusIndex)).addClass('ivu-select-item-focus')
        this.focusIndex = (this.focusIndex < 0) ? angular.element(e.target).children().find('li.ivu-select-item').length - 1 : this.focusIndex
      }
    }
  }
  this.clearSingleSelect = (e) => {
    this.ngModel = ''
    e.stopPropagation()
    angular.element(e.target).parent().parent().next().children().find('li').removeClass('ivu-select-item-selected')
    this.visible = true
  }
  this.eqNext = (direction, e, next) => {
    if (direction === 'next') {
      next = (this.focusIndex === angular.element(e.target).children().find('li.ivu-select-item').length) ? 0 : this.focusIndex
      if (angular.element(e.target).children().find('li.ivu-select-item').eq(next).hasClass('ivu-select-item-disabled')) {
        this.focusIndex = this.focusIndex + 1
        this.focusIndex = (this.focusIndex === angular.element(e.target).children().find('li.ivu-select-item').length) ? 0 : this.focusIndex
        return this.eqNext(direction, e, this.focusIndex)
      } else {
        return next
      }
    } else if (direction === 'prev') {
      next = (this.focusIndex < 0) ? angular.element(e.target).children().find('li.ivu-select-item').length - 1 : this.focusIndex
      if (angular.element(e.target).children().find('li.ivu-select-item').eq(next).hasClass('ivu-select-item-disabled')) {
        this.focusIndex = this.focusIndex - 1
        this.focusIndex = (this.focusIndex < 0) ? angular.element(e.target).children().find('li.ivu-select-item').length - 1 : this.focusIndex
        return this.eqNext(direction, e, this.focusIndex)
      } else {
        return next
      }
    }
  }
}

export default {
  transclude: true,
  template: template(),
  controller: ['$scope', controller],
  bindings: {
    width: '@?',
    ngModel: '=?',
    multiple: '<?',
    filterable: '<?',
    iOptionData: '<?',
    optionGroup: '<?',
    size: '@?',
    disabled: '<?',
    clearable: '<?',
    placeholder: '@?'
    // 事件绑定部分
  }
}
