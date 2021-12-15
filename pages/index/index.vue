<template>
	<view @click="toRequest">
		首页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			async toRequest() {
				// const result = await this.$u.post('/api/auth/login')
				// console.log('123312')

				// const result = await new Promise((resolve, reject) => {
				// 	setTimeout(() => {
				// 		reject('2')
				// 	}, 2000)
				// })

				// console.log(result);

				const result = this.$u.api.getIndex()
				console.log(result)
				console.log(this.vuex_version)
				
			}

		}
	}
</script>

<style lang="scss" scoped>

</style>
