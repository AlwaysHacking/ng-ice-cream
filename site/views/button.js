const template = `
  <i-button type="primary">Primary</i-button>
  <i-button type="default">Default</i-button>
  <i-button type="ghost">Ghost</i-button>
  <i-button type="dashed">Dashed</i-button>
  <i-button type="text">Text</i-button>
  <i-button type="info">Info</i-button>
  <i-button type="success">Success</i-button>
  <i-button type="warning">Warning</i-button>
  <i-button type="error">Error</i-button>
`

const directive = function() {
  return {
    template
  }
}

export default directive
