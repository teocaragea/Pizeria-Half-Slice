var slides = document.querySelector(".slides");
var images = document.querySelectorAll(".stackImages");
var text = document.querySelector(".text");

function gallery() {
    let i = images.length - 2;
    setInterval(function () {
        console.log(images[i].getAttribute("title"));
        if(i == 0) {
            i = images.length - 2;
            for(let i = 0; i < images.length - 1; i++) {
                images[i].classList.remove("animation");
                images[i].classList.remove("animation2");
            }
        }
        images[i].classList.add("animation");
        images[i + 1].classList.add("animation2");
        text.innerHTML = images[i].getAttribute("title");
        i--;
    }, 3000);
}

gallery();

