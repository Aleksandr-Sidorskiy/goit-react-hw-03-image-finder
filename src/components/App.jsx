import { Component } from 'react';
import fetchImages from './services/images-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';


class App extends Component{
  state = {
    query: '',
    page: 1,
    imagesOnPage: 0,
    totalImages: 0,
    isLoading: false,
    showModal: false,
    images: null,
    error: null,
     currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query)
        .then(({ hits, totalHits }) => {
          const ImageArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL
            
          }));
          return this.setState({
            page: 1,
            images: ImageArray,
            imagesOnPage: ImageArray.length,
            totalImages: totalHits
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }


    if (prevState.page !== page && page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query, page)
        .then(({ hits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...imagesArray],
              imagesOnPage: imagesOnPage + imagesArray.length,
            };
          })
        })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
            );
          }
        }


  handeleFormSubmit = query => {
    this.setState({ query }); 
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }))
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currrentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currrentImageDescription: currrentImageDescription,
      }));
    }
  };


  render() {
    const {
      images,
      imagesOnPage,
      totalImages,
      isLoading,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    const handeleFormSubmit = this.handeleFormSubmit;
    const onNextFetch = this.onNextFetch;
    const openModal = this.openModal;
    const toggleModal = this.toggleModal;
    
    return (
      <>
        
        <Searchbar onSubmit={this.handeleFormSubmit } />
        {images && <ImageGallery images={images} openModal={ openModal} />}
        {/* {isLoading &&  <Loader/>} */}
     </>
   )
  };
};

export default App;
