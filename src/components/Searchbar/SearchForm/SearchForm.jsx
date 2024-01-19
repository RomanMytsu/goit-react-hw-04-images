import { useState } from 'react';
import { Form, Input, LabelBtn, SearchBtn } from './SearchForm.styled';
import { GoSearch } from 'react-icons/go';

export const SearchForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    search: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({
      search: '',
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SearchBtn type="submit">
        <GoSearch />
        <LabelBtn>Search</LabelBtn>
      </SearchBtn>

      <Input
        value={state.search}
        onChange={handleChange}
        name="search"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        required
      />
    </Form>
  );
};