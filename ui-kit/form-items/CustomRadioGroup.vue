<template>
	<div
		class="radio-group"
		:class="{ 'has-error': error }"
	>
		<div class="options-container">
			<CustomRadio
				v-for="option in options"
				:key="option.value"
				:value="option.value"
				:modelValue="modelValue"
				:error="error"
				@update:modelValue="$emit('update:modelValue', $event)"
				:required="required"
			>
				{{ option.label }}
			</CustomRadio>
		</div>

		<p
			v-if="error"
			class="error-text"
		>
			{{ error }}
		</p>
	</div>
</template>

<script>
	import CustomRadio from "./CustomRadio.vue";

	export default {
		name: "CustomRadioGroup",
		components: { CustomRadio },
		props: {
			options: {
				type: Array,
				required: true,
			},
			modelValue: [String, Number],
			name: {
				type: String,
				default: null,
			},
			required: {
				type: Boolean,
				default: false,
			},
			error: {
				type: String,
				default: "",
			},
		},
	};
</script>

<style scoped>
	.radio-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.group-label {
		font-size: var(--font-size-sm);
		color: var(--color-text-primary);
	}

	.options-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.error-text {
		margin: 0;
		margin-top: var(--space-xs);
		font-size: var(--font-size-sm);
		color: var(--color-palette-error, #dc3545);
	}
</style>
