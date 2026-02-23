<template>
	<label
		class="custom-radio"
		:class="{ 'has-error': error }"
	>
		<input
			type="radio"
			:value="value"
			:checked="modelValue === value"
			:class="{ error: error }"
			@change="$emit('update:modelValue', value)"
			v-bind="$attrs"
		/>
		<span class="radio-icon"></span>
		<slot>{{ label }}</slot>
	</label>
</template>

<script>
	export default {
		name: "CustomRadio",
		inheritAttrs: false,
		props: {
			value: {
				type: [String, Number],
				required: true,
			},
			modelValue: {
				type: [String, Number],
			},
			error: {
				type: String,
				default: "",
			},
		},
	};
</script>

<style scoped>
	.custom-radio {
		display: flex;
		align-items: center;
		cursor: pointer;
		user-select: none;
		gap: var(--space-sm);
	}

	.custom-radio input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		pointer-events: none;
	}

	.radio-icon {
		width: 18px;
		height: 18px;
		border: 2px solid var(--color-palette-accent-base);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.custom-radio input:checked + .radio-icon::after {
		content: "";
		width: 8px;
		height: 8px;
		background: var(--color-palette-accent-base);
		border-radius: 50%;
	}

	.custom-radio input.error + .radio-icon {
		border-color: var(--color-palette-error);
	}

	.custom-radio input:focus-visible + .radio-icon {
		box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
	}

	.custom-radio input.error:focus-visible + .radio-icon {
		border-color: var(--color-palette-error);
		box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25);
	}
</style>
