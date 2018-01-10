const template = `
  <i-modal show="show" header="万事屋">
    <p>坂田银时</p>
    <p>志村新八</p>
    <p>神乐</p>
  </i-modal>
  <i-button type="primary" ng-click="click()">显示弹窗</i-button>
`

const link = function(scope) {
  scope.click = () => {
    scope.show = true
  }
}

const directive = function() {
  return {
    template,
    link
  }
}

export default directive
