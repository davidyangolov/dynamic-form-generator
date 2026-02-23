<template>
	<div
		class="custom-search"
		:class="{ 'has-error': error }"
	>
		<input
			type="search"
			:value="modelValue"
			:placeholder="placeholder"
			v-bind="$attrs"
			:class="{ error: error }"
			@input="$emit('update:modelValue', $event.target.value)"
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
		name: "CustomSearch",
		inheritAttrs: false,
		props: {
			modelValue: {
				type: String,
				default: "",
			},
			placeholder: {
				type: String,
				default: "Поиск...",
			},
			error: {
				type: String,
				default: "",
			},
		},
	};
</script>
<style scoped>
	.custom-search {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	input[type="search"] {
		width: 100%;
		padding: var(--space-sm) var(--space-md);
		font-size: var(--font-size-input);
		color: var(--color-palette-primary-lighter);
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius-md);
		box-sizing: border-box;
		background-color: transparent;
		transition: border-color 0.3s, box-shadow 0.3s;
	}

	input[type="search"]::placeholder {
		color: var(--color-palette-neutral-400);
	}

	input[type="search"]:hover {
		border-color: var(--color-palette-accent-base);
	}

	input[type="search"]:focus {
		border-color: var(--color-interactive-primary);
		box-shadow: 0 0 1px 2px var(--color-palette-primary-lighter);
		outline: none;
	}

	input[type="search"].error {
		border-color: var(--color-palette-error);
	}

	input[type="search"].error:focus {
		border-color: var(--color-palette-error);
		box-shadow: 0 0 1px 3px rgba(220, 53, 69, 0.25);
	}

	.error-text {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--color-palette-error);
	}
</style>
