
async function downloadPicture(request, response){
    
    const buffers = [];

    for await (const chunk of request){
        buffers.push(chunk)
    }

    const data = Buffer.concat(buffers).toString()
    console.log(data);
}

module.exports = downloadPicture