const directive = function() {
  const prefixCls = 'ivu-modal'

  const template = `
  <div>
    <div class="${prefixCls}-mask" ng-show="show" ng-click="mask()"></div>
    <div ng-class="wrapClasses()" ng-click="handleWrapClick($event)">
      <div class="${prefixCls}" ng-style="mainStyles()" ng-show="show">
          <div class="${prefixCls}-content">
              <a class="${prefixCls}-close" ng-if="closable" ng-click="close()">
                <i-icon type="ios-close-empty"></i-icon>
              </a>
              <div class="${prefixCls}-header" ng-show="header !== undefined" ng-transclude="header"><div class="${prefixCls}-header-inner">{{ header }}</div></div>
              <div class="${prefixCls}-body" ng-transclude></div>
              <div class="${prefixCls}-footer" ng-if="!footerHide" ng-transclude="footer">
                <i-button type="ghost" size="large" ng-click="cancel()">取消</i-button>
                <i-button type="primary" size="large" loading="buttonLoading" ng-click="ok()">确定</i-button>
              </div>
          </div>
      </div>
    </div>
  </div>
  `

  const controller = function(scope) {
    this.$onInit = () => {
      scope.width = scope.width || 520
      if (scope.closable === undefined) {
        scope.closable = true
      }
      scope.wrapClasses = () => {
        return [
          `${prefixCls}-wrap`,
          {
            [`${prefixCls}-hidden`]: !scope.show,
            [`${scope.className}`]: !!scope.className
          }
        ]
      }

      scope.mainStyles = () => {
        let style = {}

        const width = parseInt(scope.width)
        const styleWidth = {
          width: width <= 100 ? `${width}%` : `${width}px`
        }

        const customStyle = scope.styles ? scope.styles : {}

        Object.assign(style, styleWidth, customStyle)

        return style
      }
      scope.close = () => {
        scope.show = false
        scope.onCancel()
      }
      scope.mask = () => {
        if (scope.maskClosable) {
          scope.close()
        }
      }

      scope.handleWrapClick = (event) => {
      // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
        const className = event.target.getAttribute('class')
        if (className && className.indexOf(`${prefixCls}-wrap`) > -1) scope.mask()
      }

      scope.EscClose = (e) => {
        if (scope.show && scope.closable) {
          if (e.keyCode === 27) {
            scope.close()
            scope.$apply()
          }
        }
      }
      document.addEventListener('keydown', scope.EscClose)

      scope.cancel = () => {
        scope.close()
        scope.onCancel()
      }
      scope.ok = () => {
        if (scope.loading) {
          scope.buttonLoading = true
        } else {
          scope.show = false
        }
        scope.onOk()
      }
    }
  }
  return {
    template,
    restrict: 'E',
    controller: ['$scope', controller],
    scope: {
      show: '=?',
      header: '@',
      closable: '<',
      maskClosable: '<',
      width: '<',
      styles: '<',
      className: '@',
      onOk: '&',
      footerHide: '<',
      onCancel: '&'
    },
    transclude: {
      'footer': '?iModalFooter',
      'header': '?iModalHeader'
    }
  }
}

export default directive
