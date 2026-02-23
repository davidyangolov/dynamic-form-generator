<template>
	<div class="custom-select">
		<div
			class="select-wrapper"
			:class="{ open: isOpen, error: error }"
			@click="toggleDropdown"
		>
			<span
				class="selected-option"
				:class="{ placeholder: !modelValue }"
			>
				{{ selectedLabel }}
			</span>

			<span class="arrow">▾</span>
		</div>

		<ul
			v-if="isOpen"
			class="options-list"
		>
			<li
				v-for="option in options"
				:key="option.value"
				@click.stop="selectOption(option)"
				:class="{ active: option.value === modelValue }"
			>
				{{ option.label }}
			</li>
		</ul>

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
		name: "CustomSelect",
		inheritAttrs: false,
		props: {
			modelValue: [String, Number],
			options: {
				type: Array,
				required: true,
			},
			placeholder: {
				type: String,
				default: "Выберите значение",
			},
			error: String,
		},
		data() {
			return {
				isOpen: false,
			};
		},
		computed: {
			selectedLabel() {
				const found = this.options.find((o) => o.value === this.modelValue);
				return found ? found.label : this.placeholder;
			},
		},
		methods: {
			toggleDropdown() {
				this.isOpen = !this.isOpen;
			},
			selectOption(option) {
				this.$emit("update:modelValue", option.value);
				this.isOpen = false;
			},
		},
	};
</script>

<style scoped>
	/* ===== wrapper ===== */

	.custom-select {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.select-label {
		font-size: var(--font-size-sm);
		color: var(--color-text-primary);
	}

	/* ===== input ===== */

	.select-wrapper {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-sm) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius-md);
		background: var(--color-background-component);
		cursor: pointer;
		transition: border-color 0.2s, box-shadow 0.2s;
	}

	.select-wrapper:hover {
		border-color: var(--color-palette-accent-base);
	}

	.select-wrapper.open {
		border-color: var(--color-interactive-primary);
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
	}

	.select-wrapper.error {
		border-color: var(--color-palette-error);
	}

	.select-wrapper.error:hover {
		border-color: var(--color-palette-error);
	}

	.select-wrapper.error.open {
		border-color: var(--color-palette-error);
		box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
	}

	/* ===== value ===== */

	.selected-option {
		font-size: var(--font-size-input);
		color: var(--color-text-primary);
	}

	.selected-option.placeholder {
		color: var(--color-palette-neutral-400);
	}

	.arrow {
		font-size: var(--font-size-sm);
		opacity: 0.6;
	}

	/* ===== dropdown ===== */

	.options-list {
		width: 100%;
		position: absolute;
		top: calc(100% + 2px);
		left: 0;
		right: 0;
		background: var(--color-background-component);
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius-md);
		box-shadow: var(--shadow-md);
		list-style: none;
		padding: var(--space-sm) var(--space-md);
		margin: 0;
		z-index: var(--z-index-dropdown);
		max-height: 200px;
		overflow-y: auto;
	}

	.options-list li {
		padding: var(--space-sm) var(--space-md);
		font-size: var(--font-size-input);
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.options-list li:hover {
		background: var(--color-interactive-primary-hover);
		color: var(--color-text-on-primary);
	}

	.options-list li.active {
		background: var(--color-interactive-primary);
		color: var(--color-text-on-primary);
	}

	/* ===== error ===== */

	.error-text {
		font-size: var(--font-size-sm);
		color: var(--color-palette-error);
		margin-top: var(--space-xs);
	}
</style>
