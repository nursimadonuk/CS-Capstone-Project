import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="app">

      <div className="app_header">
        <img
          className="app_header_image"
          // get logo
          src="../Logo/logo.jpeg" 
          alt=""
        />
        <h1>Welcome to Lens Cleanse!!</h1>
      </div>  

      <Post username="NursimaDonuk" caption="First Post" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlyhZtrjdFZkkTpR6ludPBtdB3poErWgqGUQ&usqp=CAU"/>
      <Post username="Rafsan" caption="Second Post" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlyhZtrjdFZkkTpR6ludPBtdB3poErWgqGUQ&usqp=CAU"/>
      <Post username="Mena" caption="Third Post" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlyhZtrjdFZkkTpR6ludPBtdB3poErWgqGUQ&usqp=CAU"/>
      <Post username="Jiaying" caption="Fourth Post" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlyhZtrjdFZkkTpR6ludPBtdB3poErWgqGUQ&usqp=CAU"/>
    </div>
  );
}

export default App;
