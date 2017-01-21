$(document).ready(function(){
	var catList = localStorage.getItem("catList");
	catList = catList ? JSON.parse(catList) : [];
	if(catList.length){
		render_gallery();
	}
	$('#save').bind('click',addCat);
	$('.cat').bind('click',showCat);
	$('img').bind('click',increaseClick);
	function showCat(ev){
		var id = ev.currentTarget.id;
		increaseClick(id);
		var selectedCat = catList[parseInt(id)-1];
		var detailTemplate = _.template("<h3><%= name%></h3><p>clicks <%= clk%></p><img src='<%= img%>' id='img-<%=id%>'/><p><%=names%></p><p><%=age%></p>");
		$('#details').html(detailTemplate(selectedCat));
		$('#name').val(selectedCat.name);
		$('#image').val(selectedCat.img);
		$('#clicks').val(selectedCat.clk);
		$('#nick-names').val(selectedCat.names);
	}
	function increaseClick(id){
		if(typeof id === "object"){
			id = id.currentTarget.id.replace('img-','');
		}
		var selectedCat = catList[parseInt(id)-1];
		selectedCat.clk = parseInt(selectedCat.clk) + 1;
		selectedCat.age = getAge(selectedCat.clk);
	}
	function getAge(clk){
		switch(clk){
			case clk >= 0 && clk < 5: return "Infant";
			case clk >=6 && clk < 12: return "Child";
			case clk >=13 && clk < 25: return "Young";
			case clk >=26 && clk < 40: return "Middle-Age";
			case clk >= 41 && clk < 60: return "Old";
			case clk >61: return "Very Old";
		}
	}
	function addCat(){		
		var name = $('#name').val();
		var img = $('#image').val();
		var clk = $('#clicks').val();
		var nNames = $('#nick-names').val();
		var catObj = {
			name: name,
			img: img,
			clk: clk,
			age: getAge(clk),
			names: nNames 
		};
		catList.push(catObj);
		localStorage.setItem("catList",JSON.stringify(catList));
		render_gallery();	
	}
	function render_gallery(){
		var gallery = $('#gallery');
		var cat_list = $('#cat-list');
		var galleryTemplate = _.template(" <div class='col-lg-3 col-sm-4 col-xs-6'>"+									
										"<div class='col-xs-12 cat' id='<%=id%>''>"+
											"<h3><%= name%></h3>"+
											"<p>clicks <%= clk%></p>"+
											"<img src='<%= img%>' id='img-<%=id%>'/>"+
										"</div>"+									
								"</div>");
		var listTemplate = _.template("<li class='list-group-item' id='list-<%=id%>'><%=name%><span class='badge'><%=clk%></span></li>");
		$.each(catList,function(index,cat){
			cat.id = index+1;
			gallery.append(galleryTemplate(cat));
			cat_list.append(listTemplate(cat))
		});
	}
});