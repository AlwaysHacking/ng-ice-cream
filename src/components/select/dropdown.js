import Popper from 'popper.js'
const directive = function() {
  const template = `
  <div class="ivu-select-dropdown" ng-style="styles()">
    <ng-transclude></ng-transclude>
  </div>`

  const link = function(scope, element, attrs, ctrl) {
    scope.styles = () => {
      let style = {}
      if (this.width) style.width = `${this.width}px` // TODO: this.width
      return style
    }
    scope.placement = scope.placement || 'bottom-start'
    scope.update = () => {
      if (this.popper) {
        this.popper.update()
      } else {
        console.log(element.parent().siblings("div[ref='reference']"))
        this.popper = new Popper(
          element.parent().siblings("div[ref='reference']"),
          element,
          {
            gpuAcceleration: false,
            placement: scope.placement,
            boundariesPadding: 0,
            forceAbsolute: true,
            boundariesElement: 'body'
          }
        )
        this.popper.options.onCreate(popper => {
          this.resetTransformOrigin(popper)
        })
      }
    }

    this.resetTransformOrigin = (popper) => {
      let placementMap = {top: 'bottom', bottom: 'top'}
      let placement = popper._popper.getAttribute('x-placement').split('-')[0]
      let origin = placementMap[placement]
      popper._popper.style.transformOrigin = `center ${origin}`
    }
    scope.destroy = () => {
      console.log('destroy')
    }
    scope.$on('on-update-popper', scope.update)
    scope.$on('on-destroy-popper', scope.destroy)
  }

  return {
    template: template,
    link: link,
    transclude: true,
    scope: {
      className: '@',
      placement: '@'
    },
    restrict: 'E'
  }
}

export default directive
