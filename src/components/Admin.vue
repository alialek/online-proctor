<template>
	<div class="admin wrapper">
		<vs-button size="large">
			<i class="bx bx-plus"></i> Добавить тест
		</vs-button>
		<section class="tests">
			<div class="card"></div>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {
		tests() {
			return this.$store.getters.tests;
		}
	},
	mounted() {
		this.$store
			.dispatch('getTests')
			.then(resp => console.log(resp))
			.catch(error => console.log(error));
	}
};
</script>

<style></style>
