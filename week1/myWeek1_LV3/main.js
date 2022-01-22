import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app = createApp({
  data() {
    return {
      // 輪播牆圖片
      carousel: {
        imgUrl: [
          'https://ucarecdn.com/b9612f4e-9705-43b8-a617-ddcc8b2353be/-/crop/2047x852/1,0/-/format/auto/-/resize/2048x/',
          'https://ucarecdn.com/52ba7d72-2338-46b4-a415-aa573fcd05dc/-/crop/5498x2289/0,695/-/format/auto/-/resize/2048x/',
          'https://ucarecdn.com/8f06a67b-005e-4723-aaef-05b764a8ecf9/-/crop/5471x2278/0,623/-/format/auto/-/resize/2048x/',
          'https://ucarecdn.com/c7f8d0b0-8b37-45fb-a5db-e4e7316d9d31/-/crop/5326x2218/0,1142/-/format/auto/-/resize/2048x/',
        ],
      },
      // 商品資料
      products: {
        cake: [{
          category: '芋見莓好',
          solgon: '採用日本兵庫縣中澤鮮奶油',
          description: '採用日本中澤鮮奶油與進口藍莓裝飾，外表清新簡約，內餡為國產小農生產新鮮芋頭與手工布丁搭配原味戚風蛋糕，綿密細緻',
          OriginSize: 6,
          OriginPrice: 980,
          on_sale: true,
          size: [
            {
              size: 6,
              price: 0,
            },
            {
              size: 8,
              price: 400,
            },
            {
              size: 10,
              price: 1100,
            },
          ],
          imageUrl: [
            'https://images.weserv.nl/?url=https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/742cb3.jpg&h=1000&fit=cover',
            'https://images.weserv.nl/?url=https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/f64d82.jpg&h=1000&fit=cover',
          ],
        },
        {
          category: '可可禮讚',
          solgon: '選用100%法國百年品牌Weiss巧克力',
          description: '選用100%法國百年品牌Weiss巧克力甘納許與日本中澤鮮奶油，新鮮國產大湖草莓搭配Q彈巧克力戚風蛋糕，推薦給重度巧克力愛好者的您',
          OriginSize: 6,
          OriginPrice: 980,
          on_sale: false,
          size: [
            {
              size: 6,
              price: 0,
            },
            {
              size: 8,
              price: 400,
            },
            {
              size: 10,
              price: 1100,
            },
          ],
          imageUrl: [
            'https://images.weserv.nl/?url=https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/100Weiss51fc7a.jpg&h=1000&fit=cover',
            'https://images.weserv.nl/?url=https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/100Weissa3a992.jpg&h=1000&fit=cover',
          ],
        },
        {
          category: '黑白配',
          solgon: '選用100%法國百年品牌Weiss巧克力',
          description: '選用100%法國百年品牌Weiss巧克力甘納許與日本中澤鮮奶油，新鮮國產大湖草莓搭配Q彈巧克力戚風蛋糕，推薦給重度巧克力愛好者的您',
          OriginSize: 6,
          OriginPrice: 980,
          on_sale: true,
          size: [
            {
              size: 6,
              price: 0,
            },
            {
              size: 8,
              price: 400,
            },
            {
              size: 10,
              price: 1100,
            },
          ],
          imageUrl: [
            'https://images.weserv.nl/?url=https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/100Weisscbcd98.jpg&h=1000&fit=cover',
          ],
        },
        {
          category: '青青泰泰',
          solgon: '採用經典ChaTraMue手標泰式奶茶',
          description: '選用100%ChaTraMue泰國手標奶茶香緹，搭配進口爽脆綠葡萄及手工布丁，加上Q彈泰奶戚風蛋糕，甘醇泰奶滋味讓您欲罷不能',
          OriginSize: 6,
          OriginPrice: 980,
          on_sale: true,
          size: [
            {
              size: 6,
              price: 0,
            },
            {
              size: 8,
              price: 400,
            },
            {
              size: 10,
              price: 1100,
            },
          ],
          imageUrl: [
            'https://images.weserv.nl/?url=https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/ChaTraMued43410.jpg&h=1000&fit=cover',
            'https://images.weserv.nl/?url=https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/ChaTraMuef1387f.jpg&h=1000&fit=cover'
          ],
        },
        {
          category: '魔法森林',
          solgon: '新鮮國產香蕉搭配法國巴芮可可脆片',
          description: '以宇治抹茶淋面，凸顯出漸層效果，有如置身魔法森林，內餡是新鮮國產香蕉搭配法國巴芮可可脆片與手工布丁，加上巧克力戚風蛋糕，食感豐富',
          OriginSize: 6,
          OriginPrice: 980,
          on_sale: true,
          size: [
            {
              size: 6,
              price: 0,
            },
            {
              size: 8,
              price: 400,
            },
            {
              size: 10,
              price: 1100,
            },
          ],
          imageUrl: [
            'https://images.weserv.nl/?url=https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/cc3ad3.jpg&h=1000&fit=cover',
            'https://images.weserv.nl/?url=https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/b58be3.jpg&h=1000&fit=cover'
          ],
        },
        ],
      },
      // 點擊的商品資訊暫存區
      dataList: [],
      // 商品的所有價格及尺寸暫存區
      cakePriceSize: {
        price: null,
        Size: null
      },
      //商品輪播牆圖片外框預設值
      imgOutLine: 0,

    }
  },
  methods: {
    // 點擊後將商品資訊傳入dataList
    clickItem(item) {
      this.dataList = []
      this.dataList.push(item)
      // closeWindows消除商品互動視窗的圖片外框
      this.closeWindows();
      // 將cakePriceSize的資料設為原始價格
      this.cakePriceSize.price = this.dataList[0].OriginPrice
      this.cakePriceSize.size = this.dataList[0].OriginSize
    },
    // 實現點擊輪播牆圖片更換的時候下方的圖片外框會跟著變換
    addImgOutline() {
      this.imgOutLine++
      let imgLenght = this.dataList[0].imageUrl.length - 1
      if (this.imgOutLine > imgLenght) this.imgOutLine = 0
    },
    // 實現點擊輪播牆圖片更換的時候下方的圖片陰影會跟著變換
    removeImgOutline() {
      this.imgOutLine--
      let imgLenght = this.dataList[0].imageUrl.length - 1
      if (this.imgOutLine < 0) this.imgOutLine = imgLenght
    },
    // 離開商品視窗的時候 變回陰影在第一張圖
    closeWindows() {
      this.imgOutLine = 0
    },
    //改變尺寸跟價格的時候 下方的結算數字會跟著改變
    changePrice(price, size) {
      this.cakePriceSize.price = this.dataList[0].OriginPrice
      this.cakePriceSize.price += price
      this.cakePriceSize.size = size
    }

  },
}).mount('#app');

