const template = `
<style>
  i-row i-col div {
    background: pink;
  }
</style>
<i-row gutter="64">
  <i-col span="6">
    <div>col-6</div>
  </i-col>
  <i-col span="6">
    <div>col-6</div>
  </i-col>
  <i-col span="6">
    <div>col-6</div>
  </i-col>
  <i-col span="6">
    <div>col-6</div>
  </i-col>
</i-row>
`

const directive = function() {
  return {
    template
  }
}

export default directive
