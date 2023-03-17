
async function createImageInfo(data){
    let elem = document.querySelector("#imageInfo");
    let image = elem.querySelector(".selectImg")
    let imageName = elem.querySelector(".imageName")
    let tags = elem.querySelector(".tags")
    let closeBtn = elem.querySelector(".closeBtn")
    let deleteBtn = elem.querySelector(".DeleteOption")
    let editBtn = document.querySelector(".EditOption");
    let editField = document.querySelector(".editFilds");

    image.src = `/api/get/pictures/${data.name}`;
    imageName.textContent = data.name
    for ( let i of data.tags){
        let pElem = document.createElement("p");
        pElem.innerHTML = i
        tags.appendChild(pElem)
    }

    deleteBtn.addEventListener("click", (e) => removeImage(data.id))

    closeBtn.addEventListener("click", function(e){
        elem.style.display = 'none';
        editField.innerHTML = ""
        tags.replaceChildren()
    })

    editBtn.addEventListener("click", (e)=> EditData(data))
    

    elem.style.display = 'flex';
}