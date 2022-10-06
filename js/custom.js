if (jQuery.browser.mobile == true) {
  // console.log("mobile");
  location.href = "./mobile/";
}

$(function () {
  /*
     1.변수선언
     */
  var visualWrap = $(".brandVisual"),
    slide = visualWrap.find(".visual_slide>li"),
    slideCount = slide.length,
    stopTimer,
    leftBtn = visualWrap.find(".btnImg>.prev"),
    rightBtn = visualWrap.find(".btnImg>.next"),
    pager = visualWrap.find(".buttonList>li"),
    current = 0;
  //현재보여지고 있는 인덱스번호를 가지고 있고 current여러 함수를 쓰기위해 공유할 그릇으로 적어준거임!

  /* 
    2.슬라이드 위치설정
    */
  var slidePos = slide.each(function (i) {
    $(this).css("left", i * 100 + "%");
  });
  /* autoplay */
  timer();

  function timer() {
    stopTimer = setInterval(function () {
      var prev = slide.eq(current); //0
      var prevPager = pager.eq(current);
      move(prev, 0, "-100%");
      prevPager.removeClass("on");
      current++;
      if (current == slideCount) {
        current = 0;
      }
      var next = slide.eq(current); //1
      move(next, "100%", "0%");
      var nextPager = pager.eq(current);
      nextPager.addClass("on");
      cnt(current);
    }, 3000);
  }

  /*
움직이는 함수 
*/ //move:왼쪽에서 오른쪽에서 배달해주는 역활만함
  //한글사용되나,아무도안씀
  //대상 tg/ 출발 start/ 도착 end

  /* 슬라이드 애니메이트*/
  function move(tg, start, end) {
    //animate제이쿼리에서 제공하는 함수
    tg.css("left", start).stop().animate({ left: end }, 1000);
  }

  /* 좌우버튼추가 UI*/
  rightBtn.click(function () {
    var prev = slide.eq(current); //0
    // console.log(prev)//0만 계속찍힘
    move(prev, 0, "-100%");
    var prevPager = pager.eq(current);
    prevPager.removeClass("on");

    current++;
    if (current == slideCount) {
      current = 0;
    }

    var next = slide.eq(current);
    move(next, "100%", "0%");
    var nextPager = pager.eq(current);
    nextPager.addClass("on");
  });

  leftBtn.click(function () {
    //슬라이드 0이라는 의미
    var prev = slide.eq(current); //0
    move(prev, 0, "100%"); //slide.eq(0),0,100%
    var prevPager = pager.eq(current);
    prevPager.removeClass("on");
    current--;
    if (current < 0) {
      current = slideCount - 1; //인덱스번호보다 큰거라서 -1적어야함
    }
    var next = slide.eq(current); //2
    move(next, "-100%", "0%");
    var nextPager = pager.eq(current);
    nextPager.addClass("on");
  });

  /* 카운터 동적생성 */
  var counterEl = "<span class='counter'>1";
  $("#banner").append(counterEl);
  var counter = $(".counter");
  function cnt(num) {
    counter.html(num + 1);
  }
}); //jQuray

// 탑버튼
function getWinWidthBottom() {
  return $(window).outerWidth();
}

$(".quickWrap").bind("click", function () {
  if (getWinWidthBottom() <= 820) {
    $("html, body").animate({ scrollTop: 0 }, 400);
    return false;
  } else {
    $.fn.fullpage.moveTo("page0", 0);
  }
});

//스크롤기능 설정
function setMainFullPag() {
  // //모바일 크기에서는 동작무처리
  // if (getWinWidth() < 819) {
  //   return false;
  // }
  $("#main").fullpage({
    anchors: [
      "page0",
      "page1",
      "page2",
      "page3",
      "page4",
      "page5",
      "page6",
      "page7",
      "page8",
    ],
    autoScrolling: true,
    scrollHorizontally: true,
    onLeave: function (origin, destination, direction) {
      $("#gnb ul").removeClass("active");
      $("#gnb ul").eq(destination.index).addClass("active");
    },
  });
}
$("#nav > li > a").on("click", function () {
  //if($("#RestWrap").css("display") === "none") {
  var index = $("#nav > li > a > h2").index(this);
  $.fn.fullpage.moveTo("page" + index, 0);
  //}
});
$(function () {
  setMainFullPag();
  setMainSlider();
  /* 		if(getWinWidth() > 820) {
      $.fn.fullpage.setMouseWheelScrolling(false);
      $.fn.fullpage.setAllowScrolling(false);
  } */
  goSearchCal("Y");
});
