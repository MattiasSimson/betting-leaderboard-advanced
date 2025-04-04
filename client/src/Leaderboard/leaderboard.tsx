import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchCustomers, fetchByCountry } from '../requests';
import type { LeaderboardCustomer } from '../types';
import styles from './leaderboard.module.css';
import CountryButtons from '../CountryButtons/countrybuttons';

function Leaderboard() {
  const [customers, setCustomers] = useState<LeaderboardCustomer[]>([]);
  const [allCustomers, setAllCustomers] = useState<LeaderboardCustomer[]>([]);
  const [uniqueCountries, setUniqueCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['ALL']);

  async function init() {
    setLoading(true);
    const data = await fetchCustomers();
    setAllCustomers(data);
    setCustomers(data);
    
    // get unique countries
    const countries = [...new Set(data.map(c => c.country))];
    setUniqueCountries(countries);
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  async function handleFetchByCountry(country: string | string[]) {
    setLoading(true);
    
    let result;
    if (country === "ALL" || (Array.isArray(country) && country.includes("ALL"))) {
      result = allCustomers;
    } else if (Array.isArray(country) && country.length > 1) {
      // multi-country implementation
      const results = await Promise.all(country.map(c => fetchByCountry(c)));
      const uniqueMap = new Map();
      results.flat().forEach(c => uniqueMap.set(c.id, c));
      result = Array.from(uniqueMap.values());
    } else {
      const singleCountry = Array.isArray(country) ? country[0] : country;
      result = await fetchByCountry(singleCountry);
    }
    
    // sort by profit (descending) and limit to 10 results
    // most sorting is done in the backend, this just makes sure you have a max of 10 in the frontend too
    const sortedResult = [...result].sort((a, b) => b.profit - a.profit).slice(0, 10);
    setCustomers(sortedResult);
    
    setLoading(false);
  }

  function handleCountryChange(country: string, isSelected: boolean) {
    let newSelection = [...selectedCountries];
    
    if (country === 'ALL') {
      if (isSelected) {
        newSelection = ['ALL'];
      } else {
        newSelection = ['ALL']; // makes sure ALL cant be unselected
      }
    } else {
      // remove ALL if present
      newSelection = newSelection.filter(c => c !== 'ALL');
      
      // add or remove the selected country
      if (isSelected && !newSelection.includes(country)) {
        newSelection.push(country);
      } else if (!isSelected) {
        newSelection = newSelection.filter(c => c !== country);
      }
      
      // default to ALL if nothing is selected
      if (newSelection.length === 0) {
        newSelection = ['ALL'];
      }
    }
    
    setSelectedCountries(newSelection);
    handleFetchByCountry(newSelection);
  }

  const processedRows = customers.map(item => {
    return {
      ...item,
      id: item.id,
      name: `${item.first_name} ${item.last_name}`,
      totalBets: item.total_bets,
      winPercentage: item.win_percentage,
      profit: Math.round(item.profit * 100) / 100
    };
  });

  const columns = [
    { 
      field: 'name', 
      headerName: 'Name',
      flex: 2,
      renderHeader: function() {
        return (
          <div style={{ lineHeight: "1.2em", textAlign: "center" }}>
            <span>Name</span>
          </div>
        );
      },
      renderCell: function(params: any) {
        return (
          <div className={styles.nameCell}>
            {params.value}
          </div>
        );
      }
    }, 
    { 
      field: 'country',
      headerName: 'Country',
      flex: 1,
      renderHeader: function() {
        return (
          <div style={{ lineHeight: "1.2em", textAlign: "center" }}> 
            <span>Country</span>
          </div>
        );
      }
    },
    { 
      field: 'totalBets',
      headerName: 'Total Bets', 
      flex: 1,
      renderHeader: function() {
        return ( 
          <div style={{ lineHeight: "1.2em", textAlign: "center" }}>
            <span>Total</span>
            <br />
            <span>Bets</span>
          </div>
        );
      }
    },
    { 
      field: 'winPercentage',
      headerName: 'Win %', 
      flex: 1,
      renderHeader: function() {
        return (
          <div style={{ lineHeight: "1.2em", textAlign: "center" }}>
            <span>Win </span>
            <br />
            <span>%</span>
          </div>
        );
      }
    },
    { 
      field: 'profit',
      headerName: 'Profit', 
      flex: 1.5,
      renderHeader: function() {
        return (
          <div style={{ lineHeight: "1.2em", textAlign: "center" }}>
            <span>Profit</span>
          </div>
        );
      },
      renderCell: function(params: any) {
        const formattedProfit = params.value.toFixed(2) + ' €';
        return <div>{formattedProfit}</div>;
      }
    },
  ];
  
  return (
    <div className={styles.leaderboardContainer}>
      <CountryButtons 
        selectedCountries={selectedCountries} 
        onCountryChange={handleCountryChange} 
        availableCountries={uniqueCountries}
      />
      <DataGrid
        className={styles.dataGrid}
        rows={processedRows}
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
