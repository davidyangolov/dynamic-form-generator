<template>
	<div class="modal-examples">
		<h1>Примеры использования BaseModal</h1>

		<!-- Пример 1: Простая модаль -->
		<section class="example">
			<h2>1. Простая модаль с заголовком</h2>
			<button
				@click="example1Open = true"
				class="btn"
			>
				Открыть
			</button>

			<BaseModal
				v-model="example1Open"
				title="Простая модаль"
			>
				<p>Это простое модальное окно с заголовком и контентом.</p>
			</BaseModal>
		</section>

		<!-- Пример 2: Модаль с footer -->
		<section class="example">
			<h2>2. Модаль с действиями в footer</h2>
			<button
				@click="example2Open = true"
				class="btn"
			>
				Открыть
			</button>

			<BaseModal
				v-model="example2Open"
				title="Модаль с действиями"
			>
				<p>Это модальное окно имеет кнопки действия в footer.</p>

				<template #footer>
					<button
						@click="example2Open = false"
						class="btn-secondary"
					>
						Отмена
					</button>
					<button
						@click="handleAction"
						class="btn-primary"
					>
						Сохранить
					</button>
				</template>
			</BaseModal>
		</section>

		<!-- Пример 3: Разные размеры -->
		<section class="example">
			<h2>3. Разные размеры</h2>
			<button
				@click="example3Open = 'sm'"
				class="btn"
			>
				Small
			</button>
			<button
				@click="example3Open = 'md'"
				class="btn"
			>
				Medium
			</button>
			<button
				@click="example3Open = 'lg'"
				class="btn"
			>
				Large
			</button>
			<button
				@click="example3Open = 'xl'"
				class="btn"
			>
				XL
			</button>

			<!-- <BaseModal
				:model-value="example3Open !== false"
				:title="`Размер: ${example3Open.toUpperCase()}`"
				:size="example3Open"
				@update:model-value="example3Open = false"
			>
				<p>Это модальное окно размера {{ example3Open }}.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</BaseModal> -->
		</section>

		<!-- Пример 4: Кастомный header -->
		<section class="example">
			<h2>4. Кастомный заголовок</h2>
			<button
				@click="example4Open = true"
				class="btn"
			>
				Открыть
			</button>

			<BaseModal v-model="example4Open">
				<template #header>
					<div class="custom-header">
						<span>🎨 Кастомный заголовок</span>
						<small>С дополнительной информацией</small>
					</div>
				</template>

				<p>Заголовок был полностью переопределен через слот.</p>

				<template #footer>
					<button
						@click="example4Open = false"
						class="btn-primary"
					>
						Закрыть
					</button>
				</template>
			</BaseModal>
		</section>

		<!-- Пример 5: Форма в модали -->
		<section class="example">
			<h2>5. Форма в модали</h2>
			<button
				@click="example5Open = true"
				class="btn"
			>
				Открыть форму
			</button>

			<BaseModal
				v-model="example5Open"
				title="Форма в модали"
				size="md"
			>

				<template #footer>
					<button
						@click="example5Open = false"
						class="btn-secondary"
					>
						Отмена
					</button>
					<button
						@click="submitForm"
						class="btn-primary"
					>
						Отправить
					</button>
				</template>
			</BaseModal>
		</section>

		<!-- Пример 6: Модаль подтверждения -->
		<section class="example">
			<h2>6. Модаль подтверждения</h2>
			<button
				@click="example6Open = true"
				class="btn btn-danger"
			>
				Удалить
			</button>

			<BaseModal
				v-model="example6Open"
				title="Подтверждение удаления"
				size="sm"
				:close-on-overlay="false"
			>
				<p>Вы уверены, что хотите удалить этот элемент?</p>
				<p style="color: #c62828">Это действие нельзя отменить!</p>

				<template #footer>
					<button
						@click="example6Open = false"
						class="btn-secondary"
					>
						Отмена
					</button>
					<button
						@click="confirmDelete"
						class="btn-danger"
					>
						Удалить
					</button>
				</template>
			</BaseModal>
		</section>

		<!-- Пример 7: Настройки для Escape -->
		<section class="example">
			<h2>7. Отключено закрытие на Escape</h2>
			<button
				@click="example7Open = true"
				class="btn"
			>
				Открыть
			</button>

			<BaseModal
				v-model="example7Open"
				title="Важное действие"
				:close-on-escape="false"
			>
				<p>Это модальное окно нельзя закрыть нажатием Escape.</p>
				<p>Можно закрыть только кнопкой или кликом на кнопку в footer.</p>

				<template #footer>
					<button
						@click="example7Open = false"
						class="btn-primary"
					>
						Закрыть
					</button>
				</template>
			</BaseModal>
		</section>
	</div>
</template>

<script>
	import BaseModal from "@/ui-kit/BaseModal.vue";

	export default {
		name: "BaseModalExamples",
		components: {
			BaseModal,
		},
		data() {
			return {
				example1Open: false,
				example2Open: false,
				example3Open: false,
				example4Open: false,
				example5Open: false,
				example6Open: false,
				example7Open: false,
				formData: {
					name: "",
					email: "",
					message: "",
				},
			};
		},
		methods: {
			handleAction() {
				alert("Действие выполнено!");
				this.example2Open = false;
			},
			submitForm() {
				console.log("Форма отправлена:", this.formData);
				alert("Форма отправлена! Проверьте консоль.");
				this.example5Open = false;
				this.formData = {
					name: "",
					email: "",
					message: "",
				};
			},
			confirmDelete() {
				alert("Элемент удален!");
				this.example6Open = false;
			},
		},
	};
</script>

<style scoped>
	.modal-examples {
		padding: 40px;
		max-width: 800px;
		margin: 0 auto;
	}

	.example {
		margin-bottom: 40px;
		padding: 20px;
		background: var(--color-palette-neutral-100);
		border-radius: var(--border-radius-md);
	}

	.example h2 {
		margin-top: 0;
		font-size: 1.1rem;
		color: var(--color-text-primary);
	}

	.btn {
		padding: 10px 16px;
		margin-right: 8px;
		background: var(--color-palette-accent-base);
		color: var(--color-palette-neutral-0);
		border: none;
		border-radius: var(--border-radius-md);
		font-size: var(--font-size-sm);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.btn:hover {
		background: #1add7f;
		box-shadow: 0 4px 12px rgba(30, 255, 150, 0.3);
	}

	.btn-secondary {
		background: var(--color-palette-neutral-300);
		color: var(--color-text-primary);
	}

	.btn-secondary:hover {
		background: var(--color-palette-neutral-400);
	}

	.btn-primary {
		background: var(--color-palette-accent-base);
		color: var(--color-palette-neutral-0);
	}

	.btn-primary:hover {
		background: #1add7f;
	}

	.btn-danger {
		background: #d32f2f;
		color: white;
	}

	.btn-danger:hover {
		background: #c62828;
	}

	.custom-header {
		display: flex;
		flex-direction: column;
	}

	.custom-header span {
		font-size: 1.2rem;
		font-weight: 700;
	}

	.custom-header small {
		font-size: 0.85rem;
		color: var(--color-palette-neutral-400);
		margin-top: 4px;
	}

	.form-group {
		margin-bottom: 16px;
	}

	.form-group label {
		display: block;
		font-weight: 600;
		margin-bottom: 8px;
		color: var(--color-text-primary);
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 10px;
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius-md);
		font-family: inherit;
		font-size: var(--font-size-sm);
		box-sizing: border-box;
	}

	.form-group textarea {
		min-height: 100px;
		resize: vertical;
	}
</style>
