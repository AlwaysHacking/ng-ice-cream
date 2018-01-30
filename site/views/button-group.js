const template = `
  <h4>Basic</h4>
  <br><br>
  <i-button-group>
    <i-button>Cancel</i-button>
    <i-button type="primary">Confirm</i-button>
  </i-button-group>
  <i-button-group>
    <i-button ng-disabled="true">Yesterday</i-button>
    <i-button type="primary">Today</i-button>
    <i-button type="primary">Tomorrow</i-button>
  </i-button-group>
  <i-button-group>
    <i-button>L</i-button>
    <i-button type="primary">M</i-button>
    <i-button type="ghost">M</i-button>
    <i-button type="dashed">R</i-button>
  </i-button-group>
  <br><br>
  <h4>i-icons</h4>
  <br><br>
  <i-button-group>
      <i-button type="primary">
          <i-icon type="chevron-left"></i-icon>
          Backward
      </i-button>
      <i-button type="primary">
          Forward
          <i-icon type="chevron-right"></i-icon>
      </i-button>
  </i-button-group>
  <i-button-group>
      <i-button type="primary" icon="ios-skipbackward"></i-button>
      <i-button type="primary" icon="ios-skipforward"></i-button>
  </i-button-group>
  <i-button-group>
      <i-button type="ghost" icon="ios-color-wand-outline"></i-button>
      <i-button type="ghost" icon="ios-sunny-outline"></i-button>
      <i-button type="ghost" icon="ios-crop"></i-button>
      <i-button type="ghost" icon="ios-color-filter-outline"></i-button>
  </i-button-group>
  <br><br>
  <h4>Circle</h4>
  <br><br>
  <i-button-group shape="circle">
      <i-button type="primary">
          <i-icon type="chevron-left"></i-icon>
          Backward
      </i-button>
      <i-button type="primary">
          Forward
          <i-icon type="chevron-right"></i-icon>
      </i-button>
  </i-button-group>
  <i-button-group shape="circle">
      <i-button type="primary" icon="ios-skipbackward"></i-button>
      <i-button type="primary" icon="ios-skipforward"></i-button>
  </i-button-group>
  <i-button-group shape="circle">
      <i-button type="ghost" icon="ios-color-wand-outline"></i-button>
      <i-button type="ghost" icon="ios-sunny-outline"></i-button>
      <i-button type="ghost" icon="ios-crop"></i-button>
      <i-button type="ghost" icon="ios-color-filter-outline"></i-button>
  </i-button-group>
  <br><br>
  <h4>Size</h4>
  <br><br>
  <i-button-group size="large">
      <i-button type="ghost">Large</i-button>
      <i-button type="ghost">Large</i-button>
  </i-button-group>
  <i-button-group>
      <i-button type="ghost">Default</i-button>
      <i-button type="ghost">Default</i-button>
  </i-button-group>
  <i-button-group size="small">
      <i-button type="ghost">Small</i-button>
      <i-button type="ghost">Small</i-button>
  </i-button-group>
  <br><br>
  <i-button-group size="large" shape="circle">
      <i-button type="ghost">Large</i-button>
      <i-button type="ghost">Large</i-button>
  </i-button-group>
  <i-button-group shape="circle">
      <i-button type="ghost">Default</i-button>
      <i-button type="ghost">Default</i-button>
  </i-button-group>
  <i-button-group size="small" shape="circle">
      <i-button type="ghost">Small</i-button>
      <i-button type="ghost">Small</i-button>
  </i-button-group>
`

const directive = function() {
  return {
    template
  }
}

export default directive
