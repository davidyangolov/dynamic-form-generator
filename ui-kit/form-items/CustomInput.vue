<template>
	<div
		class="custom-input"
		:class="{ 'has-error': error }"
	>
		<label
			v-if="label"
			:for="id"
		>
			{{ label }}
		</label>

		<input
			:id="id"
			:type="type"
			:value="modelValue"
			v-bind="$attrs"
			@input="onInput"
			:class="{ error: error }"
		/>

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
		name: "CustomInput",
		inheritAttrs: false,

		props: {
			modelValue: {
				type: [String, Number],
				default: "",
			},
			type: {
				type: String,
				default: "text",
			},
			id: {
				type: String,
				required: true,
			},
			label: {
				type: String,
				default: "",
			},
			error: {
				type: String,
				default: "",
			},
		},

		methods: {
			onInput(e) {
				this.$emit("update:modelValue", e.target.value);
			},
		},
	};
</script>

<style scoped>
	.custom-input {
		width: 100%;
		position: relative;
	}

	label {
		font-size: var(--font-size-sm);
		color: var(--color-text-primary);
		margin-bottom: var(--space-xs);
		display: block;
	}

	input {
		width: 100%;
		padding: var(--space-sm) var(--space-md);
		font-size: var(--font-size-input);
		color: var(--color-palette-primary-lighter);
		background-color: transparent;
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius-md);
		transition: border-color 0.3s, box-shadow 0.3s;
	}

	input::placeholder {
		color: var(--color-palette-neutral-400);
		font-size: var(--font-size-placeholder);
	}

	input:hover {
		border-color: var(--color-palette-accent-base);
	}

	input:focus {
		border-color: var(--color-interactive-primary);
		box-shadow: 0 0 1px 2px var(--color-palette-primary-lighter);
		outline: none;
	}

	input.error {
		border-color: var(--color-palette-error);
	}

	input.error:focus {
		border-color: var(--color-palette-error);
		box-shadow: 0 0 1px 3px rgba(var(--color-palette-error), 0.25);
	}

	.error-text {
		margin: 0;
		margin-top: var(--space-xs);
		font-size: var(--font-size-sm);
		color: var(--color-palette-error);
	}
</style>
