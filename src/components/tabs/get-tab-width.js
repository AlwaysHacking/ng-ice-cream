const directive = function($timeout) {
  const link = function(scope, element, attrs, iTabsCtrl) {
    $timeout(() => {
      let widths = {}
      widths[attrs.key] = element[0].offsetWidth + 'px'
      scope.$emit('tabWidth', widths)
    })
  }
  return {
    restrict: 'A',
    require: '^^iTabs',
    link: link
  }
}

export default ['$timeout', directive]
