// $(function () {
//   const $indicator = $(".footer_banner>footer_container>footer_wrapper>li>a");
//   const $container = $(".footer_slides");
//   const $btnNext = $(".f_left");
//   const $btnPrev = $(".f_right");
//   const $btnStats = $(".f_stats");
//   const $btnPause = $(".f_pause");

//   let nowIdx = 0;

//   //활성화,컨테이너이동 함수 선언!!
//   function moveFn() {
//     //활성화표시 on
//     $indicator.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");

//     //컨테이너 이동
//     $container.stop().animate({ left: -400 * nowIdx }, 400, "easeInOutCubic");
//   }

//   $indicator.on("click", function (evt) {
//     nowIdx = $indicator.index(this);

//     moveFn();
//     evt.preventDefault();
//   });

//   //indicator를 눌렀을 때는 해당 a에 클래스를 옮겨주면 되고,
//   //이전,다음 버튼은 indicator식을 이용해 index를 증감시켜주면 된다.

//   $btnNext.on("click", function (evt) {
//     if (nowIdx <= 3) {
//       nowIdx++;
//     } else {
//       nowIdx = 0;
//     }

//     moveFn();
//     evt.preventDefault();
//   });

//   $btnPrev.on("click", function (evt) {
//     if (nowIdx >= 1) {
//       //1보다 같거나 크다 = 1~4
//       nowIdx--;
//     } else {
//       //0
//       nowIdx = 4;
//     }

//     moveFn();
//     evt.preventDefault();
//   });
//   $btnStats.on("click", function (evt) {
//     if (nowIdx >= 1) {
//       //1보다 같거나 크다 = 1~4
//       nowIdx--;
//     } else {
//       //0
//       nowIdx = 4;
//     }

//     moveFn();
//     evt.preventDefault();
//   });

//   $btnPause.on("click", function (evt) {
//     if (nowIdx >= 1) {
//       //1보다 같거나 크다 = 1~4
//       nowIdx--;
//     } else {
//       //0
//       nowIdx = 4;
//     }

//     moveFn();
//     evt.preventDefault();
//   });

//   //슬라이드 자동실행 = 시간간격 설정
//   interverID = setInterval(function () {
//     if (nowIdx <= 3) {
//       nowIdx++;
//     } else {
//       nowIdx = 0;
//     }

//     moveFn();
//   }, 2000); //2초간격으로 슬라이드 이동
// });

// ========================
$(".slideBt").on("click", function () {
  slideFunc($(this).attr("id"));
});

let pause = 0;
$(".slidePause").on("click", function () {
  if (pause == 0) {
    $(".slidePause").text("auto");
    pause++;
  } else if (pause == 1) {
    $(".slidePause").text("pause");
    AutoSlideFunc();
    pause--;
  }
});

function AutoSlideFunc() {
  let AutoSlide = setInterval(function () {
    $(".slide").stop();
    $(".slide").animate({ left: "-=100%" }, function () {
      $(".slide").css({ left: "0" });
      $(".slide").find(":first").insertAfter($(".slide").find(":last"));
    });
    if (pause == 1) {
      clearInterval(AutoSlide);
    }
  }, 2000);
}
AutoSlideFunc();

function slideFunc(t) {
  if (t == "next") {
    $(".slide").stop();
    $(".slide").animate({ left: "-=100%" }, function () {
      $(".slide").css({ left: "0" },background,"url(images/linkBtn_l.png)", cursor,"pointer");
      $(".slide").find(":first").insertAfter($(".slide").find(":last"));
    });
  } else if (t == "prev") {
    $(".slide").stop();
    $(".slide").find(":last").insertBefore($(".slide").find(":first"));
    $(".slide").css({ left: "-100%" },background,"url(images/linkBtn_r.png)",cursor,"pointer");
    $(".slide").animate({ left: "+=100%" });
  }
  return;
}
