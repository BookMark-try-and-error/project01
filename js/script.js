$(function(){
	var setWrap = $('.container'),
	setBase = $('.stageBase'), // スクロールした時の高さを計算。
	setBasePc = $('.pcUser .stageBase'),
	setBaseSp = $('.spUser .stageBase'),
	setMenuPc = $('.pcUser .menuWrap'),
	setMenuSp = $('.spUser .menuWrap'),
	scrollSpeed = 1000,
	scrollEasing = 'swing',
	slideSpeed = 500,
	slideEasing = 'linear',
	downBtn = 'hide', // 'show' or 'hide'
	urlHash = 'on', // 'on' or 'off'
	setHash = '!page',
	// 固定メニュー定義
	menuList = [
		// 左メニュー
		'TOP',
		'ARTISTS',
		'TALK SHOW',
		'LIVE',
		// 右メニュー
		'DJ',
		'TIME TABLE',
		'SPONSER',
		'CONTACT'
	],
	menuListActive = [
		// 左メニュー
		'トップ',
		'アーティスト',
		'トークショウ',
		'ライヴ',
		// 右メニュー
		'ディスクジョッキー',
		'タイムテーブル',
		'スポンサー',
		'コンタクト'
	];

	//ユーザーエージェント切り替え実装前のテスト用の変数
	// var uA = '',
	// 		//uA = 'pc';
	// 		//uA = 'tb';
	// 		uA = 'sp';



	var url = document.URL,
	stageSlide = $('.stageSlide');
	/**************************************************
	   画面サイズ
	**************************************************/
	var userAgent = navigator.userAgent,
	root = $('body');

		if (userAgent.indexOf('iPhone') > 0 ||
			userAgent.indexOf('Android') > 0 ||
			userAgent.indexOf('BlackBerry') > 0 ||
			userAgent.indexOf('windows Phone') > 0) {
			var uA = 'sp';
			$('.spUser').css('display', 'block');
		} else if (userAgent.indexOf('iPad') > 0) {
			var uA = 'tb';
			$('.tbUser').css('display', 'block');
		} else if (userAgent.indexOf('Mac') > 0 || ua.indexOf('windows') > 0) {
			var uA = 'pc';
			$('.pcUser').css('display', 'block');
		}

	console.log(userAgent);
	/**************************************************
	   固定メニュー
	**************************************************/
	/******PCの処理*****/
	if (uA == 'pc') {
		setMenuPc.append('<nav id="pageNavLeft" class="pageNav clearfix"><ul></ul></nav>');
		setMenuPc.append('<nav id="pageNavRight" class="pageNav clearfix"><ul></ul></nav>');
		// PCのsection(ページ数)数分メニューを追加
		setBasePc.each(function(i){
			if (i < 4) {
				// 左メニュー
				$('#pageNavLeft ul').append('<li class="pagePn'+(i+1)+'"><div class="li_left clearfix"><p class="bor_left"></p></div><div class="li_right  right_slide clearfix"><span class="left_slide"></span><a href="javascript:void(0);">'+(menuList[i])+'</a></div></li>');
			} else {
				// 右メニュー
				$('#pageNavRight ul').append('<li class="pagePn'+(i+1)+'"><div class="li_left clearfix"><span class="right_slide"></span><a href="javascript:void(0);">'+(menuList[i])+'</a></div><div class="li_right  left_slide clearfix"><p class="bor_right"></p></div></li>');
			}
		});
	/******SPの処理*****/
	} else if (uA == 'sp') {
		setMenuSp.append('<nav class="pageNav clearfix"><ul></ul></nav>');
		// SPのsection(ページ数)数分メニューを追加
		setBaseSp.each(function(i){
			$('.spUser .pageNav ul').append('<li class="pagePn'+(i+1)+'"><a href="javascript:void(0);">'+(menuList[i])+'</a></div></li>');
		});
	} // if (uA == 'pc') end

	/**************************************************
	   ハンバーガーメニュー
	**************************************************/
	/******SPの処理*****/
	$('.hamMenuBox').on('click', function(){
		$('.hamMenuCont').toggleClass('active');
		$('.containerMenu').toggleClass('on');
	});
	/**************************************************
	   artists list
	**************************************************/
	/******SPの処理*****/
	var dis = '70';
	$('.list_show').on('click', function(){
		$('.list_show, .list_box').animate({
			'margin-left':'+=' + dis + 'vw'}, 200);
			dis *= -1;
	});





	if(downBtn == 'show'){
		setWrap.append('<div id="pageDown"><a href="javascript:void(0);"></a></div>');
	}

	var coreNav = $('.containerMenu'),
	setNav = coreNav.find('section'),
	navList = setNav.find('li'),
	navLength = navList.length;

	// メニューの先頭にactiveStageクラスを追加
	setNav.find('li:first').addClass('activeStage');
	/******PCの処理*****/
	if (uA == 'pc') {
		$('.activeStage a').text(menuListActive[0]);
	}
	$('body').attr('data-page','1');

	$(window).load(function(){
		// StageHeight
		$(window).resize(function(){
			var wdHeight = $(window).height();
			setBase.css({height:wdHeight});

			var resizeContTop = parseInt(setWrap.css('top'));

			if(resizeContTop === 0){
				setWrap.css({top:'0'});
			} else {
				var activeStagePos = setNav.find('li.activeStage');
				activeStagePos.each(function(){
					var posIndex = navList.index(this);
					setWrap.css({top:-(wdHeight*posIndex)});
				});
			}

			/**************************************************
			   メニューの表示位置
			**************************************************/
			coreNav.each(function(){
				var navHeight = $(this).height();
				$(this).css({top:((wdHeight)-(navHeight))/2});
			});

		}).resize();

		// StageSlide
		stageSlide.each(function(){
			var thisSlide = $(this),
			chdPanel = thisSlide.find('.slidePanel'),
			chdPanelLength = chdPanel.length;

			chdPanel.eq('0').addClass('activePanel').end().wrapAll('<div class="slideWrap"></div>');
			thisSlide.append('<a href="javascript:void(0);" class="sdPrev"></a><a href="javascript:void(0);" class="sdNext"></a><div class="slideNav"></div>');

			var thisWrap = thisSlide.find('.slideWrap'),
			thisPrev = thisSlide.find('.sdPrev'),
			thisNext = thisSlide.find('.sdNext'),
			thisPn = thisSlide.find('.slideNav');

			chdPanel.each(function(i){
				thisPn.append('<a href="javascript:void(0);" class="slidePn'+(i+1)+'"></a>');
			});

			var pnPoint = thisPn.find('a'),
			pnFirst = thisPn.find('a:first'),
			pnLast = thisPn.find('a:last'),
			pnCount = thisPn.find('a').length;

			pnFirst.addClass('pnActive');

			pnPoint.click(function(){
				var pnNum = pnPoint.index(this),
				mvWidth = chdPanel.width(),
				wpWidth = thisWrap.width(),
				moveLeft = mvWidth*pnNum;
				thisWrap.stop().animate({left: -(moveLeft)},slideSpeed,slideEasing);
				pnPoint.removeClass('pnActive');
				$(this).addClass('pnActive');
				pnAcvCheck();
			});

			thisPrev.click(function(){
				thisWrap.not(':animated').each(function(){
					thisPn.find('.pnActive').prev().click();
					pnAcvCheck();
				});
			});

			thisNext.click(function(){
				thisWrap.not(':animated').each(function(){
					thisPn.find('.pnActive').next().click();
					pnAcvCheck();
				});
			});

			function pnAcvCheck(){
				var pnAcvNum = thisPn.find('.pnActive');
				pnAcvNum.each(function(){
					var acvIndex = pnPoint.index(this);
					acvCount = acvIndex+1;
					if(1 == acvCount){
						thisPrev.css({display:'none'});
						thisNext.css({display:'block'});
					} else if(pnCount == acvCount){
						thisPrev.css({display:'block'});
						thisNext.css({display:'none'});
					} else {
						thisPrev.css({display:'block'});
						thisNext.css({display:'block'});
					}
					chdPanel.removeClass('activePanel').eq(acvIndex).addClass('activePanel');
				});
			}
			pnAcvCheck();

			$(window).resize(function(){
				var setWrapLeft = parseInt(thisWrap.css('left')),
				setPanelWidth = chdPanel.width(),
				setLeft = setWrapLeft / setPanelWidth;

				var sdWidth = $(window).width(),
				sdHeight = $(window).height();
				thisSlide.css({width:sdWidth,height:sdHeight});
				thisWrap.css({width:(sdWidth*chdPanelLength),height:sdHeight});
				chdPanel.css({width:sdWidth,height:sdHeight});

				var setWidth = chdPanel.width(),
				adjLeft = setWidth * setLeft;
				thisWrap.css({left:(adjLeft)});
			}).resize();

			var thisInt = thisWrap.find('.slideInitial');
			thisInt.each(function(){
				var pnlInt = thisWrap.find('.slideInitial');
				pnlInt.each(function(){
					var intIndex = chdPanel.index(this);
					pnPoint.eq(intIndex).click();
				});
			});
			setTimeout(function(){
				thisSlide.css({visibility:'visible',opacity:'0'}).animate({opacity:'1'},slideSpeed);
			},slideSpeed);
		});

		// MouseWheelEvent
		var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
		$(document).on(mousewheelevent,function(e){
			if(!(setWrap.is(':animated'))){
				e.preventDefault();
				var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
				if (delta < 0){
					motionDown();
				} else {
					motionUp();
				}
			}
		});

		// KeyEvent
		$('html').keydown(function(e){
			if(setWrap.is(':animated')){
				e.preventDefault();
			} else {
				switch(e.which){
					case 38: // Key[↑]
					e.preventDefault();
					motionUp();
					break;

					case 40: // Key[↓]
					e.preventDefault();
					motionDown();
					break;
				}
			}
		});

		// FlickEvent
		var isTouch = ('ontouchstart' in window);
		setWrap.on(
			{'touchstart': function(e){
				if(setWrap.is(':animated')){
					e.preventDefault();
				} else {
					this.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
					this.topBegin = parseInt($(this).css('top'));
					this.top = parseInt($(this).css('top'));
					this.touched = true;
				}
			},'touchmove': function(e){
				if(!this.touched){return;}
				e.preventDefault();
				this.top = this.top - (this.pageY - (isTouch ? event.changedTouches[0].pageY : e.pageY));
				this.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
			},'touchend': function(e){
				if (!this.touched) {return;}
				this.touched = false;

				if(((this.topBegin)-30) > this.top){
					motionDown();
				} else if(((this.topBegin)+30) < this.top){
					motionUp();
				}
			}
		});

		/**************************************************
		   Scroll Up Event
		**************************************************/
		function motionUp(){
			var stageHeightU = setBase.height(),
			contTopUp = parseInt(setWrap.css('top')),
			moveTopUp = contTopUp + stageHeightU;
			$('input,textarea').blur();
			if(!(contTopUp === 0)){
				setWrap.stop().animate({top:moveTopUp},scrollSpeed,scrollEasing);
				// cIndex定義。liのindex番号のうち、現在選択中のliのindex番号を取得。
				var cIndex = setNav.find('li.activeStage').index('section.menuWrap li'),
						pIndex = cIndex - 1;
				/******PCの処理*****/
				if (uA == 'pc') {
					// 現在選択中のliの中にあるa要素のtext要素をカタカナから英語に戻す。
					setNav.find('li.activeStage a').text(menuList[cIndex]);
				}
				setNav.find('li.activeStage').removeClass('activeStage');
				$('section.menuWrap li').eq(pIndex).addClass('activeStage');
				/******PCの処理*****/
				if (uA == 'pc') {
					// プラグインを使って、選択されたliのtextをカタカナに書き換える。
					$('.activeStage a').shuffleLetters({
						"text" : menuListActive[pIndex]
					});
				}

				// parseIntを使ってbodyからdata-pageの属性値を取得し数字に変換。現在のページ番号を取得している。
				var acvStageP = parseInt($('body').attr('data-page')),
				// ここではスクロールアップで１つ前のページに移動するためー１してあげる。
				setPrev = acvStageP - 1;
				$('body').attr('data-page',setPrev);

				/******PCの処理*****/
				if (uA == 'pc') {
					switch (setNext !== 2){
					case true:
						$('.stage2').css('background-image', 'none');
						break;
					}
				}
				/******PCの処理*****/
				if (uA == 'pc') {
					// ページ番号によっては処理を行う。
					if (setPrev == 2) {
						navList.addClass('color_change');
					} else if (setPrev == 4) {
						navList.addClass('color_change');
					} else if (setPrev == 8) {
						navList.addClass('color_change');
					} else {
						navList.removeClass('color_change');
					}
					if(downBtn == 'show'){
						pagePos();
					}
				}

			}
			if(urlHash == 'on'){
				replaceHash();
			}
		}

		/**************************************************
		   Scroll Down Event
		**************************************************/
		function motionDown(){
			var stageHeightD = setBase.height(),
			contTopDown = parseInt(setWrap.css('top')),
			moveTopDown = contTopDown - stageHeightD;
			$('input,textarea').blur();

			var contHeight = setWrap.height(),
			maxHeightAdj = -(contHeight - stageHeightD);

			if(!(contTopDown == maxHeightAdj)){
				setWrap.stop().animate({top:moveTopDown},scrollSpeed,scrollEasing);
				var cIndex = setNav.find('li.activeStage').index('section.menuWrap li'),
						nIndex = cIndex + 1;
				/******PCの処理*****/
				if (uA == 'pc') {
					setNav.find('li.activeStage a').text(menuList[cIndex]);
				}
				setNav.find('li.activeStage').removeClass('activeStage');
				$('section.menuWrap li').eq(nIndex).addClass('activeStage');
				/******PCの処理*****/
				if (uA == 'pc') {
					$('.activeStage a').shuffleLetters({
						"text" : menuListActive[nIndex]
					});
				}

				var acvStageN = parseInt($('body').attr('data-page')),
				setNext = acvStageN+1;

				$('body').attr('data-page',setNext);

				// var y = $(".section_title").height();
				// $(".section_title").text(y);
				// var t = $(".slider01 img").height();
				// $(".section_title").text(t);

				/******PCの処理*****/
				if (uA == 'pc') {
					switch (setNext !== 2){
					case true:
						$('.stage2').css('background-image', 'none');
						break;
					}
				}
				/******PCの処理*****/
				if (uA == 'pc') {
					if (setNext == 2) {
						navList.addClass('color_change');
					} else if (setNext == 4) {
						navList.addClass('color_change');
					} else if (setNext == 8) {
						navList.addClass('color_change');
					}  else {
						navList.removeClass('color_change');
					}
				}

				if(downBtn == 'show'){
					pagePos();
				}
			}
			if(urlHash == 'on'){
				replaceHash();
			}
		}

		/**************************************************
		   Side Navi Click
		**************************************************/
		navList.click(function(){
			if(!(setWrap.is(':animated'))){
				var crtIndex = navList.index(this),
				cliIndex = crtIndex + 1,
				crtHeight = $(window).height();
				setWrap.stop().animate({top:-(crtHeight*crtIndex)},scrollSpeed,scrollEasing);
				var cIndex = setNav.find('li.activeStage').index('section.menuWrap li');
				/******PCの処理*****/
				if (uA == 'pc') {
					setNav.find('li.activeStage a').text(menuList[cIndex]);
				}
				setNav.find('li.activeStage').removeClass('activeStage');
				$(this).addClass('activeStage');
				/******PCの処理*****/
				if (uA == 'pc') {
					$('.activeStage a').shuffleLetters({
						"text" : menuListActive[crtIndex]
					});
				}
				$('body').attr('data-page',crtIndex+1);
				/******PCの処理*****/
				if (uA == 'pc') {
					if (cliIndex == 2) {
						navList.addClass('color_change');
					} else if (cliIndex == 4) {
						navList.addClass('color_change');
					} else if (cliIndex == 8) {
						navList.addClass('color_change');
					} else {
						navList.removeClass('color_change');
					}
				}
				if(downBtn == 'show'){
					pagePos();
				}
				if(urlHash == 'on'){
					replaceHash();
				}
			}
		});

		// PageDownBtnClick
		$('#pageDown a').click(function(){
			if(!(setWrap.is(':animated'))){
				var navActive = setNav.find('li.activeStage');
				navActive.each(function(){
					var navIndex = navList.index(this),
					setNav = navIndex+1;
					if(!(setNav == navLength)){
						$(this).next().click();
						$('.stage2').css({'background-image': 'none'});
					}
				});
				if(urlHash == 'on'){
					replaceHash();
				}
			}
		});
		function pagePos(){
			var pnAcv = coreNav.find('li.activeStage');
			pnAcv.each(function(){
				var pnIndexN = navList.index(this),
				pnCountN = pnIndexN+1;
				if(pnCountN == navLength){
					$('#pageDown').css({display:'none'});
				} else {
					$('#pageDown').css({display:'block'});
				}
			});
		}

		// HashReplace 関数定義
		function replaceHash(){
			var pnAcv = coreNav.find('li.activeStage');
			pnAcv.each(function(){
				var pnIndexN = navList.index(this),
				pnCountN = pnIndexN+1;
				location.hash = setHash + pnCountN;
			});
		}
		if(urlHash == 'on'){
			replaceHash();
		}

		// OpeningFade
		$('body').css({visibility:'visible',opacity:'0'}).animate({opacity:'1'},1000);

		/**************************************************
			 Load Page Move リロードボタンを押した時の処理
		**************************************************/
		if(url.indexOf(setHash) !== -1){
			var numSplit = ((url.split(setHash)[1])-1);
				navList.eq(numSplit).click();
		}
	});	/* $(window).load(function() end!!! */

	/**************************************************
		 Hash Change Event URLのハッシュ番号を手打ちで入力した時に起こる処理
	**************************************************/
	if(urlHash == 'on'){
		$(window).on('hashchange',function(){
			var stateUrl = document.URL,
			hashSplit = ((stateUrl.split(setHash)[1])-1);
			navList.eq(hashSplit).click();
		});
	}

	/**************************************************
		 2ページ目の処理
	**************************************************/
	var artist_img = [
		'url(img/sampleBg.jpg)',
		'url(img/sampleBg01.jpg)',
		'url(img/sampleBg02.jpg)',
		'url(img/sampleBg03.jpg)',
		'url(img/sampleBg04.jpg)',
		'url(img/sampleBg05.jpg)',
		'url(img/sampleBg06.jpg)',
		'url(img/sampleBg07.jpg)',
		'url(img/sampleBg08.jpg)'
	];

	artists_box = $('.artists_box'),
	artists_box_li = artists_box.find('li');
	artists_box_li.mouseover(function(){
		$(this).removeClass('artists_hidden');
		$('.artists_hidden').css('opacity', '0');
		var item	= artists_box_li.index(this);
		for (var i = 0; i < 9; i++) {
			switch (item){
			case i:
				$('.stage2').css({'background-image':artist_img[item],

												});
				break;
			}
		}
		$(this).on('click', function(){
			$('.artists_detail').fadeIn(1000);
		});
	}).mouseout(function(){
		$(this).addClass('artists_hidden');
		$('.artists_hidden').css('opacity', '1');
			$('.stage2').css({
		});
	});

	/**************************************************
		 slider pulguin option
	**************************************************/
	$(".slider01").slick({
		arrows: false,
		infinite: true,
		slidesToShow: 1, // 表示させるスライド数
		// adaptiveHeight: true, // スライドの高さが違うときに自動調整するか
		speed: 1900, // スライド/フェードさせるスピード（ミリ秒）
		autoplay: true, // 自動再生で切り替えする時間(ミリ秒)
		autoplaySpeed: 1600,
		pauseOnHover: false,　// autoplay:trueのとき、マウスホバーしたら一時停止させるか
		pauseOnFocus: false,　// autoplay:trueのとき、マウスフォーカスしたら一時停止させるか
		swipe: false, // スワイプを検知するか
		touchMove: false, // タッチでスライドさせるか
		rtl: true // スライドの順番を逆にするか　htmlにdir="rtl"を指定
	});
	$(".slider02").slick({
		arrows: false,
		infinite: true,
		slidesToShow: 1,
		// adaptiveHeight: true, // スライドの高さが違うときに自動調整するか
		speed: 2300,
		autoplay: true,
		autoplaySpeed: 1300,
		pauseOnHover: false,
		pauseOnFocus: false,
		swipe: false,
		touchMove: false
	});
	$(".slider03").slick({
		arrows: false,
		infinite: true,
		slidesToShow: 1,
		// adaptiveHeight: true, // スライドの高さが違うときに自動調整するか
		speed: 1800,
		autoplay: true,
		autoplaySpeed: 2600,
		pauseOnHover: false,
		pauseOnFocus: false,
		swipe: false,
		touchMove: false,
		rtl: true
	});
	$(".slider04").slick({
		arrows: false,
		infinite: true,
		slidesToShow: 1,
		// adaptiveHeight: true, // スライドの高さが違うときに自動調整するか
		speed: 2700,
		autoplay: true,
		autoplaySpeed: 1900,
		pauseOnHover: false,
		pauseOnFocus: false,
		swipe: false,
		touchMove: false
	});


});//end
