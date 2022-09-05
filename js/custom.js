if (jQuery.browser.mobile == true) {
    // console.log("mobile");
    location.href="./mobile/"
  }

  $(function(){
    /*
     1.변수선언
     */
    var visualWrap=$(".brandVisual"),slide=visualWrap.find(".visual_slide>li"),
    slideCount=slide.length,
    stopTimer,
    leftBtn=visualWrap.find(".btnImg>.prev"),
    rightBtn=visualWrap.find(".btnImg>.next"),
    pager=visualWrap.find(".buttonList>li"),
    current=0;
    //현재보여지고 있는 인덱스번호를 가지고 있고 current여러 함수를 쓰기위해 공유할 그릇으로 적어준거임!
    
    /* 
    2.슬라이드 위치설정
    */
   console.log("slide")
   var slidePos=slide.each(function(i){
    //여러개 중에서 값을 꺼내서 사용할 수 있다.
    //기본값이 px이라서 뒤에 %붙인다
    $(this).css("left",i*100+"%")
   });
   /*
   슬라이드 이미지부분-setinterval
   자동실행함수
   */

  //timer 지정된 시간마다 일을 하는애
  //시간마다 i를 더하는 일은 아래애가 한다.
  /* autoplay */
  timer();
   function timer(){
    //var timer;
    //timer=setInterval(할일,시간) 을 멈추려면 이름을 붙여아함(변수지정하듯이!)
    //clearInterval(이름)
    stopTimer=setInterval(function(){
        //슬라이드 0이라는 의미 
        var prev=slide.eq(current)//0
        // console.log(prev)//0만 계속찍힘
        var prevPager=pager.eq(current);
        move(prev,0,"-100%")
        prevPager.removeClass("on");
        current++;//인덱스번호 더하기 //1
        if(current==slideCount){
            current=0
        }
        var next=slide.eq(current);//1
        move(next,"100%","0%");
        var nextPager=pager.eq(current);
        nextPager.addClass("on");
    },3000)
   }
   
/*
움직이는 함수 
*///move:왼쪽에서 오른쪽에서 배달해주는 역활만함
//한글사용되나,아무도안씀
//대상 tg/ 출발 start/ 도착 end

/* 슬라이드 애니메이트*/
function move(tg,start,end){
    //animate제이쿼리에서 제공하는 함수
    tg.css("left",start).stop().animate({left:end},1000)
}

/* 
마우스오버시 슬라이드정지
*/
visualWrap.hover(
    function(){
        // console.log('init');
        $(this).addClass('on')
        clearInterval(stopTimer);
    },
    //요소가 마우스 밖으로 나왔을때
    function(){
        // console.log('ououo')
        $(this).removeClass('on');
        timer();
    }
)
/* 좌우버튼추가 UI*/
rightBtn.click(function(){
    var prev=slide.eq(current)//0
    // console.log(prev)//0만 계속찍힘
    move(prev,0,"-100%");
    var prevPager=pager.eq(current);
    prevPager.removeClass("on");
 
    current++;
    if(current==slideCount){
        current=0;
    }

    var next=slide.eq(current);
    move(next,"100%","0%");
    var nextPager=pager.eq(current);
    nextPager.addClass("on");

})

leftBtn.click(function(){
      //슬라이드 0이라는 의미 
      var prev=slide.eq(current)//0
      move(prev,0,"100%")//slide.eq(0),0,100%
      var prevPager=pager.eq(current);
      prevPager.removeClass("on");
      current--;
      if(current<0){
          current=slideCount-1;//인덱스번호보다 큰거라서 -1적어야함
      }
      var next=slide.eq(current);//2
      move(next,"-100%","0%");
      var nextPager=pager.eq(current);
      nextPager.addClass("on");
})


/* 카운터 동적생성 */
var counterEl="<div class='counter'>1";
$("#wrap").append(counterEl);//append:추가하다라는뜻


});//jQuray



