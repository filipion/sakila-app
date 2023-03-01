import './App.css';

const fetcher = (url) => async () => {
  let r = await fetch(`/${url}`)
  console.log(r)
  let actors = await r.json()
  console.log(actors)
}

function App() {
  return (
    <button onClick={fetcher('actors')}>
      actors
    </button>
  );
}

export default App;
