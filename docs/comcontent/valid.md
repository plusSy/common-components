
<div class="api-wrap mt-24">
    
   <el-table  :data="apiData" class="w-100 m-0">
      <el-table-column prop="describe" label="功能" width="190"></el-table-column>
      <el-table-column prop="name" label="name" width="140"></el-table-column>
      <el-table-column prop="valid" label="正则"></el-table-column>
    </el-table>
</div>

<script>
  new Vue({
    el: '#main',
    data:  {
      apiData: [
	{
	  describe: '证件号码验证',
	  name: 'IDCard',
	  valid: '/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g'
	},
	{
	  describe: '数字验证',
	  name: 'Number',
	  valid: '/^[0-9]*$/g'
	},
	{
	  describe: '6位数验证码验证',
	  name: 'VerificationCode',
	  valid: '/^\d{6}$/g'
	},
	{
	  describe: '手机号码验证',
	  name: 'MobilePhoneNumber',
	  valid: '/^1[3|5|7|8]\d{9}$/'
	},
	{
	  describe: '电话号码验证',
	  name: 'TelPhoneNumber',
	  valid: '/^0\d{2,3}-?\d{7,8}$/g'
	},
	{
	  describe: '邮箱地址输入验证',
	  name: 'Email',
	  valid: '/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/g'
	},
	{
	  describe: '统一社会信用代码验证',
	  name: 'CreditCode',
	  valid: '/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g'
	},
	{
	  describe: '6位数验证码验证',
	  name: 'Fax',
	  valid: '/^(\d{3,4}-)?\d{7,8}$/g'
	},
	{
	  describe: '网址地址验证',
	  name: 'Www',
	  valid: `/\\b(([\w-]+:\/\/?|www[.])[^\s()<>]+(?:[\w\d]+|([^[:punct:]\s]|\/)))/g`
	}
	]
    }
  })
</script>

---
 {docsify-updated} 


