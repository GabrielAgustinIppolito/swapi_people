function PeopleList({ people }) {
  const renderPeople = people.map((person) =>{
    return <p>{person.name}</p>;
  });

  return <div className="people-list">{renderPeople}</div>;
}

export default PeopleList;
