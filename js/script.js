var req = new XMLHttpRequest();

req.open("GET", "json/image_list.json");
req.onreadystatechange = function(){
    if (this.readyState == 4){
        var data = JSON.parse(this.response); //data를 가져와서
            for (var i=0; i<data.length; i++){ // data의 길이만큼
                var div = document.createElement("div"); // <div> 생성
                div.setAttribute("class","image"); // <div>의 class를 image로 설정
                
                div.onclick = function() { //<div>가 클릭되었을 때 
                    this.classList.toggle("image-selected"); // image-selected class가 있으면 삭제 없으면 추가
                };

                div.onmouseover = function(){ //<div>에 마우스를 올렸을 때
                    var element = this;
                    this.timerId = setTimeout(function() { // 1초 후에 image-magnified 추가
                        element.classList.add("image-magnified");
                    }, 1000);
                };

                div.onmouseout = function() {
                    clearTimeout(this.timerId); // this에 해당하는 <div>의 타이머 취소
                    this.classList.remove("image-magnified"); // image-magnified 삭제
                };

                var img = document.createElement("img"); // <img> 생성
                img.src = data[i]; // <img>의 src 속성 값 설정
                div.appendChild(img); //<div>안에 <img> 넣기
                document.body.appendChild(div); // <body>안에 <div>넣기
            }

    }
}
req.send();



function selectAll(btn) { 
    var images = document.getElementsByClassName("image"); //class가 image인 태그를 모두 가져와서 배열에 저장
    for (var i=0; i<images.length; i++) { // 배열의 길이만큼
        // 버튼의 value에 따라서 class 추가,삭제
        if (btn.value=="Unselect All") images[i].classList.remove("image-selected"); // 해당 배열 원소의 class에 image-selected 삭제
        else images[i].classList.add("image-selected"); // 해당 배열 원소의 class에 image-selected 추가
    }
    //버튼의 value 변경
    if (btn.value=="Unselect All") btn.value="Select All"; 
    else btn.value="Unselect All";
}


function slideshow(btn) {
    var images = document.getElementsByClassName("image"); //class가 image인 태그를 모두 가져와서 배열에 저장
    var index = 0; // index 변수 선언 및 초기화
    images[index].classList.add("image-magnified"); // index 순서대로 확대되도록 class에 image-magnified 추가

    var intervalid = setInterval(function() { //변수 intervalid에 반환값을 저장해가면서 호출, 배열의 끝까지 가면 clearInterval 함수 호출되어 종료
        images[index++].classList.remove("image-magnified"); // 추가했던 image-magnified를 삭제하고 다음 index로 넘기기
        if (index < images.length) images[index].classList.add("image-magnified"); // 배열 길이보다 작으면 추가
        else clearInterval(intervalid); // 크면 함수 작동하지 않도록 함
    }, 1000) ;
}
