

async function imageSend(e){
    e.preventDefault()

    let file = e.target['imageInput'].files[0]
    let altName = document.querySelector(".altNameInput").value

    let tags = document.querySelector(".tagsInput").value.replace(/ /ig, "&")
    let fileName = altName.length === 0 ? e.target['imageInput'].files[0].name : altName + `.${getExtended(file.name)}`
    console.log(fileName);

    console.log(file);
    let response = await fetch("/api/post/picture/"+fileName + "/" + tags, {
        method: "POST",
        body: file,
    })
}

function getExtended(file){
    return file.split(".")[1]
}