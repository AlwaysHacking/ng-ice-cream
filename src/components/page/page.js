const template = `
  <ul ng-class="simpleWrapClasses()" ng-style="styles" ng-if="simple">
    <li
        title="上一页"
        ng-class="prevClasses()"
        ng-click="prev()">
        <a><i class="ivu-icon ivu-icon-ios-arrow-left"></i></a>
    </li>
    <div ng-class="simplePagerClasses()" title="{{currentPage + '/' + allPages}}">
      <input
          type="text"
          ng-model="$ctrl.currentPage"
          ng-keydown="keyDown($event)"
          ng-keyup="keyUp($event)"
          >
      <span>/</span>
      {{ $ctrl.allPages }}
    </div>
    <li
        title="下一页"
        ng-class="nextClasses()"
        ng-click="next()">
        <a><i class="ivu-icon ivu-icon-ios-arrow-right"></i></a>
    </li>
  </ul>
  <ul ng-class="wrapClasses()" ng-style="styles" ng-if="!simple">
    <span class="ivu-page-total" ng-if="showTotal">共 {{ $ctrl.total }} 条</span>
    <li
        title="上一页"
        ng-class="prevClasses()"
        ng-click="prev()">
        <a><i class="ivu-icon ivu-icon-ios-arrow-left"></i></a>
    </li>
    <li title="1" ng-class="firstPageClasses()" ng-click="changePage(1)"><a>1</a></li>
    <li title="向前5页" ng-if="$ctrl.currentPage - 3 > 1" class="ivu-page-item-jump-prev" ng-click="fastPrev()"><a><i class="ivu-icon ivu-icon-ios-arrow-left"></i></a></li>
    <li title="{{$ctrl.currentPage - 2}}" ng-if="$ctrl.currentPage - 2 > 1" class="ivu-page-item" ng-click="changePage($ctrl.currentPage - 2)"><a>{{ $ctrl.currentPage - 2 }}</a></li>
    <li title="{{$ctrl.currentPage - 1}}" ng-if="$ctrl.currentPage - 1 > 1" class="ivu-page-item" ng-click="changePage($ctrl.currentPage - 1)"><a>{{ $ctrl.currentPage - 1 }}</a></li>
    <li title="{{$ctrl.currentPage}}" ng-if="$ctrl.currentPage != 1 && $ctrl.currentPage != $ctrl.allPages" class="ivu-page-item ivu-page-item-active"><a>{{ $ctrl.currentPage }}</a></li>
    <li title="{{$ctrl.currentPage + 1}}" ng-if="$ctrl.currentPage + 1 < $ctrl.allPages" class="ivu-page-item" ng-click="changePage($ctrl.currentPage + 1)"><a>{{ $ctrl.currentPage + 1 }}</a></li>
    <li title="{{$ctrl.currentPage + 2}}" ng-if="$ctrl.currentPage + 2 < $ctrl.allPages" class="ivu-page-item" ng-click="changePage($ctrl.currentPage + 2)"><a>{{ $ctrl.currentPage + 2 }}</a></li>
    <li title="向后5页" ng-if="$ctrl.currentPage + 3 < $ctrl.allPages" class="ivu-page-item-jump-next" ng-click="fastNext()"><a><i class="ivu-icon ivu-icon-ios-arrow-right"></i></a></li>
    <li title="{{$ctrl.allPages}}" ng-if="$ctrl.allPages > 1" ng-class="lastPageClasses()" ng-click="changePage($ctrl.allPages)"><a>{{ $ctrl.allPages }}</a></li>
    <li
        title="下一页"
        ng-class="nextClasses()"
        ng-click="next()">
        <a><i class="ivu-icon ivu-icon-ios-arrow-right"></i></a>
    </li>
    <i-page-options
        :show-sizer="showSizer"
        :page-size="currentPageSize"
        :page-size-opts="pageSizeOpts"
        :placement="placement"
        show-elevator="showElevator"
        current="$ctrl.currentPage"
        all-pages="$ctrl.allPages"
        :is-small="isSmall"
        @on-size="onSize"
        on-page="$ctrl.onPage(page)">
    </i-page-options>
  </ul>
`

