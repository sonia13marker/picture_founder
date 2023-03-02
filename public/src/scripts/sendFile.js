

async function imageSend(e){
    e.preventDefault()
    console.log(e.target['imageInput'].files[0]);
    let response = await fetch("/api/post/picture", {
        method: "POST",
        body: e.target["imageInput"].files[0]
    })
}