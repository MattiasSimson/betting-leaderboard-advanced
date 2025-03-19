import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchLeaderboard} from '../requests';
import { LeaderboardCustomer } from '../types';
import styles from './leaderboard.module.css';
import CountryButtons from '../CountryButtons/countrybuttons';
import type { CustomerCountry } from '../types';

function Leaderboard() {
  // -- STATE -- //
  // state for storing leaderboard data
  const [rows, setRows] = useState<LeaderboardCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState<(CustomerCountry | 'ALL')[]>(['ALL']);

  // -- DATA HANDLING -- //
  // load leaderboard data whenever selected countries change
  useEffect(function() {
    function loadLeaderboard() {
      setLoading(true);
      
      let countriesToFetch;
      // check if the selected countries include 'ALL'
      if (selectedCountries.includes('ALL')) {
        // if 'ALL' is included, set countriesToFetch to undefined
        countriesToFetch = undefined;
      } else {
        // if 'ALL' is not included, set countriesToFetch to the selected countries
        countriesToFetch = selectedCountries;
      }
      
      // fetch the data - backend already sorts by profit desc and limits to top 10
      // most of the calculations are done on the backend (SQL)
      fetchLeaderboard(countriesToFetch)
        .then(function(data) {
          // round profit values to 2 decimal places in the data
          const roundedData = data.map(function(item) {
            return {
              ...item,
              // rounding
              profit: Math.round(item.profit * 100) / 100
            };
          });
          
          setRows(roundedData);
          
          
          
          setLoading(false);
        })
        .catch(function(error) {
          console.error('failed to load leaderboard data:', error);
          setLoading(false);
        });
    }
    
    loadLeaderboard();
  }, [selectedCountries]);

  // -- EVENT HANDLERS -- //
  // handle when a country button is clicked
  function handleCountryChange(country: string, isSelected: boolean) {
    if (country === 'ALL') {
      // if ALL is clicked and should be selected, only select ALL
      if (isSelected) {
        setSelectedCountries(['ALL']);
      } else {
        // if ALL is deselected, clear all selections
        setSelectedCountries([]);
      }
    } else {
      // make a copy of current selections
      let newSelections = [...selectedCountries];
      
      // remove ALL from selections if present
      newSelections = newSelections.filter(function(c) {
        return c !== 'ALL';
      });
      
      // remove the clicked country if it's already selected
      newSelections = newSelections.filter(function(c) {
        return c !== country;
      });
      
      // add the country if it should be selected
      if (isSelected) {
        newSelections.push(country as CustomerCountry);
      }
      
      // if nothing is selected, select ALL
      if (newSelections.length === 0) {
        newSelections = ['ALL'];
      }
      
      setSelectedCountries(newSelections);
    }
  }

  // -- UI CONFIGURATION -- //
  // simple column definitions 
  // using weird span stuff to make it look correct on mobile view and smaller screens
  const columns = [
    { 
      field: 'name', 
      width: 120, 
      flex: 1.0,
      renderHeader: function() {
        return (
          <div style={{ lineHeight: "1.2em" }}>
            <span>Name</span>
          </div>
        );
      },
      renderCell: function(params: any) {
        return (
          <div style={{ 
            width: '100%',
            display: 'flex',
            whiteSpace: 'pre-wrap',
            lineHeight: window.innerWidth < 600 ? '1.5' : '3.5',
          }}>
            {params.value}
          </div>
        );
      }
    }, 
    { 
      field: 'country',
      width: 100, 
      flex: 1.3,
      renderHeader: function() {
        return (
          <div style={{ lineHeight: "1.2em" }}> 
            <span>Country</span>
          </div>
        );
      }
    },
    { 
      field: 'totalBets', 
      width: 120, 
      flex: 1,
      renderHeader: function() {
        return ( 
          <div style={{ lineHeight: "1.2em" }}>  {/* such a stupid way to have wraps in MUI lol */ }
            <span>Total</span>
            <br />
            <span>Bets</span>
          </div>
        );
      }
    },
    { 
      field: 'winPercentage', 
      width: 90, 
      flex: 1,
      renderHeader: function() {
        return (
          <div style={{ lineHeight: "1.2em" }}>
            <span>Win </span>
            <br />
            <span>%</span>
          </div>
        );
      }
    },
    { 
      field: 'profit', 
      width: 180,
      flex: 1.5,
      renderHeader: function() {
        return (
          <div style={{ lineHeight: "1.2em" }}>
            <span>Profit</span>
          </div>
        );
      },
      renderCell: function(params: any) {
        // format profit to always show 2 decimal places and add EUR
        const formattedProfit = params.value.toFixed(2) + ' €';
        return <div>{formattedProfit}</div>;
      }
    },
  ];
  
  // -- RENDER -- //
  return (
    <div>
      <CountryButtons 
        selectedCountries={selectedCountries} 
        onCountryChange={handleCountryChange} 
      />
      <DataGrid
        className={styles.dataGrid}
        rows={rows}
        columns={columns}
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
        disableColumnResize
        hideFooter
        loading={loading}
        columnHeaderHeight={60} 
        getRowId={function(row) { return row.id; }}
      />
    </div>
  );
}

export default Leaderboard;