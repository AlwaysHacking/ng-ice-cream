import angular from 'angular'
// import ngAnimate from 'angular-animate'

import iIcon from './icon'
import {iButton, iButtonGroup} from './button'
import iInput from './input'
import iInputNumber from './input-number'
import {iPage, iPageOptions} from './page'
import {iSelect} from './select'
import {iTable, iTableHead, iTableBody} from './table'
import iCard from './card'
import iSpin from './spin'
import {iRow, iCol} from './grid'
import {iMenu, iMenuItem, iSubmenu, iMenuGroup} from './menu'
import drop from './select/dropdown'
import {iTabPane, iTabs, getTabWidth} from './tabs'
// import collapseTransition from './base/collapse-transition'
import {iForm, iFormItem} from './form'
import iModal from './modal'

export default angular.module('iceCream', [])
  .directive('iIcon', iIcon)
  .directive('iButton', iButton)
  .directive('iButtonGroup', iButtonGroup)
  .component('iInput', iInput)
  .component('iInputNumber', iInputNumber)
  .component('iCard', iCard)
  .component('iPage', iPage)
  .component('iPageOptions', iPageOptions)
  .component('iSelect', iSelect)
  .component('iTable', iTable)
  .component('iTableHead', iTableHead)
  .component('iTableBody', iTableBody)
  .component('iSpin', iSpin)
  .directive('iMenu', iMenu)
  .directive('iMenuItem', iMenuItem)
  .directive('iSubmenu', iSubmenu)
  .directive('iMenuGroup', iMenuGroup)
  .directive('iTabPane', iTabPane)
  .directive('iTabs', iTabs)
  .directive('getTabWidth', getTabWidth)
  .directive('setWidth', ['$timeout', function($timeout) {
    return {
      link: (scope, element, attrs) => {
        $timeout(function() {
          const width = element.closest('.ivu-table-wrapper').width()
          element.width(width)
        })
      }
    }
  }])
  .directive('iRow', iRow)
  .directive('iCol', iCol)
  .directive('drop', drop)
  .directive('iForm', iForm)
  .directive('iFormItem', iFormItem)
  .directive('iModal', iModal)
  // .animation('.ngcollapse', collapseTransition)
  .name
