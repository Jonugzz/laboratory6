function watchForm() {
	$('#yt').on('submit', function (event) {
		event.preventDefault();
		
		$('#videos').empty();
		
		let k = "AIzaSyCvjioTVJ9adLHaETUbZE_BiPDVBOMaWkg";
		let url = "https://www.googleapis.com/youtube/v3/search";
		let keyword = $('#vid').val();
		
		let inp = $('#vid:text').val();
		
		if (inp == "") {
			console.log("empty");
		}
		else {
			$.ajax({
				url: url,
				data: { part: "snippet",
						order: "viewCount",
						q: keyword,
						type: "video",
						maxResults: 10,
						key: k
						},
			method: "GET",
			dataType: "json",
			success: function(responseJSON){
				nextPage(responseJSON.nextPageToken, keyword);
				handleResponse(responseJSON);
			},
			error: function(err){
				console.log(err);
			}
			});
			$('#vid:text').val("");
		}
	
	});
	
	$('#videos').on('click', '.vidItem', function(event) {
		event.preventDefault();
		let ur = $(this).find('a').attr('href');
		window.open(ur,'_blank');
	});
	
	
}

function nextPage(tok, word) {
	$('#next').on('click', function(event) {
		event.preventDefault();
		let k = "AIzaSyCvjioTVJ9adLHaETUbZE_BiPDVBOMaWkg";
		let url = "https://www.googleapis.com/youtube/v3/search";
		$.ajax({
				url: url,
				data: { part: "snippet",
						order: "viewCount",
						q: word,
						pageToken: tok,
						type: "video",
						maxResults: 10,
						key: k
						},
			method: "GET",
			dataType: "json",
			success: function(responseJSON){
				prevPage(responseJSON.prevPageToken,word);
				nextPage(responseJSON.nextPageToken,word);
				handleResponse(responseJSON);
			},
			error: function(err){
				console.log(err);
			}
		});
	});
}

function prevPage(tok, word) {
	$('#prev').on('click', function(event) {
		event.preventDefault();
		let k = "AIzaSyCvjioTVJ9adLHaETUbZE_BiPDVBOMaWkg";
		let url = "https://www.googleapis.com/youtube/v3/search";
		$.ajax({
				url: url,
				data: { part: "snippet",
						order: "viewCount",
						q: word,
						pageToken: tok,
						type: "video",
						maxResults: 10,
						key: k
						},
			method: "GET",
			dataType: "json",
			success: function(responseJSON){
				prevPage(responseJSON.prevPageToken,word);
				nextPage(responseJSON.nextPageToken);
				handleResponse(responseJSON);
			},
			error: function(err){
				console.log(err);
			}
		});
	});
}

function handleResponse(data) {
	$('#videos').empty();
	//console.log(data.items[0].id.videoId);
	for (var i = 0;i<10;i++){
	$('#videos').append(`<li class="vidItem">
							<span> 
							<h3> ${data.items[i].snippet.title} </h3>
							<img src="${data.items[i].snippet.thumbnails.default.url}"/>
							<a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}"></a>
							</span>
						</li>`);
	}
}

watchForm();