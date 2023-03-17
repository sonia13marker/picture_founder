
let editField = document.querySelector(".editFilds");

function EditData(data){

    editField.innerHTML = "";

    let nameInput = document.createElement("input");
    nameInput.className = "altNameInput";
    
    let tagsInput = document.createElement("input");
    tagsInput.className = "tagsInput";
    
    let sendBtn = document.createElement("input");
    sendBtn.value = "отправить";
    sendBtn.type = "button";

    console.log("config data section");
    
    editField.appendChild(nameInput);
    editField.appendChild(tagsInput);
    editField.appendChild(sendBtn);
    console.log("append childs");

    nameInput.value = data.name;
    tagsInput.value = data.tags.join(" ");

    sendBtn.addEventListener("click", async function(e){
        e.preventDefault();
        console.log("prevent");
        let response = await fetch("/api/edit/", {
            method: "PUT",
            headers: {"Accept":"application/json", "Content-Type": "application/json"},
            body: JSON.stringify({
                id: data.id,
                name: nameInput.value,
                tags: tagsInput.value.split(" ")
            })
        })
        console.log("after request");

        if ( response.ok ){
            console.log("noce edit data");
        }
    })

}