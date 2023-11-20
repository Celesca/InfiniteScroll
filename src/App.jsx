import './App.css';
import CardComponent from './components/CardComponent';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function App() {
  const [apiData, setApiData] = useState([]);
  const [amount, setAmount] = useState(3);
  const [display, setDisplay] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    async function fetchItem() {
      try {
        const apiUrl = 'https://api.sampleapis.com/codingresources/codingResources';
        const response = await fetch(apiUrl);
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchItem();
  }, []);

  // Update display when the amount changes
  useEffect(() => {
    if (apiData.length > 0) {
      const startIndex = (amount - 1) * 4;
      const endIndex = startIndex + 12; // Display 12 cards initially (3 sets of 4)
  
      const displayData = apiData.slice(startIndex, endIndex);
  
      setDisplay((oldData) => {
        // Check for duplicates and only add unique cards
        const uniqueData = displayData.filter(
          (item) => !oldData.some((oldItem) => oldItem.id === item.id)
        );
  
        return [...oldData, ...uniqueData];
      });
    }
  }, [amount, apiData]);
  
  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY > document.body.offsetHeight - 500 &&
        amount * 4 < apiData.length
      ) {
        setAmount((oldAmount) => {
          console.log('add Amount');
          return oldAmount + 1;
        });
      } else if (amount * 4 >= apiData.length && apiData.length > 0) {
        // Reset to amount 1 and simulate continuous data loop
        setAmount(1);
        setApiData((oldApiData) => {
          const clonedData = [...oldApiData];
          const lastId = clonedData[clonedData.length - 1].id;
          const loopedData = clonedData.map((item) => ({ ...item, id: item.id + lastId + 1 }));
          return [...clonedData, ...loopedData];
        });
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [amount, apiData]);

  return (
    <div className="container">
      <header>
        <h1 className="header-text">Celesca API Infinite Scroll</h1>
      </header>
      <section>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container alignItems="stretch" spacing={2}>
            {display.map((data, index) => (
              <CardComponent key={index} {...data} />
            ))}
          </Grid>
        </Box>
      </section>
    </div>
  );
}

export default App;