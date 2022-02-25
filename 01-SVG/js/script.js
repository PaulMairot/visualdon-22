const rectangle = document.querySelector(".rect");
rectangle.addEventListener("click", evt => {
    if(rectangle.style.fill == "red") {
        rectangle.style.fill="blue";
    } else {
        rectangle.style.fill="red";
    }
});

let donut = document.querySelector("#donut");
let ext_donut = document.querySelector("#ext_donut");

donut.addEventListener("mouseenter", evt => {
    ext_donut.setAttribute("r", "70px");
})

donut.addEventListener("mouseout", evt => {
    ext_donut.setAttribute("r", "60px");
})
