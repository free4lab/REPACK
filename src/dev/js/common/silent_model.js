/**
 * function: slient model
 * autor: songpengwei
 * mail: songpengwei40@gamil.com
 * last modify date: 2014/9/18
 */
;(function($){
	$.slientModel = function(){};
	$.extend($.slientModel,{
		isExist:false,
		//配置
		settings:{
			opacity		: 0.95,
			contentWidth: 960,
			closeImage	: 'css/images/b_closelabel.png',
			slientTitle	: '现在进入到静阅模式。',
			slientHtml	: '现在进入到静阅模式。',
			layerHtml	: [
			    '<div id="slientModel" style="display:none;">',
            '<a href="javascript:void(0)" class="layerclose"><img src="#" border="0" /></a>',
            '<div class="slientBox">',
              '<div class="body">',
                '<div class="layertitle"></div>',
                '<div class="layercontent"></div>',
              '</div>',
            '</div>',
			    '</div>'].join(''),
			 layerCss	:{
				 'position'		: 'absolute',
				 'left'			: '0px',
				 'top'			: '0px',
				 'width'		: '100%',
			     'height'		: '100%',
			     'padding'		: '40px 0',
				 'zIndex'		: '9999'
			 },
			 boxCss		:{
				 'margin'		: '0 auto',
				 'width'		: '960px',
				 'box-sizing'	: 'border-box',
				 'background'	: '#fff',
				 'padding'		: '1px',
				 'box-shadow'	: '0 1px 3px rgba(34,25,25,.4)',
			 },
			 bodyCss	:{
				 'margin'		: '20px 40px'
			 },
			 titleCss	:{
				 'height'		: '30px',
				 'margin-bottom': '20px',
				 'font-size'	: '2em',
				 'text-align'	: 'center'
			 },
			 closeImgCss:{
				 'position'		: 'fixed',
				 'top'			: '0px',
				 'right'		: '0px'
			 },
			 overlayCss	:{
				 'position'		: 'fixed',
				 'top'			: '0',
				 'left'			: '0',
				 'background'	: '#E5E5E5',
				 'height'		: '100%',
				 'width'		: '100%',
				 'opacity'		: '0.9',
				 'zIndex'		: '2000'
			 }
		},
		
		loadSettings:function(settings){
			$("#slientModel").css(settings.layerCss);
			$("#slientModel a.layerclose>img").css(settings.closeImgCss);
			$("#slientModel .slientBox").css(settings.boxCss);
			$("#slientModel .slientBox .body").css(settings.bodyCss);
			$("#slientModel .slientBox .layertitle").css(settings.titleCss);
			
			$("#slientModel a.layerclose>img").attr("src", settings.closeImage);
			$("#slientModel .slientBox").css("width", settings.contentWidth);
			$("#slientModel .slientBox .layertitle").html(settings.slientTitle);
			$("#slientModel .slientBox .layercontent").html(settings.slientHtml);
			$("#slientModel .slientBox img").css("max-width", "880px");
			
			$("#slientModel").show();
		},
		
		close:function(){
			$("#slientModel .slientBox .layercontent").empty();
			$("#slientModel").hide();
		},
		
		showOverlay:function(settings) {
		    if ($('#slientmode_overlay').length == 0){
		    	$("body").append('<div id="slientmode_overlay"></div>');
		    }
		    $('#slientmode_overlay').hide()
		    						.css(settings.overlayCss)
		    						.css('opacity', settings.opacity)
		    						.fadeIn(200);
		    return true;
		},
		
		hideOverlay:function() {
			$('#slientmode_overlay').fadeOut(200);
		}
		
	});
	
	$.fn.slientModel = function(settings, callback){
		
		
		init(settings);
		return this;
		
		//私有函数
		//根据setting初始化框架
		function init(settings){
			
			//加载配置
			if(settings)
				$.extend(true, $.slientModel.settings, settings);
			var docHeight = $(document).height();
			$.extend(true, $.slientModel.settings, {layerCss:{'height':docHeight}});
			//console.log("docHeight="+docHeight);
			//console.log("$.slientModel.settings="+$.slientModel.settings.layerCss.height);
			
			//加载html框架
			if($.slientModel.isExist == false){
				$.slientModel.isExist = true;
				$('body').append($.slientModel.settings.layerHtml);
			}
				
			//装载配置并显示
			$.slientModel.loadSettings($.slientModel.settings);
			$.slientModel.showOverlay($.slientModel.settings);
			
			//绑定关闭事件
			$('#slientModel .layerclose').click(close);
			$(document).keydown(function(event){
		        if (event.keyCode == 27){
		        	close();
		        }
		    });
		}
		
		//关闭
		function close(){
			$.slientModel.close();
			$.slientModel.hideOverlay();
		}
	}
})(jQuery);