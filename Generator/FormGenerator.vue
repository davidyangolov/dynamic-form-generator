<template>
	<div class="form-body">
		<header
			v-if="$slots.header"
			class="form-header"
		>
			<slot name="header" />
		</header>
		<form @submit.prevent="submit">
			<div
				v-for="field in finalFields"
				:key="field.name"
				class="form-group"
			>
				<component
					v-if="field.type === 'button'"
					:is="resolveComponent(field.component)"
					v-bind="field"
					@action="handleAction"
				>
					{{ field.label }}
				</component>

				<component
					v-else
					:is="resolveComponent(field.component)"
					v-bind="{ ...field, error: errors[field.name] || '' }"
					v-model="formData[field.name]"
				>
					{{ field.label }}
				</component>
			</div>
		</form>
	</div>
</template>

<script>
	import validateService from "./validate.form.js";
	import defaultFields from "./forms.array.js";
	import { uiKit } from "@/helpers/Generator/ui-kit.js";

	export default {
		props: {
			fields: { type: Array, required: true },
			actions: { type: Object, default: () => ({}) },
		},
		data() {
			return {
				formData: this.initialization(),
				errors: {},
			};
		},
		computed: {
			finalFields() {
				let tabIndex = 1;
				return this.fields.map((field) => {
					const builtField = this.buildField(field);
					if (builtField.type !== "button" && !builtField.tabindex) {
						builtField.tabindex = tabIndex++;
					}
					return builtField;
				});
			},
		},
		methods: {
			buildField(item) {
				const isStr = typeof item === "string";
				const name = isStr ? item : item.name;
				const base = defaultFields[name] || {};
				const config = isStr ? {} : item;

				return {
					...base,
					...config,
					name,
					id: config.id || name,
					type: config.type || base.type,
					component: config.component || config.type || base.type,
				};
			},

			initialization() {
				return this.fields.reduce((acc, item) => {
					const field = this.buildField(item);
					if (field.type !== "button") {
						// Используем modelValue если он есть, иначе дефолтное значение
						if (field.hasOwnProperty("modelValue")) {
							acc[field.name] = field.modelValue;
						} else if (field.type === "checkbox") {
							acc[field.name] = false;
						} else {
							acc[field.name] = "";
						}
					}
					return acc;
				}, {});
			},

			resolveComponent(type) {
				return uiKit[type] || uiKit.text;
			},

			handleAction(methodName) {
				if (methodName === "submit") return this.submit();
				if (methodName === "reset") return this.reset();

				const action = this.actions?.[methodName];
				if (typeof action === "function") {
					return action(this.formData);
				}

				this.$emit(methodName, this.formData);
			},

			async submit() {
				this.errors = validateService.validateForm(
					this.finalFields,
					this.formData
				);

				if (Object.keys(this.errors).length > 0) {
					this.$emit("invalid", this.errors);
					return;
				}

				const submitAction = this.actions?.submit;
				if (typeof submitAction === "function") {
					submitAction(this.formData);
				}
			},

			reset() {
				// Очищаем каждое поле полностью (пустые значения)
				this.finalFields.forEach((field) => {
					if (field.type !== "button") {
						if (field.type === "checkbox") {
							this.formData[field.name] = false;
						} else {
							this.formData[field.name] = "";
						}
					}
				});

				this.errors = {};

				const resetAction = this.actions?.reset;
				if (typeof resetAction === "function") {
					resetAction(this.formData);
				}

				this.$emit("reset", this.formData);
			},
		},
	};
</script>
<style>
	.form-body {
		width: 500px;
		padding: var(--space-md);
		border-radius: var(--border-radius-md);
		display: flex;
		flex-direction: column;
	}
	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		gap: var(--space-md);
	}

	.form-group {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.error-label {
		color: var(--color-danger, #dc3545);
		font-size: var(--font-size-sm);
		margin-top: var(--space-xs);
		transition: opacity 0.3s ease-in-out;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.fade-enter-to,
	.fade-leave-from {
		opacity: 1;
	}

	/* Кнопка submit всегда снизу, центр */
	.custom-submit-button {
		align-self: flex-start;
		margin-top: var(--space-md);
	}
	.form-header {
		margin-bottom: var(--space-lg);
		text-align: center;
	}
</style>
