import angular from 'angular'
import uiRouter from '@uirouter/angularjs'
import iceCream from '../src/components'

import '../src/styles/index.less'

import routes from './app.routes'

import buttonView from './views/button'
import buttonGroupView from './views/button-group'
import modalView from './views/modal'
import tabsView from './views/tabs'
import formView from './views/form'
import menuView from './views/menu'
import gridView from './views/grid'

angular.module('app', [uiRouter, iceCream])
  .config(routes)
  .directive('buttonView', buttonView)
  .directive('buttonGroupView', buttonGroupView)
  .directive('modalView', modalView)
  .directive('tabsView', tabsView)
  .directive('formView', formView)
  .directive('menuView', menuView)
  .directive('gridView', gridView)

