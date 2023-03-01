async function getPictures(element) {
    let req = await fetch("/api/pictures", {
      method: "GET",
    });
    let data = await req.json();
    for ( i of data ) {
      console.log(i);
        let image = document.createElement("img");
        image.setAttribute("src", `/api/pictures/${i.name}`);
        image.setAttribute("alt", "картиночка");
        element.appendChild(image);
    }
  }

  //получение одной картинки (ДОДЕЛАТЬ)
  // async function getPicture(pic) {
  //   let req = await fetch("/api/pictures/" + pic, {
  //     method: "GET",
  //   });
    
  //   // const buffers = []; // буфер для получаемых данных
  //   // for await (const chunk of req) {
  //   //   buffers.push(chunk); // добавляем в буфер все полученные данные
  //   // }
  //   console.log(req);
  // }