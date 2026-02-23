<template>
	<div
		class="custom-textarea"
		:class="{ 'has-error': error }"
	>
		<label
			v-if="label"
			:for="id"
		>
			{{ label }}
		</label>

		<textarea
			:id="id"
			:value="modelValue"
			v-bind="$attrs"
			@input="$emit('update:modelValue', $event.target.value)"
			:class="{ error: error }"
		></textarea>

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
		name: "CustomTextArea",
		inheritAttrs: false,
		props: {
			modelValue: {
				type: String,
				default: "",
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
	};
</script>
<style scoped>
	.custom-textarea {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	label {
		font-size: var(--font-size-sm);
		color: var(--color-text-primary);
	}

	textarea {
		width: 100%;
		min-height: 100px;
		padding: var(--space-sm) var(--space-md);
		font-size: var(--font-size-input);
		color: var(--color-palette-primary-lighter);
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius-md);
		resize: vertical;
		box-sizing: border-box;
		transition: border-color 0.3s, box-shadow 0.3s;
		background-color: transparent;
	}

	textarea:hover {
		border-color: var(--color-palette-accent-base);
	}

	textarea:focus {
		border-color: var(--color-interactive-primary);
		box-shadow: 0 0 1px 2px var(--color-palette-primary-lighter);
		outline: none;
	}

	textarea.error {
		border-color: var(--color-palette-error);
	}

	textarea.error:focus {
		border-color: var(--color-palette-error);
		box-shadow: 0 0 1px 3px rgba(220, 53, 69, 0.25);
	}

	.error-text {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-palette-error);
	}
</style>
