const template = `
<i-tabs active-key="{{activeKey}}">
  <i-tab-pane key="tab1" tab="路飞">
    <p>海贼王是我的！</p>
  </i-tab-pane>
  <i-tab-pane key="tab2" tab="索隆">
    <p>三刀流 三千世界</p>
  </i-tab-pane>
  <i-tab-pane key="tab3" tab="香吉士">
    <p>All Blue</p>
  </i-tab-pane>
</i-tabs>
<i-button type="primary" ng-click="jump('tab1')">tab1</i-button>
<i-button type="primary" ng-click="jump('tab2')">tab2</i-button>
<i-button type="primary" ng-click="jump('tab3')">tab3</i-button>
`

const controller = function($scope) {
  $scope.activeKey = 'tab1'
  $scope.jump = (key) => {
    $scope.activeKey = key
  }
}

const directive = function() {
  return {
    template,
    controller: ['$scope', controller]
  }
}

export default directive
