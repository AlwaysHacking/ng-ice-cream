const directive = function ($timeout) {
  const prefixCls = 'ivu-tabs'
  const template = `
  <div ng-class="classes()" ng-style="style()">
    <div class="${prefixCls}-bar">
        <div class="${prefixCls}-nav-container">
            <div ref="navWrap" class="${prefixCls}-nav-wrap">
                <div ref="navScroll" class="${prefixCls}-nav-scroll">
                    <div ref="nav" class="${prefixCls}-nav nav-text">
                        <div ng-class="barClasses()" ng-style="barStyle()"></div>
                        <div get-tab-width ng-class="tabCls(pane)" ng-repeat="pane in panes" ng-click="clickTab(pane)" key="{{pane.key}}">
                            <i-icon ng-if="pane.icon" type="{{pane.icon}}"></i-icon>
                            {{ pane.tab }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div ng-class="contentClasses()" ng-style="contentStyle()" ng-transclude></div>
  </div>
  `
  const link = function (scope, element, attrs, ctrl) {
    scope.animated = scope.animated || true
    scope.classes = () => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-card`]: this.type === 'card',
          [`${prefixCls}-mini`]: this.size === 'small' && this.type === 'line',
          [`${prefixCls}-no-animation`]: !scope.animated
        }
      ]
    }

    scope.style = () => {
      return {
        overflow: 'inherit'
      }
    }

    scope.barClasses = () => {
      return [
        `${prefixCls}-ink-bar`,
        {
          [`${prefixCls}-ink-bar-animated`]: scope.animated
        }
      ]
    }

    scope.tabCls = (item) => {
      return [
        `${prefixCls}-tab`,
        {
          [`${prefixCls}-tab-disabled`]: item.disabled,
          [`${prefixCls}-tab-active`]: item.selected
        }
      ]
    }

    scope.contentClasses = () => {
      return [
        `${prefixCls}-content`,
        {
          [`${prefixCls}-content-animated`]: scope.animated
        }
      ]
    }

    // TODO: content sliding animation
    scope.contentStyle = () => {
      //   const x = scope.panes.findIndex((paneScope) => paneScope.selected)
      //   const p = x === 0 ? '0%' : `-${x}00%`

      //   let style = {}
      //   if (x > -1) {
      //     style = {
      //       transform: `translateX(${p}) translateZ(0px)`
      //     }
      //   }
      //   return style

      return {
        display: 'block',
        willChange: 'inherit'
      }
    }

    scope.tabCounts = 0
    scope.$on('tabWidth', (event, data) => {
      event.stopPropagation()
      scope.panes.forEach((paneScope) => {
        if (data[paneScope.key] !== undefined) {
          paneScope.tabWidth = data[paneScope.key]
        }
      })
      scope.tabCounts += 1
    })

    scope.$watch(() => scope.tabCounts, (newValue) => {
      if (newValue >= scope.panes.length) {
        updateCSS()
      }
    })

    scope.barStyle = () => {
      let style = {
        display: 'block',
        width: scope.barWidth
      }
      if (scope.animated) {
        style.transform = `translate3d(${scope.barOffset}px, 0px, 0px)`
      } else {
        style.left = `${scope.barOffset}px`
      }
      return style
    }

    scope.clickTab = (pane) => {
      scope.select(pane)
      updateCSS()
    }

    function updateCSS() {
      const index = scope.panes.findIndex(paneScope => paneScope.selected)
      scope.barWidth = scope.panes[index].tabWidth
      if (index > 0) {
        let offset = 0
        const gutter = scope.size === 'small' ? 0 : 16
        for (let i = 0; i < index; i++) {
          offset += parseFloat(scope.panes[i].tabWidth) + gutter
        }

        scope.barOffset = offset
      } else {
        scope.barOffset = 0
      }
    }

    scope.$watch(() => scope.activeKey, function(activeKey) {
      scope.panes.some((paneScope) => {
        if (paneScope.key === activeKey) {
          scope.select(paneScope)
          updateCSS()
          return true
        }
      })
    })
  }

  const controller = function iTabsCtrl ($scope) {
    let panes = $scope.panes = []
    $scope.select = function (paneScope) {
      panes.forEach((paneScope, index) => {
        paneScope.selected = false
      })
      paneScope.selected = true
    }

    this.addPane = (paneScope) => {
      if ($scope.activeKey !== undefined) {
        if ($scope.activeKey === paneScope.key) {
          $scope.select(paneScope)
        }
      } else {
        if (panes.length === 0) {
          $scope.select(paneScope)
        }
      }
      panes.push(paneScope)
    }
  }
  return {
    restrict: 'E',
    template: template,
    controller: ['$scope', controller],
    link: link,
    transclude: true,
    scope: {
      activeKey: '@'
    }
  }
}

export default ['$timeout', directive]
