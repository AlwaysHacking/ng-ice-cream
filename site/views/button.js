const template = `
  <i-button type="primary" disabled="true" ng-click="clicker()">Primary</i-button>
  <i-button type="default" ng-click="clicker()" ng-disabled="disabled">Default</i-button>
  <i-button type="ghost" ng-click="handler()">Ghost</i-button>
  <i-button type="dashed">Dashed</i-button>
  <i-button type="text">Text</i-button>
  <i-button type="info">Info</i-button>
  <i-button type="success">Success</i-button>
  <i-button type="warning">Warning</i-button>
  <i-button type="error">Error</i-button>
`

const directive = function() {
  const link = function(scope) {
    scope.clicker = () => {
      alert('click')
    }
    scope.handler = () => {
      scope.disabled = !scope.disabled
      console.log(scope.disabled)
    }
  }
  return {
    template,
    link
  }
}

export default directive