const controller = function pageCtrl($scope) {
  const prefixCls = 'ivu-page'

  this.$onInit = () => {
    this.currentPage = this.current || 1
    this.currentPageSize = this.pageSize || 10
    this.total = this.total || 0
    $scope.prefixCls = prefixCls
    $scope.showTotal = this.showTotal
    $scope.simple = this.simple
    $scope.showElevator = this.showElevator
    $scope.prev = this.prev
    $scope.next = this.next
    $scope.changePage = this.changePage
    $scope.fastPrev = this.fastPrev
    $scope.fastNext = this.fastNext
    this.getAllPages = () => {
      const allPage = Math.ceil(this.total / this.currentPageSize)
      return (allPage === 0) ? 1 : allPage
    }
    this.$onChanges = () => {
      this.allPages = this.getAllPages()
    }
    $scope.simpleWrapClasses = () => {
      return [
        `${prefixCls}`,
        `${prefixCls}-simple`,
        {
          [`${this.className}`]: !!this.className
        }
      ]
    }
    $scope.simplePagerClasses = () => {
      return `${prefixCls}-simple-pager`
    }
    $scope.prevClasses = () => {
      return [
        `${prefixCls}-prev`,
        {
          [`${prefixCls}-disabled`]: this.currentPage === 1
        }
      ]
    }
    $scope.nextClasses = () => {
      return [
        `${prefixCls}-next`,
        {
          [`${prefixCls}-disabled`]: this.currentPage === this.allPages
        }
      ]
    }
    $scope.wrapClasses = () => {
      return [
        `${prefixCls}`,
        {
          [`${this.className}`]: !!this.className,
          'mini': !!this.size
        }
      ]
    }
    $scope.firstPageClasses = () => {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.currentPage === 1
        }
      ]
    }
    $scope.lastPageClasses = () => {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.currentPage === this.allPages
        }
      ]
    }
    $scope.keyDown = (e) => {
      const key = e.keyCode
      const condition = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key === 8 || key === 37 || key === 39

      if (!condition) {
        e.preventDefault()
      }
    }
    $scope.keyUp = (e) => {
      const key = e.keyCode
      const val = parseInt(e.target.value)
      if (key === 38) {
        this.prev()
      } else if (key === 40) {
        this.next()
      } else if (key === 13) {
        let page = 1

        if (val > this.allPages) {
          page = this.allPages
        } else if (val <= 0) {
          page = 1
        } else {
          page = val
        }

        e.target.value = page
        this.changePage(page)
      }
    }
  }

  this.prev = () => {
    const current = this.currentPage
    if (current <= 1) {
      return false
    }
    this.changePage(current - 1)
  }

  this.next = () => {
    const current = this.currentPage
    if (current >= this.allPages) {
      return false
    }
    this.changePage(current + 1)
  }

  this.changePage = (page) => {
    if (this.currentPage !== page) {
      this.currentPage = page
      this.onChange({page: page})
    }
  }
  this.fastPrev = () => {
    const page = this.currentPage - 5
    if (page > 0) {
      this.changePage(page)
    } else {
      this.changePage(1)
    }
  }
  this.fastNext = () => {
    const page = this.currentPage + 5
    if (page > this.allPages) {
      this.changePage(this.allPages)
    } else {
      this.changePage(page)
    }
  }
  this.onPage = (page) => {
    this.changePage(page)
  }
}

export default {
  template: template,
  controller: ['$scope', controller],
  bindings: {
    current: '<',
    total: '<',
    simple: '<',
    className: '@',
    showTotal: '<',
    size: '@',
    showElevator: '<',
    onChange: '&'
  }
}
