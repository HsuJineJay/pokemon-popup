window.onload = function () {

  // ==============================
  // section1 各個屬性顏色變換
  // ==============================
  /*     const changeColorBtn = document.getElementById('colorChangeR');
      
      changeColorBtn.addEventListener('click', function() {
        // console.log(1234);
          // 獲取:root元素
          const root = document.documentElement;
          
          // 檢查當前的顏色
          const currentColor = getComputedStyle(root).getPropertyValue('--home-main').trim();
          // const currentColor = getComputedStyle(root).getPropertyPriority("--pika--yellow");
          console.log("currentColor--->>" , currentColor);
          
          if (currentColor === 'var(--pika--yellow)') {
              // 如果當前是黃色，就改成藍色
              root.style.setProperty('var(--water--blue)');
          } else {
              // 如果當前是藍色，就改回黃色
              root.style.setProperty('var(--pika--yellow)');
          }
      }); */



  //手機版scroll觸發換寶可夢與顏色
  let touchstartX = 0;
  let touchendX = 0;
  const section1 = document.getElementById('section1')

  section1.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
  });

  section1.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchendX < touchstartX) {
      nextColor();
    }
    if (touchendX > touchstartX) {
      prevColor();
    }
  }

  // 電腦版按鈕點擊換寶可夢與顏色
  const colorChangeR = document.getElementById('colorChangeR');
  const colorChangeL = document.getElementById('colorChangeL');
  const animaiton = document.getElementById('bannerAnimaiton');
  let colorCount = 0

  // 獲取:root元素
  const root = document.documentElement;
  // const pikaYellow = getComputedStyle(root).getPropertyValue('--pika--yellow').trim();
  // const waterBlue = getComputedStyle(root).getPropertyValue('--water--blue').trim();
  // const fireOrange = getComputedStyle(root).getPropertyValue('--fire--orange').trim();
  // const grassLightGreen = getComputedStyle(root).getPropertyValue('--grass--lightGreen').trim();
  // const stoneGray = getComputedStyle(root).getPropertyValue('--stone--gray').trim();
  // const PsychicPink = getComputedStyle(root).getPropertyValue('--Psychic--pink').trim();

  //所有顏色組合
  let colorSet = {
    main: [
      'var(--pika--yellow)',
      'var(--water--blue)',
      'var(--fire--orange)',
      'var(--grass--lightGreen)',
      'var(--stone--gray)',
      'var(--Psychic--pink)',
    ],
    sub: [
      'var(--pika--red)',
      'var(--water--brown)',
      'var(--fire--green)',
      'var(--grass--darkGreen)',
      'var(--stone--brown)',
      'var(--Psychic--blue)',
    ]
  }

  //動畫的資料
  let animaitonData = {
    walk: [
      '/main/images/寶可夢動圖/皮卡丘/皮卡丘_走路.webm',
      '/main/images/寶可夢動圖/傑尼龜/傑尼龜_走路.webm',
      '/main/images/寶可夢動圖/小火龍/小火龍_走路.webm',
      '/main/images/寶可夢動圖/菊草葉/菊草葉_走路.webm',
      '/main/images/寶可夢動圖/小拳石/小拳石_走路.webm',
      '/main/images/寶可夢動圖/果然翁/果然翁_走路.webm',
    ],
    happy: [
      '/main/images/寶可夢動圖/皮卡丘/皮卡丘_開心.webm',
      '/main/images/寶可夢動圖/傑尼龜/傑尼龜_開心.webm',
      '/main/images/寶可夢動圖/小火龍/小火龍_開心.webm',
      '/main/images/寶可夢動圖/菊草葉/菊草葉_開心.webm',
      '/main/images/寶可夢動圖/小拳石/小拳石_開心.webm',
      '/main/images/寶可夢動圖/果然翁/果然翁_開心.webm',
    ]
  }

  //下一個顏色函式
  function nextColor() {
    if (event) event.preventDefault();

    //顏色計數器，每次點擊按鈕加一
    colorCount = (colorCount + 1) % colorSet.main.length;
    // console.log("colorCount---->>", colorCount, colorSet.main[colorCount]);
    // console.log( animaiton.attributes['src'].value );
    changeColor();
    changeAnimation()
  }
  //上一個顏色函式
  function prevColor() {
    if (event) event.preventDefault();

    //顏色計數器，每次點擊按鈕減一
    // colorCount =  colorCount <= 0 ? (-(colorCount - 1)) % colorSet.main.length : (colorCount - 1) % colorSet.main.length;
    // colorCount = (colorCount - 1) % colorSet.main.length;
    colorCount = (colorCount - 1 + colorSet.main.length) % colorSet.main.length;
    // console.log("colorCount---->>", colorCount, colorSet.main[colorCount]);
    changeColor();
    changeAnimation()

  }

  //改變顏色函式
  function changeColor() {
    // // 獲取當前的 --home-main 值
    // const homeMain = getComputedStyle(root).getPropertyValue('--home-main').trim();
    // // console.log("Current --home-main value:", homeMain);


    // switch (homeMain) {
    //   case pikaYellow:
    //     root.style.setProperty('--home-main', 'var(--water--blue)');
    //     break;
    //   case waterBlue:
    //     root.style.setProperty('--home-main', 'var(--fire--orange)');
    //     break;
    //   case fireOrange:
    //     root.style.setProperty('--home-main', 'var(--grass--lightGreen)');
    //     break;
    //   case grassLightGreen:
    //     root.style.setProperty('--home-main', 'var(--stone--gray)');
    //     break;
    //   case stoneGray:
    //     root.style.setProperty('--home-main', 'var(--Psychic--pink)');
    //     break;
    //   case PsychicPink:
    //     root.style.setProperty('--home-main', 'var(--pika--yellow)');
    //     break;
    //   default:
    //     root.style.setProperty('--home-main', 'var(--pika--yellow)');
    // }


    root.style.setProperty('--home-main', colorSet.main[colorCount]);
    root.style.setProperty('--home-sub', colorSet.sub[colorCount]);
  }

  function changeAnimation() {
    animaiton.setAttribute('src', animaitonData.walk[colorCount]);
    // requestAnimationFrame(() => {
    //   animaiton.setAttribute('src', animaitonData.walk[colorCount]);
    // });


    // animaiton.pause();  // 暫停當前影片
    // animaiton.removeAttribute('src');  // 移除 src 屬性
    // animaiton.load();  // 重置影片元素

    // // 使用 setTimeout 來延遲設置新的 src
    // setTimeout(() => {
    //   animaiton.setAttribute('src', animaitonData.walk[colorCount]);
    //   animaiton.play();  // 播放新影片
    // }, 0);
  }


  let isHappyPlaying = false;
  //當影片被點擊的時候替換成開心的影片
  function clickChangeAnimation() {
    animaiton.setAttribute('src', animaitonData.happy[colorCount]);


    // 如果現在是走路動畫就設定成開心動畫
/*     if (!isHappyPlaying) {
      // 設置 happy 動畫
      animaiton.setAttribute('src', animaitonData.happy[colorCount]);
      // animaiton.loop = false; // 關閉循環播放
      isHappyPlaying = true;

      // 監聽 timeupdate 事件
      animaiton.addEventListener('timeupdate', checkTime);

      // 開始播放
      animaiton.play();
    } */

  }


