$(function(){
	$(".categoryMain").mouseover(function(){
		if($(".menus").hasClass("hidden")){
			$(".menus").removeClass("hidden");
		}
		$(".categoryMenu"+$(this).data("menu"))
		.removeClass("hidden")
		.siblings().addClass("hidden");
		
		if(document.documentElement.clientWidth<768){
			$(".as-carousel").css("marginTop","-247px")
		}
	});
	$(".category").mouseleave(function(){
		if(!$(".menus").hasClass("hidden")){
			$(".menus").addClass("hidden");
		}
		$(".as-carousel").css("marginTop","0")
	});
	
	
});