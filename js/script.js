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
	if (uA == 'sp') {
		$('.hamMenuBox').on('click', function(){
			$('.hamMenuCont').toggleClass('active');
			$('.containerMenu').toggleClass('on');
		});
	}
	/**************************************************
	   artists list
	**************************************************/
	/******SPの処理*****/
	if (uA == 'sp') {
		var dis = '70';
		$('.list_show').on('click', function(){
			$('.list_show, .list_box').animate({
				'margin-left':'+=' + dis + 'vw'}, 200);
				dis *= -1;
		});

		/**************************************************
		   画面　横向き
		**************************************************/
		var isLandscape = function(){
				if (window.innerHeight > window.innerWidth) {
					$(".spUser .stageBase").addClass("portrait");
					$(".spUser .stageBase").removeClass("landscape");
				} else {
					$(".spUser .stageBase").addClass("landscape");
					$(".spUser .stageBase").removeClass("portrait");
				}
			}
		$(window).resize(function(){
			isLandscape();
		});

		/**************************************************
		   scrollMenu
		**************************************************/
		scrollMenu = $('.spUser .pageNav ul').find('li');
		scrollMenu.on('click', function() {
        var i = scrollMenu.index(this);
        var p = setBaseSp.eq(i).offset().top;
        $('html,body').animate({ scrollTop: p }, 1000);

        return false;
    });
		var i = scrollMenu.index(this);
		var p = setBaseSp.eq(2).offset().top;
		console.log(p);
	}


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
		$('body').attr('data-page','1');
	}


	$(window).load(function(){

		if (uA == 'pc') {
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
		}
		if (uA == 'pc') {
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
			}); //stageSlide.each(function() end
		}
		if (uA == 'pc') {
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
		}
		if (uA == 'pc') {
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
		}
		if (uA == 'pc') {
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
		}

		/**************************************************
		   Scroll Up Event
		**************************************************/
		if (uA == 'pc') {
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
					// 現在選択中のliの中にあるa要素のtext要素をカタカナから英語に戻す。
					setNav.find('li.activeStage a').text(menuList[cIndex]);
					setNav.find('li.activeStage').removeClass('activeStage');
					$('section.menuWrap li').eq(pIndex).addClass('activeStage');
					/******PCの処理*****/
					// プラグインを使って、選択されたliのtextをカタカナに書き換える。
					$('.activeStage a').shuffleLetters({
						"text" : menuListActive[pIndex]
					});

					// parseIntを使ってbodyからdata-pageの属性値を取得し数字に変換。現在のページ番号を取得している。
					var acvStageP = parseInt($('body').attr('data-page')),
					// ここではスクロールアップで１つ前のページに移動するためー１してあげる。
					setPrev = acvStageP - 1;
					$('body').attr('data-page',setPrev);

					/******PCの処理*****/
					switch (setPrev !== 2){
					case true:
						$('.stage2').css('background-image', 'none');
						break;
					}
					/******PCの処理*****/
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

				} // if(!(contTopUp === 0)) end
				if(urlHash == 'on') {
					replaceHash();
				}
			}
		}
		/**************************************************
		   Scroll Down Event
		**************************************************/
		if (uA == 'pc') {
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
					setNav.find('li.activeStage a').text(menuList[cIndex]);
					setNav.find('li.activeStage').removeClass('activeStage');
					$('section.menuWrap li').eq(nIndex).addClass('activeStage');
					/******PCの処理*****/
					$('.activeStage a').shuffleLetters({
						"text" : menuListActive[nIndex]
					});

					var acvStageN = parseInt($('body').attr('data-page')),
					setNext = acvStageN+1;

					$('body').attr('data-page',setNext);

					// var y = $(".section_title").height();
					// $(".section_title").text(y);
					// var t = $(".slider01 img").height();
					// $(".section_title").text(t);

					/******PCの処理*****/
					switch (setNext !== 2){
					case true:
						$('.stage2').css('background-image', 'none');
						break;
					}
					/******PCの処理*****/
					if (setNext == 2) {
						navList.addClass('color_change');
					} else if (setNext == 4) {
						navList.addClass('color_change');
					} else if (setNext == 8) {
						navList.addClass('color_change');
					}  else {
						navList.removeClass('color_change');
					}

					if(downBtn == 'show'){
						pagePos();
					}
				}
				if(urlHash == 'on'){
					replaceHash();
				}
			}
		}

		/**************************************************
			 Navi Click
		**************************************************/
		if (uA == 'pc') {
			navList.click(function(){
				if(!(setWrap.is(':animated'))){
					var crtIndex = navList.index(this),
					cliIndex = crtIndex + 1,
					crtHeight = $(window).height();
					setWrap.stop().animate({top:-(crtHeight*crtIndex)},scrollSpeed,scrollEasing);
					var cIndex = setNav.find('li.activeStage').index('section.menuWrap li');
					/******PCの処理*****/
					setNav.find('li.activeStage a').text(menuList[cIndex]);
					setNav.find('li.activeStage').removeClass('activeStage');
					$(this).addClass('activeStage');
					/******PCの処理*****/
					$('.activeStage a').shuffleLetters({
						"text" : menuListActive[crtIndex]
					});
					$('body').attr('data-page',crtIndex+1);
					/******PCの処理*****/
					if (cliIndex == 2) {
						navList.addClass('color_change');
					} else if (cliIndex == 4) {
						navList.addClass('color_change');
					} else if (cliIndex == 8) {
						navList.addClass('color_change');
					} else {
						navList.removeClass('color_change');
					}
					if(downBtn == 'show'){
						pagePos();
					}
					if(urlHash == 'on'){
						replaceHash();
					}
				}
			});
		}
		if (uA == 'pc') {
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
		}
		if (uA == 'pc') {
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
		}

		/**************************************************
			 OpeningFade
		**************************************************/
		$('body').css({visibility:'visible',opacity:'0'}).animate({opacity:'1'},1000);
		if (uA == 'sp') {
			$('body').css('overflow', 'visible');
		}

		/**************************************************
			 Load Page Move リロードボタンを押した時の処理
		**************************************************/
		if (uA == 'pc') {
			if(url.indexOf(setHash) !== -1){
				var numSplit = ((url.split(setHash)[1])-1);
					navList.eq(numSplit).click();
			}
		}
	});	/* $(window).load(function() end!!! */

	/**************************************************
		 Hash Change Event URLのハッシュ番号を手打ちで入力した時に起こる処理
	**************************************************/
	if (uA == 'pc') {
		if(urlHash == 'on'){
			$(window).on('hashchange',function(){
				var stateUrl = document.URL,
				hashSplit = ((stateUrl.split(setHash)[1])-1);
				navList.eq(hashSplit).click();
			});
		}
	}

	/**************************************************
		 2ページ目の処理
	**************************************************/
	if (uA == 'pc') {
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
	}

	if (uA == 'sp') {
		var artist_img = [
			'img/sp02/d01.jpg',
			'img/sp02/d02.jpg',
			'img/sp02/d03.jpg',
			'img/sp02/d04.jpg',
			'img/sp02/d05.jpg',
			'img/sp02/d06.jpg',
			'img/sp02/d07.jpg',
			'img/sp02/d08.jpg'
		],
		artist_link = [
			{name : 'ShOh',
				link01 : 'https://m.youtube.com/playlist?list=PL7vDKUrwM5O7ndLkDUMQuhVKG03RpgX5G',
				link02 : 'https://vimeo.com/149567995',
				text : 'Sh0h(ショー) The ”HumanDisco”。HUMAN BEATBOX公式日本チャンピオン。マイケル・ジャクソンの右腕であるトラヴィス・ペイン氏にその実力を認められ、直々に契約を交わした、世界を股にかけるHUMAN BEATBOX ARTIST。10代の頃から世界大会のGUEST SHOWCASEや、TVCM等の出演を経験。ドイツで開催されたHUMAN BEATBOXの世界大会では日本代表として出場し、アジア最高順位であるBEST16を獲得。その他にも、世界最大級のトークショーである”TEDx”や大型野外フェスティバル"SUMMER SONIC”に出演する等、その唯一無二のスタイルで全世界で魅了する次世代アーティスト。'},
			{name : 'DAN',
				link01 : 'Instagram https://www.instagram.com/officialblackdan/',
				linkT : '-oops-',
				link02 : 'HP http://d-oops.xyz',
				link03 : 'Twitter https://mobile.twitter.com/d_oops_xyz',
				link04 : 'Instagram https://instagram.com/d_oops_xyz/',
				link05 : 'on-line http://oops.theshop.jp',
				text : 'ファッションブランド”oops”のデザイナー、ディレクター。現在ファッションを軸に、クリエーションをしているアーティスト。幼少の頃に、Black Musicに魅了され数多のジャンルを辿り、中高生で再度、Black Musicに目覚め、高校卒業直後に音楽での表現を始め、音楽とファッションはイコールにあった思想で想いを届けていた。20歳になる頃に某会社の方に見出され、アパレルの道も平行し表現方法は二つに。そして、本格的に、2015年にファッションブランド”oops”をスタート。現在、イベント主催、スタイリスト、楽曲提供などにも力をいれ、自らできる表現方法を十二分に発揮している、アーティスト、デザイナー。-oops- 2015年VOGUEピックアップやヒューマンビートボックスアーティストSh0hさんのスポンサーなども話題になり10代20代を中心に人気を誇るブランド。最高級ラインでは世界で一つの完全オーダーメイド、一般ラインではオンラインを中心に販売。5月にはギャラリー会、受注会を控えている。ファッションブランド『REBERTAS』デザイナーと共に、点描画を中心としたアシッドな雰囲気なアートを描くアーティスト"TOMO¥A"とのクリエイティブユニット『DAT』を結成し、活動中である。'},
			{name : 'mtk',
				link01 : 'Instagram https://www.instagram.com/mtk.motoki/?hl=ja',
				link02 : '',
				text : '経歴 小学生時代 相撲と書道にすべてを捧ぐ。中学生時代 遊んでしかいない。高校生時代 中退し、メンズエッグのモデルとして一定期間活動。大学生に憧れて半年間の猛勉強の末大学入学を決める。大学生時代ダンスにのめり込む。hiphopのアンダーグラウンドシーンで活動する傍らで、EDWINやPioneerのCMに出演するなど、幅広く活動社会人一度、有名アパレル通販サイトの〇〇townへ入社するも、自分での起業を目指し半年で退社現在 表現屋無鉄砲という映像制作、写真撮影、デザイン制作を主とした事業をスタート。無鉄砲では、共同代表としての活動と営業活動をし、様々な業界の人と日々未来について作戦を練っている。その傍らでNijiriという飲食店を2017年夏に湘南、鎌倉、葉山近辺でのオープンに向け動き始めている。26歳冬にカリフォルニアに武者修行として3ヶ月滞在。2017年１月現在カリフォルニアに在住'},
			{name : '高橋健太',
				link01 : 'Twitter https://twitter.com/tkwfunkyphoto',
				link02 : 'Instagram https://www.instagram.com/tkwfunkyphot/',
				text : '1989年生まれ、東京都在住。15歳の頃にストリートダンスに出会い、17歳で師LoCoYoKo氏との出会いをきっかけにストリートダンでの人生を歩む決意をするが、バイク事故により首の骨を粉砕骨折。頚椎損傷によって首から下の機能を失い二度と病院から出られないと診断されるが、ダンスへの強い思いだけを胸に血の滲むようなリハビリを行い、半年後に高校に復学。高校卒業後、母校のダンス部のコーチとして振り付けやレッスンを担当。生徒はバトルやコンテストで輝かしい成績を残す。2009年、東京モード学園グラフィック学科入学。専門学校卒業後、国内最大級ファッション通販サイト【ZOZOTOWN】やファッションコーディネートアプリ【WEAR】などを運営する株式会社スタートトゥデイにデザイナーとして入社、主にWEBのデザインを行う。専門学生時代からダンスイベントやライブ、モデルや広告、ファッションなどのカメラマンや、WEB・紙媒体のデザイン、アーティストMVや企業プロモーション映像制作などを行う。2016年3月、フリーランスに転向。ダンスバトルから生まれたバンド【GUSH -The Groove Usher-】若手実力派ダンスチーム【Nicol.Crossence】カントリーミュージックバンド【Lululu】が3ヶ月に1度主催するホームイベント「Orangeのスクリーン」ビクターエンタテイメントと協力した次世代プロジェクト【WEFUNK】などの専属クリエイターとして活動。また、後輩であるMTK.と【無鉄砲】を立ち上げる。無鉄砲では企業と協力し、ダンスをツールとした感情の解放(心体表現)を行うプロジェクトや、教育とダンスの融合をテーマとした活動、ダンス合宿専用施設やダンススクールのプロデュースなどを行う。現在HotNumber Designと無鉄砲を軸に自分の命を救ってくれたダンスで世界を変えるための普及活動やダンサーに対してのサポートをおこなうなど様々な分野にて活動中。事故の後遺症による麻痺など、多くの障害を抱えながらも最強の障害者として同じような状況の障害を持つ人達の希望になりたいと思い、ダンスで培った感性を武器に様々な活動を行っている。事故から10年目の2016年10月、ついに念願のソロダンスバトルで優勝を成し遂げた。'},
			{name : '森田真衣',
				link01 : 'Instagram https://www.instagram.com/maipdf/?hl=ja',
				link02 : '',
				text : '-フォトグラファー-大学からフィルムカメラを始め、在学中は主にフィルムでのモノクロ写真撮影に注力。在学中より原宿の写真館に勤め、デジタルカメラでの撮影も学ぶ。その後、フリーランスとなり、united arrows、rosebud、福助、SHIPSなどのブランドサイトでの商品撮りや、イベントの撮影を担当。ボーカルグループやモデルなどのアーティスト写真、宣材写真も撮影している。'},
			{name : 'YOKO-T fr.BASARASOUL',
				link01 : '',
				link02 : '',
				text : '東京を中心に若手の中でも勢いあるCREW、”BASARASOUL”の1人がこの男、YOKO-T(MC/SELECTER)である。彼自身が音楽の道を志したきっかけは、他でもないBASARASOULの影響だ。LA、ジャマイカに渡り修行を重ね今日に至る。リリックの内容を重視する選曲は若手の台頭。これからの東京のREGGAEシーンを担う1人として今注目を集めている。レギュラーイベント 毎月第2.4火曜 PARTY HARD TUESDAY at.渋谷LOUNGE NEO 毎月第3金曜 CITY ROCK FRIDAY at.渋谷JUMP 偶数月第3水曜 RAGGAPUNCH at.乃木坂CACTUS 奇数月第3木曜 RAM JAM DANCEHALL毎月第4土曜 GoodFellas at.渋谷GAME'},
			{name : 'DJ KAI',
				link01 : '',
				link02 : '',
				text : '幼少から両親の影響でソウルミュージックと縁があった。10歳でヒップホップに出会いブラックカルチャーにのめり込む。18歳の時にレコードに目覚め、当時珍しいアナログDJとして六本木IBEXにて木曜レギュラー R&B HIPHOP 80〜00sを回す。その後転々とし現在 吉祥寺でプライベートパーティのdjを月に一回不定期で地元浅草の自分の店でオーガナイズイベントUNCAIN NIGHTを開催中。ジャンル年齢問わずシーンに合わせたDJでフロアをロックする！DJに興味はあるけどどうすればいい？ やりたいけどお金が…設備が…なんて方に！初心者向けのDJ講習を開催します！誰でも参加可能 講習場所 時間などはtwitterにてDMで詳細をお送りします@dj_kai92sまでドシドシご連絡ください！'},
			{name : 'ハジメファンタジー (センチメンタル研究家)',
				link01 : '公式ホームページ http://hajimefantasy.jp/',
				link02 : '公式通販 http://sunege.jp/',
				link03 : 'Twitter https://twitter.com/HAJIMEFANTASY',
				link04 : 'Instagram https://www.instagram.com/hajimefantasy/',
				text : '”恋に不器用なひとたちへ”をテーマにイラストやデザイン、ポエム、恋愛相談、DJなど多分野で活動。2013年夏、好きなひとが自分の親友と付き合うも何も言えず、無地の白いTシャツに自作で「センチメンタル」とプリントして切ない気持ちをアピール。それを着て歩いているところをVILLAGE VANGUARDスタッフにスカウトされ「センチメンタルTシャツ」の全国発売が決定。その後も「ピュアTシャツ」「ゴメンネアリガトウロンT」「KATAOMOIキャップ」など"うまく言えないけど伝えたい気持ち"を可視化したグッズを続々と発表し、インパクト、メッセージ性の強さが渋谷原宿を中心に口コミで話題に。バンド・アイドル・映画・フェス・YOUTUBERなどジャンルを超えたコラボレーションをはじめ、ZOZOTOWNやラフォーレ原宿でも発売し人気を集める。2015年には音楽系イラストレーター・フクザワと苦しい恋の絵本「胸ギュン」(タグビーム)を発売し、VILLAGE VANGUARDほぼ全国ツアー(39ヶ所でサイン会&ライブポエム)を開催。2016年には、SHIBUYA109 NET SHOPを中心に気持ちを届けることに特化した恋の戦闘服「SUNEGE/すねげ」を展開。同年11月にはツイートや書き下ろしエッセイをまとめた書籍『言葉にしなくちゃ』(ワニブックス)を発売。また24時間体制で電話やメールによる恋愛相談を受け付けポエムで返す『24時間恋愛相談マラソン』を企画し完走するなど、恋に不器用なひとたちを全力で応援している。'},
			{name : 'TOMO¥A',
				link01 : '',
				link02 : '',
				text : 'Artist/Creator ペン画やドローイングを中心に、アクリル、コラージュなどの作品を制作している。中でも点描画(スティップリング)を得意とし、その精密さとニヒルでアシッドな雰囲気が特徴的である。そして自身のファッションブランド「REBERTAS」のデザイナー、ディレクターとしての一面も持つ。(2015/ラフォーレ原宿短日売上1位、全国PARCO Pop Up Storeなど)その他、グラフィックや映像、3DCG、プロジェクションマッピングなど最新のテクノロジーを駆使したユニット(TOMO¥A×MasanaoTakeuthi by Octmarker @Octmarkerland)やオートクチュールを中心にシーズンを展開するハイストリートブランド「OOPS @d_oops_xyz」のデザイナーDAN @officialblackdanとのクリエイティブユニット「DAT」を結成、活動中である。'},
			{name : 'Sumire Onuki',
				link01 : 'Instagram http://instagram.com/sumireonuki',
				link02 : 'Twitter https://mobile.twitter.com/sumireonuki',
				text : 'dance artist、アートディレクター、イベントプランナー 埼玉県出身 日本女子体育大学舞踊学専攻卒業 8歳からクラシックバレエを習う。その後大学卒業まで舞踊を専門に学び様々なジャンルを習得。作品では植物や自然環境をモチーフにしたものが多く、人間の仕草や動作から展開される振付や空間を使った演出を得意とする。2014年5月から、自身のコンテンポラリーダンスデュオCyan. (シアン)そしてパフォーマンスアートプロジェクトWHITE PLAN ROOMを主宰し、同世代のアーティストやクリエイターと「performance art」を主とした創作活動を行う。出演は勿論、ディレクションや構成演出、アーティストやアイドル振付指導、イベントプランナーまで活動の幅は多岐に渡る。【project】一部 2014.5 合同展示会ROOM主催 2014.9 performance art LIVE「SUMMER DOME」発表 2015.1 performance art LIVE「starry day」発表 2015.12 event「#WHITEPLANROOM」主催 2016.6  Gallery Conceal Shibuyaコラボイベント「GARDEN」プロデュース 2016.11 performance art LIVE「Lump of lie.」発表 2017.3 Misaki Ushiozu 2017s/s Collection「Monologue」プロデュース その他イベント出演、WS開催、映像制作多数【works】一部・スルースキルズ「LOVE4U」「すきだっちゅーの！」「熱いハートが叫んでる」振付・atME (時代加速装置@’mE)「SE」「Paralyzer」「しゅきちゅちゅ♡」「愛ドル」「○○しかっ！」振付、指導・川嶋志乃舞「遊廓ディスコ」MV芸者風ダンサー振付、出演・吉田凜音「裏原ンウェイ」MV振付、指導・KAGOME   WebCM「野菜のシャワー」動き振付・WEGO 2016S/Sカタログ FUN BOOK モデル・CONVERSE ALL STAR 100th展示会映像出演他多数'}
		];
		/* list_box(fixed left area) */
		$('.list_box li').on('click', function() {
			var fLi = $('.list_box').find('li'),
			menuIndex = fLi.index(this);
			$('.detail'+(menuIndex)).css('display', 'block');
			$('.detail'+(menuIndex)+' img').attr('src', artist_img[menuIndex]);
		});
		/* artists_box(slider area) */
		$('.artists_box img').on('click', function(){
			var imgClass = $(this).attr('class'),
			replaceInt = imgClass.replace(/[^0-9^\.]/g,"");
			$('.detail'+(replaceInt)).css('display', 'block');
			$('.detail'+(replaceInt)+' img').attr('src', artist_img[replaceInt]);
		});
		/* artist_detail */
		$('.artists_detail .close').on('click', function(){
			$('.artists_detail img').attr('src', '');
			$('.artists_detail').css('display', 'none');
		});
	}




	/**************************************************
		 8ページ目の処理
	**************************************************/



	/**************************************************
		 slider pulguin option
	**************************************************/
	$(".slider01").slick({
		arrows: false, // 左右の次へ、前へボタンを表示するかどうか
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

	$(".sliderMc").slick({
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		centerMode: true, // 表示中の画像を中央へ
		centerPadding: '50px', // 中央のpadding
		// adaptiveHeight: true, // スライドの高さが違うときに自動調整するか
		variableWidth: true,
		speed: 2000,
		swipe: false,
		touchMove: false
	});


});//end