/* 
  //當開心影片播完以後跳回原本的影片
  let happyDuration = 0
  //取得目前影片長度
  animaiton.addEventListener('loadedmetadata', function () {
    happyDuration = animaiton.duration;
    console.log("Happy animation duration:", happyDuration);
  });

  function checkTime() {
    //  小於happy 動畫的動畫時間
    if (animaiton.currentTime >= happyDuration - 0.01) {
      // 移除 timeupdate 事件監聽器
      animaiton.removeEventListener('timeupdate', checkTime);

      // 設置 walk 動畫
      animaiton.setAttribute('src', animaitonData.walk[colorCount]);
      animaiton.loop = true; // 重新開啟循環播放
      isHappyPlaying = false;

      // 開始播放 walk 動畫
      animaiton.play();
    }
  }
 */


  //點擊影片執行換影片的函式
  animaiton.addEventListener('click', clickChangeAnimation)

  //當按鈕點擊時執行換顏色函式
  colorChangeR.addEventListener('click', nextColor)
  colorChangeL.addEventListener('click', prevColor)








  // ==============================
  // section2 快閃資訊
  // ==============================

  // >>>>>>快閃資訊內容變化按鈕<<<<<<

  // 更動的資料
  let infoData = {
    // 咖啡廳資料
    cafe: {
      title: 'cafe',
      tagChin: '咖啡廳',
      tagEng: 'cafe',
      date: '2024年7月1日(周一)',
      location: '新光三越信義新天地A4館 5 樓',
      address: '台北市信義區松高路19號',
      imgUrl: '/main/images/cafe_popup_map.jpg',
    },
    //快閃店更動資料
    store: {
      title: 'store',
      tagChin: '快閃店',
      tagEng: 'store',
      date: '2024年8月1日(周四)',
      location: '新光三越信義新天地A11館 3 樓',
      address: '台北市信義區松壽路11號',
      imgUrl: '/main/images/store_popup_map.jpg',
    }
  }

  //咖啡廳/快閃店按鈕切換，移除.switchActive在針對現在點擊的按鈕增加.switchActive
  $('#switchCafe').on('click', function () {
    $('.switch_button button').removeClass('switchActive')
    $(this).addClass('switchActive')
    changeInfo(infoData.cafe)
  })
  $('#switchStore').on('click', function () {
    $('.switch_button button').removeClass('switchActive')
    $(this).addClass('switchActive')
    changeInfo(infoData.store)
  })

  //改變資料內容函式
  function changeInfo(info) {
    // 內容更換
    // console.log(info.title);

    $('.card_title_text:first h6').text(info.title)
    $('.type_tag>h5').text(info.tagChin)
    $('.type_tag>h6').text(info.tagEng)
    $('.date_tag h5:first-child').text(info.date)
    $('.card_lg_detail h5').text(info.location)
    $('.card_lg_detail p').text(info.address)
    $('.card_lg_detail img').attr('src', info.imgUrl)
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
  const section3 = document.getElementById('section3')
  let rotateScrollStartX = 0;
  let rotateScrollEndX = 0;

  let rotateContain = document.querySelector('.rotate_card')
  let productItems = document.querySelectorAll('.carousel_item .product_card')
  const totalItems = productItems.length;
  let rotateIndex = 0


  productItems.forEach((item, idx) => {
    item.addEventListener('click', function () {
      // rotateIndex = idx
      // rotateContain.style.transform = `rotate(${-rotateIndex * 60}deg)`
      // // console.log(idx);

      // // 更新所有item的文字方向
      // productItems.forEach((i, index) => {
      //   i.style.transform = `translateX(-50%) rotate(${(index - rotateIndex) * -60}deg)`
      // })
      // rotateCard()


      //判斷是往左點還是往右點
      // if ((idx - rotateIndex + totalItems) % totalItems <= totalItems / 2) {
      // if ((idx - rotateIndex) % totalItems <= totalItems / 2) {
      // if (   Math.abs(( idx - (rotateIndex % totalItems ) )  % totalItems) <= totalItems / 2) {
      //   rotateIndex++;
      //   console.log('rotateIndex--!!!!>>>' , rotateIndex);
      //   console.log('idx-right-->>>' ,idx);
      //   console.log('==========>>>' ,  Math.abs(( idx - (rotateIndex % totalItems ) )  % totalItems)       )
      //   console.log('原本>>>' ,  (idx - rotateIndex + totalItems) % totalItems       )
      //   rotateCard()
      // } else {
      //   rotateIndex--;
      //   console.log('rotateIndex-left->>>' , rotateIndex);
      //   console.log('idx-left-->>>' ,idx);
      //   console.log('==========>>>' ,  Math.abs(( idx - (rotateIndex % totalItems ) )  % totalItems)       )
      //   console.log('原本>>>' ,  (idx - rotateIndex + totalItems) % totalItems       )
      //   rotateCard()
      // }



      //用於數計算現在的位置
      let currentPosition = rotateIndex % totalItems;
      //如果變負值的話，就加上卡片總數，讓currentPosition永遠是正的
      if (currentPosition < 0) currentPosition += totalItems;

      //順時針的時候的旋轉角度
      let clockwiseDiff = (idx - currentPosition + totalItems) % totalItems;
      //逆時針的時候的旋轉角度
      let counterclockwiseDiff = (currentPosition - idx + totalItems) % totalItems;

      //選擇較小的旋轉距離來決定旋轉方向，這樣可以保證總是選擇最短路徑
      if (clockwiseDiff < counterclockwiseDiff) {
        rotateIndex++
        console.log('右旋轉');
      } else {
        rotateIndex--
        console.log('左旋轉');
      }

      console.log('rotateIndex:', rotateIndex);
      console.log('idx:', idx);
      rotateCard();

    })



  })

  // >>>>>>scroll 360度旋轉滾動卡片<<<<<<
  section3.addEventListener('touchstart', e => {
    rotateScrollStartX = e.changedTouches[0].screenX;
  });

  section3.addEventListener('touchend', e => {
    rotateScrollEndX = e.changedTouches[0].screenX;
    scrollRotate();
  });

  function scrollRotate() {
    if (rotateScrollEndX < rotateScrollStartX) {
      rotateIndex++;
      console.log(rotateIndex);
      rotateCard()
    }
    if (rotateScrollEndX > rotateScrollStartX) {
      rotateIndex--;
      console.log(rotateIndex);
      rotateCard()
    }
  }

  //旋轉卡片的函式
  function rotateCard() {
    // 旋轉全部卡片
    rotateContain.style.transform = `rotate(${-rotateIndex * 60}deg)`
    // 更新所有item的文字方向，把歪掉的卡片轉正回來
    productItems.forEach((i, index) => {
      i.style.transform = `translateX(-50%) rotate(${(index - rotateIndex) * -60}deg)`
    })
  }








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
      // cardContain.scrollLeft += moveDistance
      cardContain.scrollTo({
        left: cardContain.scrollLeft + moveDistance,
        behavior: 'smooth'
      });

      moveCard()
    }
  }

  // 按上一個按鈕會執行的function
  function showPrevCard() {
    // console.log("上一個");
    // console.log("moveDistance==>", moveDistance);
    // console.log("cardWidth==>", cardWidth);
    // console.log("cardGap==>", cardGap);

    if (currentIndex > 0) {
      currentIndex--;
      // cardContain.scrollLeft -= moveDistance
      cardContain.scrollTo({
        left: cardContain.scrollLeft - moveDistance,
        behavior: 'smooth'
      });
      moveCard()
    }
  }

  // 計算移動距離
  let cardWidth = menuCardAll[0].offsetWidth;
  let cardGap = parseInt(window.getComputedStyle(menuCardAll[0]).gap);
  let moveDistance = cardWidth + cardGap;


  // 移動每個卡片
  function moveCard() {
    // cardContain.scrollLeft += moveDistance

    menuCardAll.forEach((card, index) => {
      // console.log(index);
      // console.log(card);


      // 設定移動距離css
      // card.style.transform = `translateX(${(currentIndex) * -moveDistance}px)`;

      //scroll取消漸變消失
      menuCardAll.forEach((card, index) => {
        card.style.opacity = `1`;
      })

      // 當在第一個的時候往前的按鈕消失
      currentIndex === 0 ? menuPrev.style.visibility = "hidden" : menuPrev.style.visibility = "visible";
      // 當在第一個的時候往後的按鈕消失
      currentIndex === menuCardAll.length - 1 ? menuNext.style.visibility = "hidden" : menuNext.style.visibility = "visible";

    })
  }

  //如果有滾動的話就回復成原本的opacity和按鈕顯示
  cardContain.addEventListener('scroll', function () {
    // console.log("scroll");
    //scroll取消漸變消失
    menuCardAll.forEach((card, index) => {
      card.style.opacity = `1`;
    })
    menuPrev.style.visibility = "visible"
  })

  //每次載入都先執行一次，讓opacity可以變化
  moveCard()
  // 設定左至右漸變消失的css
  menuCardAll.forEach((card, index) => {
    card.style.opacity = `${(((currentIndex - index + 0.2) * 0.5) + 1)}`;
  })


}
