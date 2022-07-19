import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({smallImage, description, largeImage, openModal}) {
    return (
        <li className={css.ImageGalleryItem} onClick={openModal}>
            <img src={smallImage} alt={description} data-large={largeImage} />
        </li>
    );
}
export default ImageGalleryItem;