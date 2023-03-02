async function getPictures() {
  let req = await fetch("/api/get/pictures", {
    method: "GET",
  });
  let data = await req.json();

  return data;
}

async function createNodeImage(element) {
  let data = await getPictures();

  for (let i of data) {
    let image = document.createElement("img");
    image.setAttribute("src", `/api/get/pictures/${i.name}`);
    image.setAttribute("alt", "картиночка");
    image.setAttribute("class", "memeImg");
    image.setAttribute("id", i.id);
    image.addEventListener("click", (e) => {
      createImageInfo(i);
    });
    element.appendChild(image);
  }
}

//получение одной картинки (ДОДЕЛАТЬ)
// function getPicture(pic) {
//   let request = new XMLHttpRequest();
//   request.open(`/api/pictures/${pic}`, "GET")
//   request.onload = () => {
//     return request.response
//   }
//   request.send()
  // let req = fetch("/api/pictures/" + pic, {
  //   method: "GET",
  // });

  // const buffers = []; // буфер для получаемых данных
  // for await (const chunk of req) {
  //   buffers.push(chunk); // добавляем в буфер все полученные данные
  // }
// }
