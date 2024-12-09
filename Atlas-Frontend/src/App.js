import React from 'react';
import './App.css';
import Signup from './Pages/Signup';
import SearchMachine from './Components/SearchMachine';

// const App = () => {
//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Welcome to the Homepage</h1>
//       </header>
//       <main>
//         <Signup />
//       </main>
//     </div>
//   );
// };

const App = () => {

  return (
    <div>
      <SearchMachine />
    </div>
  );
};

export default App;
