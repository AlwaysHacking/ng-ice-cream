import {deepCopy} from '../utils/assist'

const template = `
<div ng-class="wrapClasses()" ng-style="styles()">
  <div ng-class="classes()" style="overflow: auto !important">
      <div class="{{prefixCls + '-header'}}" style="overflow: initial !important">
          <i-table-head
              prefix-cls="{{prefixCls}}"
              columns="cloneColumns"></i-table-head>
      </div>
      <div class="{{prefixCls + '-body'}}" ng-style="bodyStyle()" style="overflow: initial !important">
          <i-table-body
              prefix-cls="{{prefixCls}}"
              columns="cloneColumns"
              data="rebuildData"></i-table-body>
      </div>
  </div>
</div>
`

const controller = function tableCtrl($scope) {
  const prefixCls = 'ivu-table'
  let columnKey = 1
  this.$onInit = () => {
    this.ready = true
    $scope.bodyHeight = 0
    $scope.prefixCls = prefixCls
    $scope.showHeader = this.showHeader || true
    this.columns = this.columns || []
    this.border = this.border || false
    this.stripe = this.stripe || false
    $scope.wrapClasses = () => {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-hide`]: !this.ready,
          [`${prefixCls}-with-header`]: this.showSlotHeader,
          [`${prefixCls}-with-footer`]: this.showSlotFooter
        }
      ]
    }

    $scope.styles = () => {
      let style = {}
      if (this.height) {
        const height = (this.isLeftFixed || this.isRightFixed) ? parseInt(this.height) + this.scrollBarWidth : parseInt(this.height)
        style.height = `${height}px`
      }
      if (this.width) style.width = `${this.width}px`
      return style
    }
    $scope.classes = () => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-border`]: this.border,
          [`${prefixCls}-stripe`]: this.stripe,
          [`${prefixCls}-with-fixed-top`]: !!this.height
        }
      ]
    }
    $scope.bodyStyle = () => {
      let style = {}
      if (this.bodyHeight !== 0) {
          // add a height to resolve scroll bug when browser has a scrollBar in fixed type and height prop
        const height = (this.isLeftFixed || this.isRightFixed) ? this.bodyHeight + this.scrollBarWidth : this.bodyHeight
        style.height = `${height}px`
      }
      return style
    }
    $scope.cloneColumns = this.makeColumns()
    $scope.rebuildData = this.makeData()
  }

  this.makeColumns = () => {
    let columns = deepCopy(this.columns)
    let left = []
    let right = []
    let center = []

    columns.forEach((column, index) => {
      column._index = index
      column._columnKey = columnKey++
      column._width = column.width ? column.width : ''    // update in handleResize()
      column._sortType = 'normal'
      column._filterVisible = false
      column._isFiltered = false
      column._filterChecked = []

      if ('filterMultiple' in column) {
        column._filterMultiple = column.filterMultiple
      } else {
        column._filterMultiple = true
      }
      if ('filteredValue' in column) {
        column._filterChecked = column.filteredValue
        column._isFiltered = true
      }

      if ('sortType' in column) {
        column._sortType = column.sortType
      }

      if (column.fixed && column.fixed === 'left') {
        left.push(column)
      } else if (column.fixed && column.fixed === 'right') {
        right.push(column)
      } else {
        center.push(column)
      }
    })
    return left.concat(center).concat(right)
  }

  this.$onChanges = (changesObj) => {
    $scope.rebuildData = this.makeData()
  }

  this.makeData = () => {
    return this.data
  }
}

export default {
  template: template,
  controller: ['$scope', controller],
  bindings: {
    height: '@?',
    width: '@?',
    columns: '<?',
    data: '<?',
    border: '<?',
    stripe: '<?'
  }
}
