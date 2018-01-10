import angular from 'angular'

const template = `
<i-form id="form1" model="form" rules="rules" label-width="80">
  <i-form-item label="用户名" prop="name">
    <i-input ng-model="form.name" placeholder="请输入用户名" ng-model-options="{updateOn: 'blur'}"></i-input>
  </i-form-item>
  <i-form-item label="邮箱" prop="email">
    <i-input ng-model="form.email" placeholder="请输入邮箱" ng-model-options="{updateOn: 'blur'}"></i-input>
  </i-form-item>
</i-form>
<i-button type="primary" ng-click="submit()">提交</i-button>
<i-button type="ghost" ng-click="reset()">重置</i-button>
`

const controller = function(scope) {
  this.$onInit = () => {
    scope.form = {
      name: '',
      email: ''
    }
    scope.rules = {
      name: [
          { required: true, message: '用户名不能为空' }
      ],
      email: [
        { required: true, message: '邮箱不能为空' },
        { type: 'email', message: '邮箱格式不正确' }
      ]
    }
    // submit event
    scope.submit = () => {
      // jqLite is limited to lookups by tag name
      // alternative method: angular.element(document.querySelectorAll('i-form#form1')).isolateScope()
      angular.element(document.querySelectorAll('i-form#form1')).isolateScope().validate((valid) => {
        if (valid) {
          console.log('验证成功')
        }
      })
    }
    // reset event
    scope.reset = () => {
      angular.element(document.querySelectorAll('i-form#form1')).isolateScope().resetFields()
    }
  }
}

const directive = function() {
  return {
    template,
    controller: ['$scope', controller]
  }
}

export default directive
