<template>
	<button
		class="custom-button"
		:disabled="disabled"
		@click.stop.prevent="$emit('submit')"
	>
		<slot>Отправить</slot>
	</button>
</template>

<script>
	export default {
		name: "CustomSubmitButton",
		props: {
			disabled: {
				type: Boolean,
				default: false,
			},
		},
	};
</script>

<style scoped>
	.custom-button {
		width: 100%;
		padding: var(--space-md) var(--space-lg);
		font-size: var(--font-size-md);
		border: none;
		border-radius: var(--border-radius-md);
		background-color: var(--color-interactive-primary);
		color: var(--color-text-on-primary);
		cursor: pointer;
		transition: background-color 0.3s, color 0.3s;
		margin: var(--space-sm) 0;
		margin-top: var(--space-lg);
	}

	.custom-button:hover {
		background-color: var(--color-interactive-primary-hover);
		color: var(--color-text-on-primary);
	}

	.custom-button:active {
		background-color: var(--color-interactive-accent);
		color: var(--color-text-on-primary);
		box-shadow: var(--shadow-sm) inset;
	}

	.custom-button:disabled {
		background-color: var(--color-palette-neutral-100);
		cursor: not-allowed;
		color: var(--color-palette-neutral-700);
	}

	.custom-button:disabled:hover {
		color: var(--color-palette-neutral-700);
	}
</style>
