const directive = function() {
  const prefixCls = 'ivu-menu'

  const template = `
  <li ng-class="classes()" ng-mouseenter="handleMouseenter()" ng-mouseleave="handleMouseleave()">
    <div class="${prefixCls}-submenu-title" ng-click="handleClick()" ref="reference">
        <span ng-bind="name" ng-if="name"></span>
        <span ng-if="!name" style="opacity: 0;">o</span>
        <i-icon type="ios-arrow-down" class="${prefixCls}-submenu-title-icon"></i-icon>
    </div>
    <collapse-transition ng-if="mode === 'vertical'">
      <ul class="ngcollapse" ng-show="opened">
        <ng-transclude></ng-transclude>
      </ul>
    </collapse-transition>
    <transition name="slide-up" ng-if="mode === 'horizontal'">
      <Drop
          ng-show="opened"
          placement="bottom"
          ref="drop"
          ng-style="dropStyle()"><ul class="${prefixCls}-drop-list"><ng-transclude></ng-transclude></ul>
      </Drop>
    </transition>
  </li>
`
  const link = function submenuCtrl(scope, element, attrs, ctrl) {
    const menuCtrl = ctrl[0]
    if (menuCtrl.accordion) {
      if (menuCtrl.openKeys && menuCtrl.openKeys[0] === scope.key) {
        scope.opened = true
        callbackIfHave()
      }
    } else {
      menuCtrl.openKeys && menuCtrl.openKeys.some(key => {
        if (key === scope.key) {
          scope.opened = true
          callbackIfHave()
          return true
        }
      })
    }
    scope.mode = menuCtrl.mode
    scope.classes = () => {
      return [
        `${prefixCls}-submenu`,
        {
          [`${prefixCls}-item-active`]: scope.active,
          [`${prefixCls}-opened`]: scope.opened,
          [`${prefixCls}-submenu-disabled`]: scope.disabled
        }
      ]
    }
    scope.handleMouseenter = () => {
      if (scope.disabled) return
      if (menuCtrl.mode === 'vertical') return
      // clearTimeout(this.timeout)
      // this.timeout = setTimeout(() => {
      //   scope.opened = true
      // }, 250)
      scope.opened = true
    }
    scope.handleMouseleave = () => {
      if (scope.disabled) return
      if (menuCtrl.mode === 'vertical') return

      // clearTimeout(this.timeout)
      // this.timeout = setTimeout(() => {
      //   scope.opened = false
      // }, 150)
      scope.opened = false
    }
    scope.handleClick = () => {
      if (scope.disabled) return
      if (menuCtrl.mode === 'horizontal') return
      if (menuCtrl.accordion && !scope.opened) {
        menuCtrl._openSubmenu(scope.key)
      } else {
        scope.opened = !scope.opened
        callbackIfHave()
      }
    }

    scope.$on('OnOpenSubmenu', function(event, key) {
      scope.opened = scope.key === key
      callbackIfHave()
    })

    function callbackIfHave() {
      if (menuCtrl.onOpenChange && scope.opened) {
        menuCtrl.onOpenChange({key: scope.key})
      }
    }
    scope.dropStyle = () => {
      let style = {}

      if (scope.dropWidth) style.minWidth = `${scope.dropWidth}px`
      return style
    }
    scope.$watch(() => scope.mode, (val) => {
      if (val === 'horizontal') {
        scope.$broadcast('on-update-popper')
      }
    })
    scope.$watch(() => scope.opened, (val) => {
      if (scope.mode === 'vertical') return
      if (val) {
        scope.dropWidth = parseFloat(element.css('width'))
        scope.$broadcast('on-update-popper')
      } else {
        scope.$broadcast('on-destroy-popper')
      }
    })
  }

  return {
    restrict: 'E',
    template: template,
    transclude: true,
    require: ['^^iMenu'],
    link: link,
    scope: {
      key: '@',
      name: '@',
      disabled: '<?'
    }
  }
}

export default directive
