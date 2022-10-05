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
