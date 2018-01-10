const directive = function() {
  const link = function (scope, element, attrs, ctrl) {
    const prefixCls = 'ivu-menu'
    scope.mode = scope.mode === 'horizontal' || scope.mode === 'vertical' ? scope.mode : 'vertical'
    scope.theme = (scope.theme === 'light' ||
                  scope.theme === 'dark' ||
                  scope.theme === 'primary' && scope.mode === 'horizontal'
                  ? scope.theme : 'light')
    scope.width = scope.width || '240px'
    scope.classes = () => {
      let theme = scope.theme
      if (scope.mode === 'vertical' && scope.theme === 'primary') theme = 'light'
      return [
        `${prefixCls}`,
        `${prefixCls}-${theme}`,
        {
          [`${prefixCls}-${scope.mode}`]: scope.mode
        }
      ]
    }
    scope.styles = () => {
      let style = {}

      if (scope.mode === 'vertical') {
        style.width = scope.width
        style.minHeight = scope.minHeight
      }
      return style
    }
    scope.$watch(() => scope.activeKey, function(newValue) {
      scope.$broadcast('update-active-key', newValue)
    })
  }

  return {
    restrict: 'E',
    template: '<ul ng-class="classes()" ng-style="styles()" ng-transclude></ul>',
    transclude: true,
    scope: {
      mode: '@',
      theme: '@',
      accordion: '<',
      width: '@',
      activeKey: '@',
      openNames: '<',
      onSelect: '&',
      onOpenChange: '&',
      minHeight: '@'
    },
    link: link,
    controller: ['$scope', function($scope) {
      this.mode = $scope.mode === 'horizontal' || $scope.mode === 'vertical' ? $scope.mode : 'vertical'
      this.theme = ($scope.theme === 'light' ||
                    $scope.theme === 'dark' ||
                    $scope.theme === 'primary' && $scope.mode === 'horizontal'
                    ? $scope.theme : 'light')
      this.accordion = $scope.accordion || false
      this.width = $scope.width || '240px'
      this.activeKey = $scope.activeKey
      this.openNames = $scope.openNames
      this._selectMenuItem = function(name) {
        $scope.$broadcast('OnSelectMenuItem', name)
      }
      this._openSubmenu = function(name) {
        $scope.$broadcast('OnOpenSubmenu', name)
      }
      this.onOpenChange = $scope.onOpenChange
      this.onSelect = $scope.onSelect
    }]
  }
}

export default directive
