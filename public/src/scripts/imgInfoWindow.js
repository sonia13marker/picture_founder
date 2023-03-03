
async function createImageInfo(data){
    let elem = document.querySelector("#imageInfo");
    let image = elem.querySelector(".selectImg")
    let tags = elem.querySelector(".tags")
    let closeBtn = elem.querySelector(".closeBtn")
    let deleteBtn = elem.querySelector(".DeleteOption")

    image.src = `/api/get/pictures/${data.name}`
    for ( let i of data.tags){
        let pElem = document.createElement("p");
        pElem.innerHTML = i
        tags.appendChild(pElem)
    }

    deleteBtn.addEventListener("click", (e) => removeImage(data.id))

    closeBtn.addEventListener("click", function(e){
        elem.style.display = 'none';
        tags.replaceChildren()
    })

    elem.style.display = 'flex';
}