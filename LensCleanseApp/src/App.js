import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="app">

      <div className="app_header">
        <img
          className="app_header_image"
          // place holder
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlyhZtrjdFZkkTpR6ludPBtdB3poErWgqGUQ&usqp=CAU"
          // src="/Users/nursimadonuk/Desktop/LensCleansApp/lens-cleanse/logo.jpeg" 
          alt=""
        />

      </div>

      <h1>Welcome to Lens Cleanse!!</h1>

      <Post username="NursimaDonuk" caption="First Post" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlyhZtrjdFZkkTpR6ludPBtdB3poErWgqGUQ&usqp=CAU"/>


    </div>
  );
}

export default App;
