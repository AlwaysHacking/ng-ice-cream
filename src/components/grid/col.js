const template = () => (`
  <div ng-transclude></div>
`)

export default () => ({
  restrict: 'E',
  require: '^^iRow',
  transclude: true,
  scope: {
    span: '@',
    order: '@',
    offset: '@',
    push: '@',
    pull: '@',
    className: '@',
    xs: '<',
    sm: '<',
    md: '<',
    lg: '<'
  },
  template: template,
  link: function(scope, element, attrs, rowCtrl) {
    scope.gutter = rowCtrl.gutter
    const prefixCls = 'ivu-col'
    scope.classes = () => {
      let classList = [`${prefixCls}`];

      ['span', 'order', 'offset', 'push', 'pull'].forEach(attr => {
        if (scope[attr] !== undefined) {
          classList.push(`${prefixCls}-${attr}-${scope[attr]}`)
        }
      })

      if (scope.className !== undefined) {
        classList.push(scope.className)
      }

      ['xs', 'sm', 'md', 'lg'].forEach(size => {
        if (typeof scope[size] === 'number') {
          classList.push(`${prefixCls}-span-${size}-${scope[size]}`)
        } else if (typeof scope[size] === 'object') {
          let props = scope[size]
          Object.keys(props).forEach(prop => {
            classList.push(
                      prop !== 'span'
                          ? `${prefixCls}-${size}-${prop}-${props[prop]}`
                          : `${prefixCls}-span-${size}-${props[prop]}`
                  )
          })
        }
      })

      return classList.join(' ')
    }

    scope.styles = () => {
      let style = {}
      if (scope.gutter !== 0) {
        style = {
          paddingLeft: scope.gutter / 2 + 'px',
          paddingRight: scope.gutter / 2 + 'px'
        }
      }

      return style
    }

    element.addClass(scope.classes())
    element.css(scope.styles())
  }
})
