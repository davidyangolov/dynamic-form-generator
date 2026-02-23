const rules = {
	required: (val) =>
		(val !== undefined && val !== null && val !== "") ||
		"Обязательно для заполнения",
	min: (val, min) =>
		(typeof val === "string" ? val.length >= min : val >= min) ||
		`Минимум: ${min}`,
	max: (val, max) =>
		(typeof val === "string" ? val.length <= max : val <= max) ||
		`Максимум: ${max}`,
	pattern: (val, re) => new RegExp(re).test(val) || "Неверный формат",
	options: (val, list) => {
		// Если list это массив объектов { label, value }, извлечь values
		if (
			Array.isArray(list) &&
			list.length > 0 &&
			typeof list[0] === "object"
		) {
			const values = list.map((item) => item.value);
			return values.includes(val) || "Выберите значение из списка";
		}
		// Иначе list это просто массив значений
		return list.includes(val) || "Выберите значение из списка";
	},
	compare: (val, targetName, formData) =>
		val === formData[targetName] || "Значения не совпадают",
};

const validateService = {
	validateField(field, value, formData) {
		// Для чекбокса: если обязательный, должен быть true
		if (field.type === "checkbox" && field.required && value !== true) {
			return "Галочка должна быть установлена";
		}

		// Для select: если обязательный, используем специальное сообщение
		if (field.type === "select" && field.required && !value) {
			return "Выберите значение из списка";
		}

		// Для остального: пропускаем валидацию если не обязательный и пусто
		if (!field.required && !value) return null;

		for (const key in field) {
			if (rules[key]) {
				// Передать field.options для проверки options
				const ruleValue = key === "options" ? field.options : field[key];
				const result = rules[key](value, ruleValue, formData);
				if (result !== true) {
					return result;
				}
			}
		}
		return null;
	},

	validateForm(fields, formData) {
		const errors = {};
		fields.forEach((field) => {
			if (field.type !== "button") {
				const error = this.validateField(
					field,
					formData[field.name],
					formData
				);
				if (error) {
					errors[field.name] = error;
				}
			}
		});
		return errors;
	},
};

export default validateService;
