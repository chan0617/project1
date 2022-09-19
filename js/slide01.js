var slideWrapper = $('.slide_wrapper'),
slides = slideWrapper.find('.slides'),
    slide = slides.find('li'),
    currentIdx = 0,
    slideCount = slide.length,
    slideWidth = slide.width(),
    slideGap = 50,
    moveAmt, // slideWidth+slideGap 움직일 너비
    prevBtn = slideWrapper.find('.prev'),
    nextBtn = slideWrapper.find('.next'),

    // =====내가적은부분!
    stopBtn=slideWrapper.find('.stop'),
    statsBtn=slideWrapper.find('.stats'),
     // =====여기까지


    indicator = $('.pager'),
    newSlideWidth, 
    indicatorHTML = '',
    responsiveGap=20,
    maxSlides=1,//한번에 보이는 최대갯수
    newSlides;//clone 된 요소를 담을 변수

    newSlideWidth=slideWidth;




    // indicator 추가
slide.each(function(i){
    indicatorHTML+='<a href="#">'+(i+1)+'</a>'
    // indicatorHTML+='<a href="#">'+(i+1)+'</a>' -> 1 2 3 4 5 다 나옴 / += : 값이 하나씩 더해진다.
    // indicatorHTML='<a href="#">'+(i+1)+'</a>' -> 5만 나옴 / = : 재할당한다.
})
indicator.html(indicatorHTML)

    // 복사본 생성
    // append : 원본 뒤 추가 / clone : 복사 / prepend : 원본 앞에 추가
slides.append(slide.clone().addClass("clone"));
slides.prepend(slide.clone().addClass("clone"));
    // 가로 배치
function slideLayout(sw,sm){
    newSlides=$('.slide_wrapper li')
    moveAmt=sw+sm
    newSlides.each(function(idx){
        $(this).css({"left":moveAmt*idx+"px",width:sw+"px"});
    });
}
slideLayout(slideWidth,slideGap);

    // 슬라이드 이동함수
function MoveSlide(num){
    slides.stop().animate({left:moveAmt*-num},100,function(){
        if(currentIdx==slideCount || currentIdx == -slideCount){
            slides.css('left',0)
            currentIdx=0;
        }
    });
    currentIdx=num;
}

    // 좌우버튼
nextBtn.click(function(){
        MoveSlide(currentIdx+1)
})
prevBtn.click(function(){
        MoveSlide(currentIdx-1)
})

    // 중앙배치
function setslidePos(){
    var ulMoveAmt= - moveAmt*slideCount + 'px';
    slides.css('transform',"translateX("+ ulMoveAmt+")")
}
setslidePos()

    //인디케이터
indicator.find('a').click(function(){
    var ci=$(this).index()
    MoveSlide(ci)
})
    // 자동슬라이드
var timer=undefined
function autoSlide(){
    if(timer==undefined){
        timer=setInterval(function(){
            MoveSlide(currentIdx+1)
        },3000)
    }
}
autoSlide()
function stopSlide(){
    clearInterval(timer)
    timer=undefined
}
//마우스대면 멈춤
// slideWrapper.mouseenter(function(){
//     stopSlide()
// })
// slideWrapper.mouseleave(function(){
//     autoSlide()
// })

// 멈추기버튼
stopBtn.click(function(){
        stopSlide()
})
statsBtn.click(function(){
    autoSlide()
})

//반응형슬라이드
$(window).resize(function(){
    // console.log('window의 너비는'+$(this).width());
    var winWidth=$(this).width();
    if(winWidth<700){//700보다 폭이 작으면!
        responsiveGap=20;
        newSlideWidth=(slides.width()-responsiveGap*(maxSlides-1))/maxSlides; 
        //slides.width()=660-responsiveGap=20*(maxSlides=2-1) /maxSlides=3; 
        //660-20*2(갭이2개라서 -1를 한거임) 520/3
        //슬라이드 하나의 너비를 재계산
    }else{
        newSlideWidth=slideWidth;//재계산하지않고 원래너비를 재할당
        responsiveGap=slideGap;
    }
    if(winWidth<=500){
        maxSlides=1;
        newSlideWidth=slides.width();
        responsiveGap=0;//위에 통으로 다쓰겠다는 소리임
    }
    slideLayout(newSlideWidth,responsiveGap);
    setslidePos();//리사이징될때마다 한번씩 적어줘야한다
});

