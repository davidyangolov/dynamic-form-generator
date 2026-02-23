<template>
	<transition name="modal-fade">
		<div
			v-if="isOpen"
			class="modal-overlay"
			@click="handleOverlayClick"
		>
			<div
				class="modal-content"
				:style="{ maxWidth: maxWidthValue }"
				@click.stop
			>
				<div
					v-if="$slots.header || title"
					class="modal-header"
				>
					<slot name="header">
						<h2 class="modal-title">{{ title }}</h2>
					</slot>
					<button
						class="close-button"
						@click="close"
						:aria-label="closeLabel"
					>
						✕
					</button>
				</div>

				<div class="modal-body">
					<slot />
				</div>

				<div
					v-if="$slots.footer"
					class="modal-footer"
				>
					<slot name="footer" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "BaseModal",
		props: {
			/**
			 * Контролирует видимость модального окна
			 */
			modelValue: {
				type: Boolean,
				default: false,
			},
			/**
			 * Заголовок модального окна
			 */
			title: {
				type: String,
				default: "",
			},
			/**
			 * Закрыть модальное окно при клике на оверлей
			 */
			closeOnOverlay: {
				type: Boolean,
				default: true,
			},
			/**
			 * Закрыть модальное окно при нажатии Escape
			 */
			closeOnEscape: {
				type: Boolean,
				default: true,
			},
			/**
			 * Максимальная ширина модального окна
			 */
			maxWidth: {
				type: String,
				default: "800px",
			},
			/**
			 * Размер модального окна: 'sm', 'md', 'lg', 'xl'
			 */
			size: {
				type: String,
				default: "md",
				validator: (value) => ["sm", "md", "lg", "xl"].includes(value),
			},
			/**
			 * Текст для кнопки закрытия (для доступности)
			 */
			closeLabel: {
				type: String,
				default: "Закрыть модальное окно",
			},
		},
		computed: {
			isOpen() {
				return this.modelValue;
			},
			maxWidthValue() {
				const sizes = {
					sm: "300px",
					md: "500px",
					lg: "700px",
					xl: "1000px",
				};
				return sizes[this.size] || this.maxWidth;
			},
		},
		watch: {
			isOpen(newVal) {
				if (newVal) {
					document.body.style.overflow = "hidden";
				} else {
					document.body.style.overflow = "";
				}
			},
		},
		mounted() {
			if (this.closeOnEscape) {
				document.addEventListener("keydown", this.handleEscapeKey);
			}
		},
		beforeUnmount() {
			if (this.closeOnEscape) {
				document.removeEventListener("keydown", this.handleEscapeKey);
			}
			document.body.style.overflow = "";
		},
		methods: {
			close() {
				this.$emit("update:modelValue", false);
				this.$emit("close");
			},
			handleOverlayClick() {
				if (this.closeOnOverlay) {
					this.close();
				}
			},
			handleEscapeKey(event) {
				if (event.key === "Escape" && this.isOpen) {
					this.close();
				}
			},
		},
	};
</script>

<style scoped>
	/* Overlay */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: var(--space-md);
	}

	/* Modal Content */
	.modal-content {
		background: var(--color-palette-neutral-0, #fff);
		border-radius: var(--border-radius-md, 8px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		width: 100%;
		max-height: 95vh;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		padding: var(--space-lg);
		justify-content: center;
		align-items: center;
		position: relative;
	}

	/* Modal Header */
	.modal-header {
		width: 90%;
		background: #000;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--space-lg);
		border-bottom: 1px solid var(--color-palette-neutral-100);
		position: sticky;
		top: 0;
		background: var(--color-palette-neutral-0);
		flex-shrink: 0;
	}

	.modal-title {
		background: #000;
		margin: 0;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
		display: flex;
	}

	.close-button {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: var(--color-palette-neutral-400);
		transition: color 0.3s ease;
		padding: 0;
		width: 32px;
		height: 32px;
		border-radius: var(--border-radius-md);
	}

	.close-button:hover {
		color: var(--color-text-primary);
		background: var(--color-palette-neutral-100);
	}

	/* Modal Body */
	.modal-body {
		padding: var(--space-lg);
		flex: 1;
		overflow-y: auto;
	}

	/* Modal Footer */
	.modal-footer {
		padding: var(--space-lg);
		border-top: 1px solid var(--color-palette-neutral-100);
		background: var(--color-palette-neutral-100);
		flex-shrink: 0;
	}

	/* Transitions */
	.modal-fade-enter-active,
	.modal-fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.modal-fade-enter-from,
	.modal-fade-leave-to {
		opacity: 0;
	}

	.modal-fade-enter-from .modal-content,
	.modal-fade-leave-to .modal-content {
		transform: translateY(20px);
	}

	.modal-content {
		transition: transform 0.3s ease;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.modal-overlay {
			padding: var(--space-sm);
		}

		.modal-header,
		.modal-body,
		.modal-footer {
			padding: var(--space-md);
		}

		.modal-title {
			font-size: 1.1rem;
		}

		.modal-content {
			max-height: 95vh;
		}
	}
</style>
