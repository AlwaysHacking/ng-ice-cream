const template = () => (
  `
  <card ng-class="classes()" ng-style=cardStyles()>
    <div ng-class="headClasses()" ng-transclude="title"></div>
    <div ng-class="extraClasses()" ng-transclude="extra"></div>
    <div ng-class="bodyClasses()" ng-style="bodyStyles()" style="word-wrap: break-word;"></div>
  </card>
  `
)

const controller = function cardCtrl ($scope) {
  this.$onInit = () => {
    $scope.classes = this.classes
    $scope.cardStyles = this.cardStyles
    $scope.headClasses = this.headClasses
    $scope.extraClasses = this.extraClasses
    $scope.bodyClasses = this.bodyClasses
    $scope.bodyStyles = this.bodyStyles
  }
  const prefixCls = 'ivu-card'
  this.classes = () => {
    return [
      `${prefixCls}`,
      {
        [`${prefixCls}-bordered`]: this.bordered && !this.shadow,
        [`${prefixCls}-dis-hover`]: this.disHover || this.shadow,
        [`${prefixCls}-shadow`]: this.shadow
      }
    ]
  }
  this.cardStyles = () => {
    return {
      width: `${this.width}px` || '100%',
      display: 'block'
    }
  }
  this.headClasses = () => {
    return `${prefixCls}-head`
  }
  this.extraClasses = () => {
    return `${prefixCls}-extra`
  }
  this.bodyClasses = () => {
    return `${prefixCls}-body`
  }
  this.bodyStyles = () => {
    return {
      padding: `${this.padding}px` || 16
    }
  }
}

export default {
  transclude: {
    'title': '?iCardTitle',
    'extra': '?iCardExtra'
  },
  template: template(),
  controller: ['$scope', controller],
  bindings: {
    bordered: '<?',
    disHover: '<?',
    shadow: '<?',
    padding: '<?',
    width: '<?'
  }
}
