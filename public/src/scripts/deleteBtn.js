
async function removeImage(data){
    let imageId = data
    let response = await fetch("/api/delete/picture/"+imageId, {
        method: "DELETE"
    })

    if ( response.ok ){
        setTimeout(()=>{window.location.reload()}, 1000)
    }
    else{
        alert("image error")
    }
}