$( document ).ready(function() {
	var p = $("#test");

	p.html("Please select an option to sort :");

	var form = jQuery("<form/>", {id : 'form'}).appendTo(p);
	var mbti = jQuery("<input/>", {type: 'radio', value: 'mbti', checked: 'true'}).appendTo(form);
	form.append("mbti");
	var origin = jQuery("<input/>", {type: 'radio', value: 'origin'}).appendTo(form);
	form.append("origin");
	p.append("<br>");
	var main = jQuery("<div>").appendTo(p);

	$.getJSON( "old.json", function( data ) {
		displayMBTI(data);
		origin.on("click", function(e) {
			if (!mbti.is(':checked')) return;
			mbti.removeAttr("checked");
			main.html("");
			displayUnivers(data);
		});
		mbti.on("click", function(e) {
			if (!origin.is(':checked')) return;
			origin.removeAttr("checked");
			main.html("");
			displayMBTI(data);
		});
	});

	function displayMBTI(data) {
                var test = sortByMBTI(data);
                length = test.length;
                var current = data[test[0]][1];
		var current_div = jQuery("<div>", {class: 'title'});
		current_div.html(current);
		main.append(current_div);
		main.append("<br />");
		var tableau = jQuery("<table>");
		var ligne = jQuery("<tr>");
		var nom = jQuery("<td>", {class: 'monster'});
		var origin = jQuery("<td>", {class: 'monster'});
		nom.html("Nom");
		origin.html("Origine"); //afficher origine
		ligne.append(nom);
		ligne.append(origin);
		tableau.append(ligne);
                for (var i = 0; i < length; i++) {
			if (current !== data[test[i]][1]){
				main.append(tableau);
				tableau = jQuery("<table>");
				ligne = jQuery("<tr>");
				nom = jQuery("<td>", {class: 'monster'});
				origin = jQuery("<td>", {class: 'monster'});
				nom.html("Nom");
				origin.html("Origine"); //afficher origine
				ligne.append(nom);
				ligne.append(origin);
				tableau.append(ligne);
				current = data[test[i]][1];
				current_div = jQuery("<div>", {class: 'title'});
				current_div.html(current);
				main.append("<br />");
				main.append(current_div);
				main.append("<br />");
			}
			ligne = jQuery("<tr>");
			nom = jQuery("<td>");
			origin = jQuery("<td>");
			nom.html(test[i]);
			origin.html(data[test[i]][0]); //afficher origine
			ligne.append(nom);
			ligne.append(origin);
			tableau.append(ligne);
                }
	}

	function displayUnivers(data) {
                var test = sortByUnivers(data);
                length = test.length;
                var current = data[test[0]][0];
		var current_div = jQuery("<div>", {class: 'title'});
		current_div.html(current);
		main.append(current_div);
		main.append("<br />");
		var tableau = jQuery("<table>");
		var ligne = jQuery("<tr>");
		var nom = jQuery("<td>", {class: 'monster'});
		var origin = jQuery("<td>", {class: 'monster'});
		nom.html("Nom");
		origin.html("MBTI"); //afficher mbti
		ligne.append(nom);
		ligne.append(origin);
		tableau.append(ligne);
                for (var i = 0; i < length; i++) {
			if (current !== data[test[i]][0]){
				main.append(tableau);
				tableau = jQuery("<table>");
				ligne = jQuery("<tr>");
				nom = jQuery("<td>", {class: 'monster'});
				origin = jQuery("<td>", {class: 'monster'});
				nom.html("Nom");
				origin.html("MBTI"); //afficher MBTI
				ligne.append(nom);
				ligne.append(origin);
				tableau.append(ligne);
				current = data[test[i]][0];
				current_div = jQuery("<div>", {class: 'title'});
				current_div.html(current);
				main.append("<br />");
				main.append(current_div);
				main.append("<br />");
			}
			ligne = jQuery("<tr>");
			nom = jQuery("<td>");
			origin = jQuery("<td>");
			nom.html(test[i]);
			origin.html(data[test[i]][1]); //afficher mbti
			ligne.append(nom);
			ligne.append(origin);
			tableau.append(ligne);
                }
	}

	function sortByMBTI (data) {
		var keys = [];
		var mbti = [];
		Object.keys(data)
			.map(function (k) { return [k, data[k]]; })
			.sort(function (a, b) {
				if (a[1][1] < b[1][1]) return -1;
				if (a[1][1] > b[1][1]) return 1;
				return 0;
			})
			.forEach(function (d) {
				keys.push(d[0]);
		});
		return keys;
	}


	function sortByUnivers (data) {
		var keys = [];
		Object.keys(data)
			.map(function (k) { return [k, data[k]]; })
			.sort(function (a, b) {
				 if (a[1] < b[1]) return -1;
				 if (a[1] > b[1]) return 1;
				 return 0;
			})
			.forEach(function (d) {
				 keys.push(d[0]);
				 console.log(d[1]);
		});
		return keys;
	}

});
