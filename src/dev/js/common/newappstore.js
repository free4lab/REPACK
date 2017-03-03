/*
 * created by cz
 * */
+function($){
	'use strict'

	var category = '.category';
	var categoryItem = '.categoryMain';
	var categoryMenu = '.categoryMenu';
	var menus = '.menus';


	var Category = function(){
		$(categoryItem).on('mouseover.bs.category',this.open);
		$(categoryMenu).on('mouseleave.bs.category',this.close);
	}

	Category.prototype.open = function(e){
		var $this = $(this);

		if($(menus).hasClass('hidden')){
			$(menus).removeClass('hidden');
		}

		$(categoryMenu+$this.data("menu"))
		.removeClass("hidden")
		.siblings().addClass("hidden");

		if(document.documentElement.clientWidth<768){
			$(".as-carousel").css("marginTop","-247px")
		}

	};

	Category.prototype.close = function(){
		if(!$(menus).hasClass("hidden")){
			$(menus).addClass("hidden");
		}
		$(".as-carousel").css("marginTop","0")
	}

	// CATRGORY PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.category')

      if (!data) $this.data('bs.category', (data = new Category(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }


  $.fn.category             = Plugin;
  $.fn.category.Constructor = Category;

  $( document )
  	.on('mouseover.bs.category', categoryItem, Category.prototype.open )
  	.on('mouseleave.bs.category', category, Category.prototype.close)

}(jQuery);