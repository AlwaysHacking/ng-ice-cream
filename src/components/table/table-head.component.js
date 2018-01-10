const template = `
  <table cellspacing="0" cellpadding="0" border="0" set-width>
    <thead>
        <tr>
            <th ng-repeat="column in columns track by $index" ng-class="alignCls(column)">
                <div ng-class="cellClasses(column)">
                  <span>{{ column.title || '#' }}</span>
                </div>
            </th>
        </tr>
    </thead>
  </table>
`

const controller = function tableHeadCtrl($scope) {
  this.$onInit = () => {
    $scope.columns = this.columns
    $scope.prefixCls = this.prefixCls
    $scope.alignCls = (column, row = {}) => {
      let cellClassName = ''
      if (row.cellClassName && column.key && row.cellClassName[column.key]) {
        cellClassName = row.cellClassName[column.key]
      }
      return [
        {
          [`${cellClassName}`]: cellClassName,    // cell className
          [`${column.className}`]: column.className,    // column className
          [`${this.prefixCls}-column-${column.align}`]: column.align,
          [`${this.prefixCls}-hidden`]: (this.fixed === 'left' && column.fixed !== 'left') || (this.fixed === 'right' && column.fixed !== 'right') || (!this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'))
        }
      ]
    }
    $scope.cellClasses = (column) => {
      return [
        `${this.prefixCls}-cell`,
        {
          [`${this.prefixCls}-hidden`]: !this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right')
        }
      ]
    }
  }
}

export default {
  template: template,
  controller: ['$scope', controller],
  bindings: {
    columns: '<?',
    prefixCls: '@',
    styleObject: '<?'
  }
}
