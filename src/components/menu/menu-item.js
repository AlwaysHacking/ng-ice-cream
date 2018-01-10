const directive = function() {
  const link = function menuItemCtrl(scope, element, attrs, ctrl) {
    const prefixCls = 'ivu-menu'
    const menuCtrl = ctrl[0]
    scope.disabled = scope.disabled || false
    scope.active = scope.key === menuCtrl.activeKey && !scope.disabled
    openSubmenuIfHave()
    scope.classes = () => {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: scope.active,
          [`${prefixCls}-item-selected`]: scope.active,
          [`${prefixCls}-item-disabled`]: scope.disabled
        }
      ]
    }
    scope.styles = () => {
      let style = {}

      if (menuCtrl.mode === 'vertical') style.width = menuCtrl.width

      return style
    }
    scope.handleClick = () => {
      if (scope.disabled) return
      menuCtrl._selectMenuItem(scope.key)
    }
    scope.$on('OnSelectMenuItem', function(event, key) {
      scope.active = scope.key === key
      if (menuCtrl.onSelect && scope.active) {
        menuCtrl.onSelect({key: scope.key})
      }
    })
    scope.$on('update-active-key', function(event, key) {
      scope.active = scope.key === key
      openSubmenuIfHave()
    })
    function openSubmenuIfHave() {
      if (scope.active) {
        const submenuKey = element.closest('i-submenu').attr('key')
        if (submenuKey) {
          if (menuCtrl.accordion) {
            menuCtrl._openSubmenu(submenuKey)
          } else {
            scope.$emit('OnOpenSubmenu', submenuKey)
          }
        }
      }
    }
  }

  return {
    restrict: 'E',
    template: '<li ng-class="classes()" ng-click="handleClick()"><ng-transclude></ng-transclude></li>',
    transclude: true,
    require: ['^^iMenu'],
    link: link,
    scope: {
      key: '@',
      disabled: '<?'
    }
  }
}

export default directive
