
async function createImageInfo(data){
    let elem = document.querySelector("#imageInfo");
    let image = elem.querySelector(".selectImg")
    let tags = elem.querySelector(".tags")
    let closeBtn = elem.querySelector(".closeBtn")

    image.src = `/api/pictures/${data.name}`
    for ( let i of data.tags){
        let pElem = document.createElement("p");
        pElem.innerHTML = i
        tags.appendChild(pElem)
    }

    closeBtn.addEventListener("click", function(e){
        elem.style.display = 'none';
        tags.replaceChildren()
    })

    elem.style.display = 'flex';
}