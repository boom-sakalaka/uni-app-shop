<!--
 * @Author: GZH
 * @Date: 2021-12-14 10:47:46
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-16 15:31:41
 * @FilePath: \uni_shop\pages\index\index.vue
 * @Description: 
-->
<template>
  <view class="u-p-b-20">
    <u-swiper :list="swperList" height="328" name="img_url"></u-swiper>
    <!-- tabs -->
    <view class="u-text-center u-m-t-20">
      <u-tabs
        :gutter="20"
        :item-width="160"
        :bar-height="12"
        :list="sortList"
        :current="sortCurrent"
        @change="sortChange"
      ></u-tabs>
    </view>
    <u-row gutter="16" class="u-skeleton">
      <u-col span="6" v-for="(goods, index) in goodsList.length ? goodsList : 4" :key="index">
        <goods-card :goods="goods"></goods-card>
      </u-col>
      <u-col span="12">
        <u-loadmore :status="isShowLoading" icon-color="#2979ff" color="#2979ff" />
      </u-col>
    </u-row>
    <!-- 返回顶部 -->
    <u-back-top :scroll-top="scrollTop"></u-back-top>
    <!-- 骨架屏 -->
    <u-skeleton :loading="loading" :animation="true" bgColor="#fff"></u-skeleton>
  </view>
</template>

<script>
export default {
  async onLoad() {
    this.getIndexData();
    console.warn(getCurrentPages().pop());
  },
  data() {
    return {
      swperList: [],
      goodsPage: 1,
      goodsList: [],
      sortList: [{ name: '默认' }, { name: '销量' }, { name: '推荐' }, { name: '最新' }],
      sortCurrent: 0,
      isShowLoading: 'loading',
      loading: false, // 是否显示骨架屏组件
      scrollTop: 0,
    };
  },
  methods: {
    sortChange(index) {
      this.sortCurrent = index;
      // 重置商品数据和分页
      this.page = 1;
      this.goodsList = [];
      this.getIndexData();
    },

    async getIndexData() {
      this.loading = !this.loading;
      const params = {
        page: this.goodsPage,
      };
      // 判断tabs
      if (this.sortCurrent === 1) params.sales = 1;
      if (this.sortCurrent === 2) params.recommend = 1;
      if (this.sortCurrent === 3) params.new = 1;
      // 拿到首页商品数据
      const indexData = await this.$u.api.getIndex(params);
      this.swperList = indexData.slides;
      // 将分页数据累加上
      this.goodsList.push(...indexData.goods.data);
      this.loading = !this.loading;
    },
  },
  onReachBottom() {
    // 如果请求到的数据不再是10条，说明数据到底
    if (this.goodsList.length % 10 == 0) {
      this.goodsPage++;
      this.getIndexData();
    } else {
      this.isShowLoading = 'nomore';
    }
  },
  onPageScroll(e) {
    // 返回顶部
    this.scrollTop = e.scrollTop;
  },
};
</script>

<style lang="scss" scoped></style>
