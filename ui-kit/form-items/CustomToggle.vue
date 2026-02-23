<template>
	<div class="custom-toggle">
		<label class="switch">
			<input
				type="checkbox"
				v-bind="$attrs"
			/>
			<span class="slider round"></span>
		</label>
	</div>
</template>
<script>
	export default {
		name: "CustomToggle",
	};
</script>
<style scoped>
	.custom-toggle {
		display: inline-block;
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--color-palette-neutral-400);
		transition: background-color 0.4s;
		border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: var(--color-palette-neutral-0);
		transition: transform 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: var(--color-interactive-primary);
	}

	input:checked + .slider:before {
		transform: translateX(26px);
	}
</style>
