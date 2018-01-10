const template = () => (`
  <div ng-class="classes()" ng-style="styles()" ng-transclude></div>
`)

const controller = function RowCtrl($scope) {
  const prefixCls = 'ivu-row'

  this.gutter = $scope.gutter
  $scope.gutter = $scope.gutter || 0
  $scope.classes = () => {
    return [
      {
        [`${prefixCls}`]: !$scope.type,
        [`${prefixCls}-${$scope.type}`]: !!$scope.type,
        [`${prefixCls}-${$scope.type}-${$scope.align}`]: !!$scope.align,
        [`${prefixCls}-${$scope.type}-${$scope.justify}`]: !!$scope.justify,
        [`${$scope.className}`]: !!$scope.className
      }
    ]
  }

  $scope.styles = () => {
    let style = {}
    if ($scope.gutter !== 0) {
      style = {
        marginLeft: $scope.gutter / -2 + 'px',
        marginRight: $scope.gutter / -2 + 'px'
      }
    }

    return style
  }
}

export default () => ({
  restrict: 'E',
  transclude: true,
  scope: {
    type: '@',
    align: '@',
    justify: '@',
    gutter: '<',
    className: '@'
  },
  template: template,
  controller: ['$scope', controller]
})
