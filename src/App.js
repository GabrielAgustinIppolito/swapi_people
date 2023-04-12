import { useState } from 'react';
import SearchBar from './components/SearchBar';
import searchPeople from './api';
import PeopleList from './components/PeopleList';

function App() {
  const [people, setPeople] = useState([]);
  const [nextP, setNextP] = useState("1");
  // console.log(nextP);
  const handleSubmit = async (term, nextP) => {
    const data = await searchPeople(term, nextP);
    setPeople(data.results);
    if(data.next != null){
      setNextP(nextP + 1);
    }
    console.log(nextP);
  };

  const nextPage = ()=>{
    handleSubmit();
  }

  return (
    <div>
      <button onClick={nextPage}>Next</button>
      <SearchBar onSubmit={handleSubmit} />
      <PeopleList people={people} />
    </div>
  );
}

export default App;
