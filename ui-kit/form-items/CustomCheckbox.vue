<template>
	<div
		class="custom-checkbox"
		:class="{ 'has-error': error }"
	>
		<input
			type="checkbox"
			:id="id"
			v-bind="$attrs"
			:checked="modelValue"
			:class="{ error: error }"
			@change="$emit('update:modelValue', $event.target.checked)"
		/>

		<label :for="id">
			<span class="checkbox-icon"></span>
			<slot>{{ label }}</slot>
		</label>

		<p
			v-if="error"
			class="error-text"
		>
			{{ error }}
		</p>
	</div>
</template>

<script>
	export default {
		name: "CustomCheckbox",
		inheritAttrs: false,
		props: {
			modelValue: {
				type: Boolean,
				default: false,
			},
			id: {
				type: String,
				required: true,
			},
			label: String,
			error: {
				type: String,
				default: "",
			},
		},
		computed: {
			proxy: {
				get() {
					return this.modelValue;
				},
				set(val) {
					this.$emit("update:modelValue", val);
				},
			},
		},
	};
</script>

<style scoped>
	.custom-checkbox {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.custom-checkbox input[type="checkbox"] {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		pointer-events: none;
	}

	.custom-checkbox label {
		font-size: var(--font-size-input);
		display: flex;
		align-items: center;
		cursor: pointer;
		user-select: none;
	}

	.custom-checkbox .checkbox-icon {
		width: 18px;
		height: 18px;
		border: 2px solid var(--color-palette-accent-base);
		border-radius: var(--border-radius-md);
		margin-right: var(--space-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease-in-out;
	}

	.custom-checkbox input[type="checkbox"]:checked + label .checkbox-icon {
		background-color: var(--color-palette-accent-base);
	}

	.custom-checkbox
		input[type="checkbox"]:focus-visible
		+ label
		.checkbox-icon {
		box-shadow: 0 0 0 3px
			rgba(var(--color-palette-accent-base-rgb, 0, 123, 255), 0.25);
		border-color: var(--color-palette-accent-base);
	}

	.custom-checkbox
		input[type="checkbox"]:checked
		+ label
		.checkbox-icon::before {
		content: "✓";
		color: var(--color-palette-neutral-0);
		font-size: 0.8rem;
		line-height: 1;
	}

	.custom-checkbox input[type="checkbox"].error + label .checkbox-icon {
		border-color: var(--color-palette-error);
	}

	.custom-checkbox
		input[type="checkbox"].error:focus-visible
		+ label
		.checkbox-icon {
		border-color: var(--color-palette-error);
		box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25);
	}

	.error-text {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-palette-error);
	}
</style>
