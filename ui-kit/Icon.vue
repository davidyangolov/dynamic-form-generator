<template>
	<span
		class="icon-root"
		role="img"
		:aria-hidden="!!ariaHidden"
		:aria-label="label || name"
		v-html="svg"
	/>
</template>

<script>
	import svgs from "./icons/index.js";
	export default {
		name: "UiIcon",
		props: {
			name: { type: String, default: "" },
			size: { type: [Number, String], default: 20 },
			label: { type: String, default: "" },
			ariaHidden: { type: Boolean, default: false },
		},
		computed: {
			svg() {
				const key = (this.name || "").toLowerCase();
				const raw = svgs[key] || svgs.default;
				// inject size attributes for consistent sizing
				return raw
					.replace(
						/viewBox="0 0 \d+ \d+"/,
						`viewBox=\"0 0 ${this.size} ${this.size}\"`,
					)
					.replace(/width="\d+"|height="\d+"/g, "");
			},
		},
	};
</script>

<style scoped>
	.icon-root svg {
		width: 1em;
		height: 1em;
		display: inline-block;
		vertical-align: middle;
	}
</style>
