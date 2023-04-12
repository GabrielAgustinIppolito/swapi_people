import axios from 'axios';

const searchPeople = async (term, nextP) => {
  const response = await axios.get(`https://swapi.dev/api/people/`, {
    params: {
      search: term,
      page: nextP
    },
  });
  return response.data;
};

export default searchPeople;
