<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveAllSort">
        <h2 class="all" @mouseenter="enterAllSort">全部商品分类</h2>
        <transition name="sort">
          <div v-show="isshow" class="sort">
            <div class="all-sort-list2" @click="gosearch">
              <div
                class="item bo"
                v-for="(c1, i) in $store.state.home.category"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="returnIndex(i)"
                  :class="currentIndex == i ? 'cur' : ''"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    href="javaScript:;"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="(c2, i) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category1Id="c2.categoryId"
                          href="javaScript:;"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, i) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            href="javaScript:;"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 最好还是按需加载，你要找一下，我这样子其实不太好
import _ from "lodash";
export default {
  name: "Typenav",
  data() {
    return {
      currentIndex: -1,
      isshow: this.$route.name == "search"||this.$route.name=="detail" ? false : true,
    };
  },
  mounted() {
    // this.$store.dispatch("home/CategoryList", 123);
  },
  methods: {
    // returnIndex(i) {
    //   // console.log(Lodash)
    //   console.log(_.throttle)
    //   Lodash()
    //   this.currentIndex = i;
    //  _.throttle(updatePosition, 100)
    // },
    returnIndex: _.throttle(function (i) {
      this.currentIndex = i;
    }, 100),
    gosearch(e) {
      // console.log(e.target.dataset); //这玩意数个对象，所以解构一下
      let query = {};
      let { categoryname:categoryName, category1Id, category2Id, category3Id } =e.target.dataset;
      console.log(categoryName);
      if (categoryName) {
        console.log("categoryName")
        query.categoryName = categoryName;
      }
      if (category1Id) query.category1Id = category1Id;
      else if (category2Id) query.category2Id = category2Id;
      else if (category3Id) query.category3Id = category3Id;
      // console.log(query);
      this.$router.push({
        name: "search",
        params: this.$route.params,
        query: query,
      });
    },
    leaveAllSort() {
      this.currentIndex = -1;
      if (this.$route.name === "search"||this.$route.name === "detail") {
        this.isshow = false;
      }
    },
    enterAllSort() {
      if (this.$route.name === "search"||this.$route.name === "detail") {
        this.isshow = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .cur {
            background: pink;
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 471px;
    }
    .sort-enter-active {
      transition: all 300ms linear;
    }
    .sort-leave {
      height: 471px;
    }
    .sort-leave-to {
      height: 0px;
    }
    .sort-leave-active {
      transition: all 300ms linear;
    }
  }
}
</style>