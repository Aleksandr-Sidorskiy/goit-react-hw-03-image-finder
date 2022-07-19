import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

function ImageGallery() { 
    return (
    <ul className={css.ImageGallery}>
        <ImageGalleryItem/>
    </ul>
)
};

export default ImageGallery;