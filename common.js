/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 https://gist.github.com/arturmamedov/362a28a416adcde52bbd79b17a1860e3
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|android|ipad|playbook|silk|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);



var $win = $(window),
	htmlclass = $("html").prop("class"),
	$wrap = $("#wrap"),
	$header = $("#header",$wrap),
	$gnb_area = $(".gnb_area", $header),
	$location = $(".location",$wrap),			//sub nav 사용
    sitemapStr = $("ul.gnb", $gnb_area).html(), //전체메뉴 내용

	isVrOpen = false;

if(htmlclass.match("ie")) {
	if(htmlclass.match("ie9")) {
		$("html").addClass("oldIE");
	} else {
		$("html").addClass("very-oldIE");
	}
}

jQuery.fn.pageInit = function(arg) {
	page = jQuery.extend({
		hn : "",
		sn : ""
	}, arg || {});
	var convertObj = function(obj) {
		$.each(obj, function(key, val) {
			if(val == "") {
				var value = -1;
			} else {
				var value = Number(val);
			}
			eval("obj." + key+"=" + value);
		});
	}
	convertObj(arg);
	if(window.console){console.log(arg)};

	// gnb_area 1차, 2차뎁스 메뉴 on
	$("ul.gnb", $gnb_area).find("> li.hn" + page.hn).addClass("on").find("> dl > dt.hn" + page.hn + " > a").addClass("on");
	$("ul.gnb", $gnb_area).find("> li.hn" + page.hn).addClass("on").find("> dl > dd.sn" + page.sn + " > a").addClass("on");

	//탭메뉴 페이지인식
	$(".subtab_area .tab li.cn" + page.cn).addClass("on");

    // 전체메뉴보기
    $(".allmenu_content ul.gnb").html(sitemapStr);

    $('.allmenu_btn').on('click',function(){
		$(this).hide();
		$(".allmenu_btn_close").show();
        $(".allmenu_area").slideToggle(300);    //슬라이딩효과
//        $(".allmenu_area").fadeIn(300);       //페이드효과
	});
    $('.allmenu_btn_close').on('click',function(){  //닫기버튼만 닫힘
        $(".allmenu_btn").show();
        $(".allmenu_area").slideUp(300);        //슬라이딩
//        $(".allmenu_area").fadeOut(300);      //페이드효과
    });

//	$(document).on("click",function(e){          //닫기버튼+배경클릭 닫힘
//		var target = $(e.target);
//		var chkSearch = target.parents(".allmenu_btn").length;
//		if(chkSearch == 0){
//			$(".allmenu_btn").show();
//			$(".allmenu_btn_close").hide();
//			$(".allmenu_area").slideUp(300);
//		}
//	});


	//서브 네비 셀렉트박스
	if($location.length) {
		var $depth1 = $(".depth1", $location),
			$depth2 = $(".depth2", $location),
			navItem_d1 = $gnb_area.find(".gnb > li > dl > dt"),
			navItem_d2 = $gnb_area.find(".gnb > li.hn" + page.hn + " > dl > dd"),
			navItem_d1Sel = $("> a.sel", $depth1),
			navItem_d2Sel = $("> a.sel", $depth2),
			navItem_d1Con = $("> ul", $depth1),
			navItem_d2Con = $("> ul", $depth2),
			d1Str = "",
			d2Str = "";
		navItem_d1.each(function() {
			d1Str += "<li class=\"" + $(this).attr("class") + "\">" + $(this).html() + "</li>";
			if($(this).attr("class").replace("hn", "") == page.hn) {
				navItem_d1Sel.html($(this).find("a").html());
			}
		});
		navItem_d2.each(function() {
			d2Str += "<li class=\"" + $(this).attr("class") + "\">" + $(this).html() + "</li>";
			if($(this).attr("class").replace("sn", "") == page.sn) {
				navItem_d2Sel.html($(this).find("a").html());
			}
		});
		navItem_d1Con.html(d1Str);
		navItem_d2Con.html(d2Str);
		navItem_d1Sel.on("click", function() {
            if($(this).parent().hasClass('on')){
       			  $(this).parent().removeClass('on').find('ul').slideUp(200);
   		    }else{
   			      $(this).parent().addClass('on').find('ul').slideDown(200);
   		    }
//			navItem_d1Con.toggleClass("on");//간단 on
			return false;
		});
		navItem_d2Sel.on("click", function() {
            if($(this).parent().hasClass('on')){
   			      $(this).parent().removeClass('on').find('ul').slideUp(200);
   		    }else{
   			      $(this).parent().addClass('on').find('ul').slideDown(200);
   		    }
//			navItem_d2Con.toggleClass("on");//간단 on
			return false;
		});
	}

	//gnb_area메뉴 오버
	if(!jQuery.browser.mobile) {
//		$header.on("mouseenter", function(){  	//header 전체배경 마우스 활성
		$gnb_area.on("mouseenter", function(){	//gnb 배경 마우스 활성
			//$header.stop().animate({
            $("#header .inner .gnb_area .gnb li dl dd a").stop().animate({
				"height":"250px"
			});
		}).on("mouseleave", function(){
			$header.stop().animate({
				"height":"100px"
			});
		});
	} else {
		$header.data("isOpen", false);
		$("ul.gnb > li > dl > dt > a").on("click", function() {
			if($header.data("isOpen") == "undifined" || $header.data("isOpen") == null || $header.data("isOpen") == "" || $header.data("isOpen") == false) {
				$header.data("isOpen", true);
				$header.css("height", "250px");
			} else {
				$header.data("isOpen", false);
				$header.css("height", "100px");
			}
			return false;
		});
	}


	// 패밀리사이트
	$('.familysite_area > a').on('click',function(e){
		 e.preventDefault();
		 if($(this).parent().hasClass('on')){
			 $(this).parent().removeClass('on').find('ul').slideUp(200);
		 }else{
			 $(this).parent().addClass('on').find('ul').slideDown(200);
		 }
	});
	$('.familysite_area > ul > li > a').bind('click',function(e){
		 e.preventDefault();
		 window.open($(this).attr("href"), '_blank');
	});


    //스크롤상단버튼
    $('.btn_scrolltop').on('click',function(){
    	$("html,body").animate({"scrollTop":"0"});
    	return false;
    });
    function btnTop(){
    	var scrollTop = $(window).scrollTop();
    	if(scrollTop > 100){
    		$(".btn_scrolltop").stop().show().animate({"opacity":"1"},100);
    	}else{
    		$(".btn_scrolltop").stop().animate({"opacity":"0"},100,function(){ $(".btn_scrolltop").hide(); });
    	}
    }
    btnTop();
    $(window).scroll(function(){ btnTop(); });

    //상단버튼
    $('.btn_top').on('click',function(){
    	$("html,body").animate({"scrollTop":"0"});
    	return false;
    });

    // 아코디언
    var $accordion = $("dl.accordion > dt");
    $('dl.accordion dd').hide();
    $('dl.accordion > dt.open').nextUntil($accordion).slideDown('300'); //slideDown or show
    $accordion.click(function() {
        $accordion.not(this).removeClass('open');
        $(this).toggleClass('open');
        $accordion.not(this).nextUntil($accordion).slideUp('300'); //slideUp or hide
        $(this).nextUntil($accordion).slideToggle('300');
    });

    //탭메뉴 내용
    $(".tab_area ul li").click(function(){
        $(".tab_area ul li").removeClass('on');
        $(".tab_area .conBox").removeClass('on');
        $(this).addClass('on').fadeIn();
        $("#" + $(this).data('id')).addClass('on');
    });

    // 레이어팝업 여러개 사용
    $(".pop_area .dim_bg, .pop_area").hide();
    function pop_position(pposition){
        var $pposition = $(".pop_con");
        if ($pposition.outerHeight() < $(document).height() || $pposition.outerWidth() < $(document).width()) {
          $pposition.css({marginTop: -$pposition.outerHeight() / 2, marginLeft: -$pposition.outerWidth() / 2 })
        } else {
          $pposition.css({top: 0, left: 0});
        }
    };

    function pop_open(no){
        $(".pop_area[popno="+no+"]").fadeIn();
        $(".pop_area .dim_bg").fadeIn();
        pop_position();
        //레이어 영역 외 바탕화면 클릭시 화면 닫기
        $(".pop_area .dim_bg").click(function (e) {
            if(!$(".pop_area .dim_bg").has(e.target).length){
              pop_close();
            };
        });
    };

    function pop_close(){
        $(".pop_area, .pop_area .dim_bg").fadeOut();
    };
    //링크 클릭시 해당 레이어팝업 호출
    $(".pop_btn").click(function () {
        var no = $(this).attr("popno");
        pop_open(no);
    });

    $(".pop_btn_close").click(function () {
        pop_close();
    });
    //반응형 대응 - 레이어 위치 잡기
    $(window).resize(function () {
        pop_position();
    });

}


// 탭메뉴 fixed
jQuery.fn.tabFix = function() {
	return this.each(function() {
		var $this = $(this),
			thisOffsetT = $this.offset().top,
			thisPositionT = $this.position().top,
			$win = $(window);
//		$(".contents").addClass("on");
		$win.on("scroll", function() {
			var sTop = $win.scrollTop();
			if(sTop > thisOffsetT){
				$this.css({
					"position":"fixed",
					"top" : "0"
				});
			} else {
				$this.css({
					"position":"absolute",
					"top" : thisPositionT + "px"
				});
			}
		});
	});
}
jQuery(".subtab_area").tabFix();
