import './AllImagesLayout.scss';


export default function AllImagesLayout({name, tags, image}) {
    /*функция для преобразования тегов */
    let newTagList = tags.split(", ").map(tag => "#" + tag).join(" ");
    // src={`${process.env.PUBLIC_URL}/assets/images/uc-white.png`} 


    let newPathToImg = `${process.env.PUBLIC_URL}/assets/${image}`;


    return (
        <section>
            <h3>{name}</h3>
            <img src={newPathToImg} alt={name} />
            <p>{newTagList}</p>
        </section>
    )
}