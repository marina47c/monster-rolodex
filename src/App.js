import "./App.css";
import { useState, useEffect } from "react";
import  CardList from "./components/card-list/card-list.component";
import  SearchBox from './components/search-box/search-box.component';

function App() {
  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  console.log('render');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => monster.name.toLowerCase().includes(searchField));
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField])

  const onSearchBoxChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    setSearchField(searchField);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monster Rolodex</h1>
      <SearchBox onChangeHandler={onSearchBoxChange} placeholder="search monsters" className="monsters-search-box"/>
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

export default App;
