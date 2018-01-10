const template = `
<table cellspacing="0" cellpadding="0" border="0" set-width>
  <tbody class="{{prefixCls + '-tbody'}}">
    <tr class="{{prefixCls + '-row'}}" ng-repeat="row in data track by $index">
      <td ng-repeat="key in keys"><div class="{{prefixCls + '-cell'}}""><span>{{row[key]}}</span></div></td>
    </tr>
  </tbody>
</table>
`

const controller = function tableHeadCtrl($scope) {
  this.$onInit = () => {
    $scope.prefixCls = this.prefixCls
    $scope.data = this.data
    $scope.keys = this.getKeys()
  }

  this.getKeys = () => {
    const keys = []
    this.columns.forEach(e => keys.push(e.key))
    return keys
  }
  this.$onChanges = (changesObj) => {
    $scope.data = this.data
  }
}

export default {
  template: template,
  controller: ['$scope', controller],
  bindings: {
    columns: '<?',
    prefixCls: '@',
    data: '<?'
  }
}
