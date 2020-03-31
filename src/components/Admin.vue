<template>
	<div class="admin wrapper">
		<vs-button size="large" @click="addTest = !addTest">
			<i class="bx bx-plus"></i> Добавить тест
		</vs-button>

		<vs-dialog class="add-test" overflow-hidden closable v-model="addTest">
			<template #header>
				<h4 class="not-margin">
					Добавить тест
				</h4>
			</template>

			<v-card v-for="(question, index) in questions" :key="question.id">
				<v-card-title> Вопрос {{ index + 1 }} </v-card-title>
				<v-card-text>
					<v-form>
						<v-row>
							<v-col cols="12" md="6">
								<v-text-field
									placeholder="Введите вопрос"
									v-model="question.title"
								></v-text-field>
							</v-col>
							<v-col cols="12" md="6">
								<v-select
									v-model="activeQuestionType"
									label="Тип вопроса"
									:items="items"
								>
								</v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-row> </v-row>
							</v-col>
						</v-row>
					</v-form>
				</v-card-text>
				<v-card-actions> </v-card-actions>
			</v-card>

			<template #footer>
				<div>
					<vs-button block @click="length++">
						Добавить вопрос
					</vs-button>
				</div>
			</template>
		</vs-dialog>
	</div>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			addTest: false,
			question: null,
			length: 1,
			questions: [{ id: 1, title: "", options: [] }],
			activeQuestionType: "Несколько из списка",
			items: ["Несколько из списка", "Один из списка", "Текст"]
		};
	},
	computed: {
		tests() {
			return this.$store.getters.tests;
		}
	},

	mounted() {
		// this.$store
		// .dispatch("getTests")
		// .then(resp => console.log(resp))
		// .catch(error => console.log(error));
	}
};
</script>

<style>
.add-test .vs-dialog {
	width: 70vw;
	height: 70vh;
}
</style>
