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
				const result = await this.$u.get('https://api.shop.eduwork.cn/api/index')
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
