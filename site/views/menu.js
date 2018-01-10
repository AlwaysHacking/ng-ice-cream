const template = `
<!-- <i-menu style="margin-bottom:50px;" mode="horizontal">
  <i-menu-item key="lebron">勒布朗</i-menu-item>
  <i-menu-item key="wade">韦德</i-menu-item>
  <i-menu-item key="love">乐福</i-menu-item>
  <i-submenu key="bench" name="板凳席">
    <i-menu-group name="教练">
      <i-menu-item key="lu">泰伦卢</i-menu-item>
    </i-menu-group>
    <i-menu-group name="替补">
      <i-menu-item key="tomas">托马斯</i-menu-item>
      <i-menu-item key="korver">科沃尔</i-menu-item>
    </i-menu-group>
  </i-submenu>
  <i-submenu key="sick" name="伤病">
    <i-menu-item key="rose">罗斯</i-menu-item>
  </i-submenu>
</i-menu> -->
<i-menu on-select="select(key)">
  <i-menu-item key="lebron">勒布朗</i-menu-item>
  <i-menu-item key="wade">韦德</i-menu-item>
  <i-menu-item key="love">乐福</i-menu-item>
  <i-submenu key="bench" name="板凳席">
    <i-menu-group name="教练">
      <i-menu-item key="lu">泰伦卢</i-menu-item>
    </i-menu-group>
    <i-menu-group name="替补">
      <i-menu-item key="tomas">托马斯</i-menu-item>
      <i-menu-item key="korver">科沃尔</i-menu-item>
    </i-menu-group>
  </i-submenu>
  <i-submenu key="sick" name="伤病">
    <i-menu-item key="rose">罗斯</i-menu-item>
  </i-submenu>
</i-menu>

You select：{{key}}
`

const link = function(scope) {
  scope.select = (key) => {
    scope.key = key
  }
}

const directive = function() {
  return {
    template,
    link
  }
}

export default directive
