export default function() {
  return {
    add: function(el, doneFn) {
      console.log('add')
      el.addClass('collapse-transition')
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom

      el.style.height = '0'
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
  }
}
