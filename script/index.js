const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const exit = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
  modal.classList.remove("hide")  
})

exit.addEventListener("click", () => {
  modal.classList.add("hide")
})