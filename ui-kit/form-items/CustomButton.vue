<template>
	<button
		type="button"
		class="custom-button"
		@click="handleClick"
	>
		<slot>{{ label }}</slot>
	</button>
</template>

<script>
	export default {
		props: {
			label: String,
			method: { type: String, default: "submit" },
			type: String,
		},

		methods: {
			handleClick() {
				this.$emit("action", this.method);
			},
		},
	};
</script>

<style scoped>
	.custom-button {
		min-width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-sm) var(--space-md);
		font-size: var(--font-size-input);
		font-weight: 500;
		color: var(--color-palette-neutral-0);
		background-color: var(--color-palette-accent-base);
		border: 1px solid var(--color-palette-accent-base);
		border-radius: var(--border-radius-md);
		cursor: pointer;
		transition: background-color 0.3s, border-color 0.3s, box-shadow 0.2s;
	}

	.custom-button:hover:not(:disabled) {
		background-color: var(--color-palette-accent-hover);
		border-color: var(--color-palette-accent-hover);
	}

	.custom-button:focus {
		outline: none;
		box-shadow: 0 0 0 3px var(--color-palette-accent-focus);
	}

	.custom-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: var(--color-palette-accent-base);
		border-color: var(--color-palette-accent-base);
	}
</style>
