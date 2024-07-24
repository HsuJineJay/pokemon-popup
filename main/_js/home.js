window.onload = function () {

  // ==============================
  // section2 快閃資訊
  // ==============================

  // >>>>>>快閃資訊內容變化按鈕<<<<<<
  let switchStore = document.getElementById("switchStore")
  let switchCafe = document.getElementById("switchCafe")

  //switchCafe被點擊時更換成咖啡廳內容
  switchCafe.addEventListener('click', changeToCafe);

  function changeToCafe(){
    let typeTagChin = document.querySelectorAll(".type_tag>h5")
    // console.log(typeTag[0].children[0]);
    typeTagChin.forEach( (element) => {
      console.log(element);
      element.innerText = "咖啡廳"
    });
    let typeTagEng = document.querySelectorAll(".type_tag>h6")
    typeTagEng.forEach( (element) => {
      console.log(element);
      element.innerText = "cafe"
    });
  }



  // ==============================
  // section3 人氣商品
  // ==============================

  // >>>>>>變數儲存產品的url<<<<<<
  let productUrl_1 = "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P4054_702-02964_02.jpg";
  let productUrl_2 = "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P9351_701E10017_02.jpg";
  let productUrl_3 = "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P4494_702-03135_02.jpg";
  let productUrl_4 = "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P4494_702-03136_02.jpg";
  let productUrl_5 = "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P9143_701-97241_02.jpg";
  let productUrl_6 = "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P4054_702-02963_02.jpg";

  document.getElementById("productImg1").src = productUrl_1;
  document.getElementById("productImg2").src = productUrl_2;
  document.getElementById("productImg3").src = productUrl_3;
  document.getElementById("productImg4").src = productUrl_4;
  document.getElementById("productImg5").src = productUrl_5;
  document.getElementById("productImg6").src = productUrl_6;


  // >>>>>>360度旋轉滾動卡片<<<<<<
  let rotateContain = document.querySelector('.rotate_card')
  let productItems = document.querySelectorAll('.carousel_item .product_card')
  productItems.forEach((item, idx) => {
    item.addEventListener('click', function () {
      rotateContain.style.transform = `rotate(${-idx * 60}deg)`
      // console.log(idx);

      // 更新所有item的文字方向
      productItems.forEach((i, index) => {
        i.style.transform = `translateX(-50%) rotate(${(index - idx) * -60}deg)`
      })
    })
  })



  // ==============================
  // section4 熱門餐點
  // ==============================

  // >>>>>>變數儲存產品的url
  let foodUrl_1 = "https://github.com/Bruce1995010101/pkimg/blob/main//menuImg/3-1.jpg?raw=true";
  let foodUrl_2 = "https://github.com/Bruce1995010101/pkimg/blob/main//menuImg/2-1.jpg?raw=true";
  let foodUrl_3 = "https://github.com/Bruce1995010101/pkimg/blob/main//menuImg/1-1.jpg?raw=true";
  let foodUrl_4 = "https://github.com/Bruce1995010101/pkimg/blob/main//menuImg/4-1.jpg?raw=true";
  let foodUrl_5 = "https://github.com/Bruce1995010101/pkimg/blob/main//menuImg/5-1.jpg?raw=true";
  let foodUrl_6 = "https://github.com/Bruce1995010101/pkimg/blob/main//menuImg/6-1.jpg?raw=true";

  document.getElementById("foodImg1").src = foodUrl_1;
  document.getElementById("foodImg2").src = foodUrl_2;
  document.getElementById("foodImg3").src = foodUrl_3;
  // document.getElementById("foodImg4").src = foodUrl_4;
  // document.getElementById("foodImg5").src = foodUrl_5;
  // document.getElementById("foodImg6").src = foodUrl_6;






  //>>>>>>餐點菜單移動按鈕<<<<<<
  let cardContain = document.querySelector('.menu_card_group');
  let menuPrev = document.getElementById("menuPrev")
  let menuNext = document.getElementById("menuNext")
  let menuCardAll = document.querySelectorAll(".menu_card")
  // 設定一個每次按下去會記數的變數初始值
  let currentIndex = 0


  // 當menuNext按鈕點擊時裡面的每個menu_card向左滑
  menuPrev.addEventListener('click', showPrevCard);
  menuNext.addEventListener('click', showNextCard);

  // 按下一個按鈕會執行的function
  function showNextCard() {
    // console.log("下一個");
    if (currentIndex < menuCardAll.length - 1) {
      currentIndex++;
      moveCard()
    }
  }

  // 按上一個按鈕會執行的function
  function showPrevCard() {
    // console.log("上一個");
    console.log(moveDistance);
    if (currentIndex > 0) {
      currentIndex--;
      moveCard()
    }
  }

  // 計算移動距離
  let cardWidth = menuCardAll[0].offsetWidth;
  let cardGap = parseInt(window.getComputedStyle(menuCardAll[0]).gap);
  let moveDistance = cardWidth + cardGap;

  // 移動每個卡片
  function moveCard() {
    menuCardAll.forEach((card, index) => {
      // console.log(index);
      // console.log(card);

      // 設定移動距離css
      card.style.transform = `translateX(${(currentIndex) * -moveDistance}px)`;
      // 設定左至右漸變消失的css
      card.style.opacity = `${(((currentIndex - index + 0.2) * 0.5) + 1)}`;

      // 當在第一個的時候往前的按鈕消失
      currentIndex === 0 ? menuPrev.style.visibility = "hidden" : menuPrev.style.visibility = "visible";

    })
  }

  //如果有滾動的話就回復成原本的opacity和按鈕顯示
  cardContain.addEventListener('scroll', function () {
    // console.log("scroll");
    menuCardAll.forEach((card, index) => {
      card.style.opacity = `1`;
    })
    menuPrev.style.visibility = "visible"
  })

  //每次載入都先執行一次，讓opacity可以變化
  moveCard() 

}
