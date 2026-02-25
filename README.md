# dynamic-form-generator
Dynamic form generator to integrate with Vue Web Apps

To use this Dynamic Form Generator you need to integrate with Vue Web App in main.js for example as Global Component

Then you can use whatever you want by writing this code for example:


```javascript
<FormGenerator 
:fields="fields"
:actions="actions"
>
<script>
	actions: {},
				fields: [
					{
						name: "login",
						type: "text",
						label: "Email",
						placeholder: "Введите ваш email",
					},
					{
						name: "password",
						type: "password",
						label: "Пароль",
					},
					{
						name: "rememberMe",
						type: "checkbox",
						label: "Запомнить меня",
						modelValue: false,
					},
					{
						name: "submit",
						type: "button",
						label: "Отправить",
						method: "submit",
					},
				],

    created() {
      // Now context "this" are ready and you can bind methods to FormGenerator
			this.actions = {
				submit: this.submit,
				reset: this.reset,
			};
		},
  
		methods: {
			async submit(data) {
				const formData = JSON.parse(JSON.stringify(data));
        // login user here
			},
			reset() {
				this.result = null;
			},
		},

``` 
NOTE

If you dont have to change label or placeholder you could write like this
```javascript
fields: ["email", "password", ...]
```
and fields will be taken from file form.array.js as Default values

