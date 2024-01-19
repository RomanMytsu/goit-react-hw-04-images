import { useEffect, useState } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { searchImage } from 'components/Api/Api';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { SearchbarWrap } from './Searchbar.styled';
import { Modal } from 'components/Modal/Modal';
import { Notify } from 'notiflix';

export const Searchbar = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [currentItem, setCurrentItem] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        const { data } = await searchImage(search, page);

        setTotalImages(data.totalHits);
        setResults(prevResults => [...prevResults, ...data.hits]);
      } catch (err) {
        Notify.error(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchImage();
    }
  }, [search, page]);

  const handleSearch = ({ search }) => {
    setSearch(search);
    setResults([]);
    setPage(1);
  };

  const showModal = (largeImageURL, tags) => {
    setOpenModal(true);
    setCurrentItem({
      largeImageURL,
      tags,
    });
  };

  const closeModal = () => {
    setOpenModal(false);
    setCurrentItem({});
  };

  const loadMore = () => setPage(prevPage => prevPage + 1);

  return (
    <>
      <SearchbarWrap>
        <SearchForm onSubmit={handleSearch} />
      </SearchbarWrap>
      <ImageGallery showModal={showModal} images={results} />
      {loading && <Loader />}
      {!loading && !!totalImages && totalImages > results.length && (
        <Button onClick={loadMore} type="button">
          LoadMore
        </Button>
      )}
      {openModal && <Modal item={currentItem} close={closeModal} />}
    </>
  );
};
