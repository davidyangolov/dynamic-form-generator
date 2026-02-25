const defaultFields = {
	text: {
		type: "text",
		name: "text",
		id: "text",
		placeholder: "Введите текст",
	},

	email: {
		type: "email",
		name: "email",
		id: "email",
		placeholder: "Введите email",
		required: true,
	},

	password: {
		type: "password",
		name: "password",
		id: "password",
		placeholder: "Введите пароль",
		required: true,
		min: 6,
	},

	checkbox: {
		type: "checkbox",
		name: "checkbox",
		id: "checkbox",
		placeholder: "Подтвердите выбор",
	},

	select: {
		type: "select",
		name: "select",
		id: "select",
		placeholder: "Выберите значение",
		options: [],
		required: true,
	},

	radio: {
		type: "radio",
		name: "radio",
		id: "radio",
		placeholder: "Выберите вариант",
		options: [],
		required: true,
	},

	number: {
		type: "text",
		name: "number",
		id: "number",
		placeholder: "Введите число",
		pattern: "^\\d+$",
	},
	radio: {
		type: "radio",
		required: true,
		options: [],
	},
};

export default defaultFields;
