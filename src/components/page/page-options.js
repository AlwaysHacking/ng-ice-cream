const template = `
  <div ng-if="showSizer || showElevator" ng-class="optsClasses()">
    <div ng-if="showSizer" ng-class="sizerClasses">
        <i-select v-model="currentPageSize" :size="size" :placement="placement" @on-change="changeSize">
            <i-option v-for="item in pageSizeOpts" :key="item" :value="item" style="text-align:center;">{{ item }} {{ t('i.page.page') }}</i-option>
        </i-select>
    </div>
    <div ng-if="showElevator" ng-class="ElevatorClasses()">
        跳至
        <input type="text" ng-value="current" ng-keyup="changePage($event)">
        页
    </div>
  </div>
`

const controller = function optionsCtrl($scope) {
  const prefixCls = 'ivu-page'
  const ctrl = this
  function isValueNumber (value) {
    return (/^[1-9][0-9]*$/).test(value + '')
  }

  this.$onInit = () => {
    $scope.showElevator = this.showElevator

    $scope.ElevatorClasses = () => {
      return [
        `${prefixCls}-options-elevator`
      ]
    }
    $scope.changePage = (event) => {
      const key = event.keyCode
      if (key !== 13) {
        return false
      }
      let val = event.target.value.trim()
      let page = 0

      if (isValueNumber(val)) {
        val = Number(val)
        if (val !== this.current) {
          const allPages = this.allPages

          if (val > allPages) {
            page = allPages
          } else {
            page = val
          }
        }
      } else {
        page = 1
      }

      if (page) {
        ctrl.onPage({page: page})
        event.target.value = page
      }
    }
    $scope.optsClasses = () => {
      return [
        `${prefixCls}-options`
      ]
    }
  }
  this.$onChanges = (changesObj) => {
    $scope.current = this.current
  }
}

export default {
  template: template,
  controller: ['$scope', controller],
  bindings: {
    showElevator: '<',
    onPage: '&',
    current: '<',
    allPages: '<'
  }
}
