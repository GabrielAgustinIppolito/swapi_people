import { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import searchPeople from "./api";
import PeopleList from "./components/PeopleList";

function App2() {
  const [people, setPeople] = useState([]);
  const [nextP, setNextP] = useState(1);
  const [term, setTerm] = useState();

  const handleSubmit = async (newTerm, page) => {
    const data = await searchPeople(newTerm, page);
    if (data.next != null) {
      setNextP(nextP + 1);
    }
    setPeople(data.results);
    setTerm(newTerm);
  };

  const nextPage = () => {
    handleSubmit(term, nextP);
  };

  const previousPage = async () => {
    if (nextP > 2) {
      setNextP(nextP - 1);
      const data = await searchPeople(term, nextP);
      setPeople(data.results);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <PeopleList people={people} />
      <button onClick={nextPage}>Next</button>
      {nextP > 2 && <button onClick={previousPage}>Previous</button>}
    </div>
  );
}

function App() {
  const [people, setPeople] = useState([]);
  const [currentP, setCurrentP] = useState(1);
  const [term, setTerm] = useState("");
  const [hasNext, setHasNext] = useState(false);
  const initialRender = useRef(true);

  useEffect(() => {
    if (!initialRender.current) {
      const fetchData = async () => {
        const data = await searchPeople(term, currentP);
        setPeople(data.results);
        if (data.next) {
          setHasNext(true);
        } else {
          setHasNext(false);
        }
      };
      fetchData().catch((e) => {
        console.log(e);
      });
    }
  }, [term, currentP]);

  const handleSubmit = (term) => {
    setTerm(term);
    setCurrentP(1);
    initialRender.current = false;
  };

  const nextPage = () => {
    if (hasNext) {
      setCurrentP(currentP + 1);
    }
  };

  const previousPage = () => {
    setCurrentP(currentP - 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <PeopleList people={people} />
      {hasNext && <button onClick={nextPage}>Next</button>}
      {currentP > 1 && <button onClick={previousPage}>Previous</button>}
    </div>
  );
}

export default App;
