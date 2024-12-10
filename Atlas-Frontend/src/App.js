import React from 'react';
import './App.css';
import UpdateSample from './Pages/UpdateSample';
import Signup from './Pages/Signup';

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to the Homepage</h1>
      </header>
      <main>
        <Signup />
      </main>
    </div>
  );
};

// const App = () => {

//   return (
//     <div>
//       <UpdateSample />
//     </div>
//   );
// };

export default App;
