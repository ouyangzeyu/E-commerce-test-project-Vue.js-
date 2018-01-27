<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div v-if="goodsData.goodsinfo" class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="(item, index) in goodsData.imglist" :key="index">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsData.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsData.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsData.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsData.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsData.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number :min="1" :max="goodsData.goodsinfo.stock_quantity" size="small" v-model="count"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsData.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addToShopCart" ref="addToShopCartButton" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a :class="isShowIntroduce ? 'selected' :'' " href="javascript:void(0);" @click="switchShowIntroduce(true)">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click="switchShowIntroduce(false)" href="javascript:void(0);" :class="!isShowIntroduce ? 'selected' :'' ">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-show="isShowIntroduce" class="tab-content entry" style="display: block;">
                                <span v-html="goodsData.goodsinfo.content"></span>
                            </div>
                            <div v-show="!isShowIntroduce" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" ref="commenttxtRef" placeholder="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentData.totalcount <= 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item,index) in commentData.message" :key="index">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div v-if="commentData.totalcount > 0" class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 10, 20]"
                                            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="commentData.totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item,index) in goodsData.hotgoodslist" :key="index">
                                        <div class="img-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 动画相关 -->
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <div v-show="isShowAnimationImage" class="animationImg" id="animationImgId" v-if="goodsData.imglist">
                <img width="100%" height="100%" :src="goodsData.imglist[0].thumb_path" alt="">
            </div>
        </transition>
    </div>
</template>

<style scoped>
/** 导入放大镜的样式 */

@import "../../statics/site/js/jqueryplugins/jqimgzoom/css/magnifier.css";

.animationImg {
  border: 1px solid rgba(92, 92, 92, 0.3);
  width: 50px;
  height: 50px;
  position: absolute;
  transition: all 0.5s;
}
</style>

<script>
//导入放大镜的js文件
import "../../statics/site/js/jqueryplugins/jqimgzoom/js/magnifier.js";

import { Affix } from "iview";

export default {
  data() {
    return {
      goodsData: {},
      isShowIntroduce: true, //默认情况下显示商品介绍
      commentData: {}, //获取到的评论数据
      currentPage: 1, //当前加载的页码
      pageSize: 2, //页容量
      count: 1, //商品数量
      addToShopCartButtonOffset: null, //加入购物车按钮的offset
      shoppingCartCountOffset: null, //购物车徽标的offset
      isShowAnimationImage: false //是否显示动画图片
    };
  },
  watch: {
    $route: function(newValue, oldValue) {
      this.getGoodsData();
      this.getCommentData();
    }
  },
  components: {
    Affix: Affix
  },
  created() {
    //获取商品数据
    this.getGoodsData();
    //获取商品评论数据
    this.getCommentData();
  },
  mounted() {
    setTimeout(() => {
      //1.0 给动画的起始位置赋值
      this.addToShopCartButtonOffset = $(
        this.$refs.addToShopCartButton
      ).offset();
      //2.0 设置要动画图片的位置
      $("#animationImgId")
        .css("left", this.addToShopCartButtonOffset.left + "px")
        .css("top", this.addToShopCartButtonOffset.top + "px");
      //3.0 给动画的结束位置赋值
      this.shoppingCartCountOffset = $("#shoppingCartCount").offset();
    }, 500);
  },
  methods: {
    //1、根据id获取商品的数据
    getGoodsData() {
      const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`;

      this.$axios.get(url).then(response => {
        this.goodsData = response.data.message;

        setTimeout(() => {
          $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
        }, 200);
      });
    },
    //2、是否显示介绍
    switchShowIntroduce(isShow) {
      this.isShowIntroduce = isShow;
    },
    //3、分页加载评论数据
    getCommentData() {
      const url = `site/comment/getbypage/goods/${
        this.$route.params.goodsId
      }?pageIndex=${this.currentPage}&pageSize=${this.pageSize}`;

      this.$axios.get(url).then(response => {
        this.commentData = response.data;
      });
    },
    //element分页条相关
    //当更改了页容量
    handleSizeChange(size) {
      this.pageSize = size;

      this.getCommentData();
    },
    //当更改了当前的页码
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;

      this.getCommentData();
    },
    //提交评论
    postComment() {
      //1.0 获取内容
      const commenttxt = this.$refs.commenttxtRef.value;

      //2.0 判断是否为空，如果为空，提示他
      if (commenttxt.trim().length <= 0) {
        this.$message({
          message: "评论内容不能为空",
          type: "warning"
        });
        return;
      }

      //3.0 发送请求
      const url = `site/validate/comment/post/goods/${
        this.$route.params.goodsId
      }`;

      this.$axios.post(url, { commenttxt }).then(response => {
        if (response.data.status == 1) {
          this.$message.error(response.data.message);
          return;
        }

        //清空输入框的内容
        this.$refs.commenttxtRef.value = "";

        //重新加载第一页的数据
        this.currentPage = 1;
        this.getCommentData();
      });
    },
    //加入购物车
    addToShopCart() {
      this.isShowAnimationImage = true;
    },
    //购物车动画钩子函数
    beforeEnter: function(el) {
      //设置动画的起始位置
      el.style.left = `${this.addToShopCartButtonOffset.left}px`;
      el.style.top = `${this.addToShopCartButtonOffset.top}px`;
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function(el, done) {
      //刷新帧
      el.offsetWidth;
      // 设置结束位置
      el.style.left = `${this.shoppingCartCountOffset.left}px`;
      el.style.top = `${this.shoppingCartCountOffset.top}px`;

      done();
    },
    afterEnter: function(el) {
      this.isShowAnimationImage = false;
    }
  }
};
</script>