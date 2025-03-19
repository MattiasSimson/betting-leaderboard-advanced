import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../requests';
import styles from './countrybuttons.module.css';
import type { CustomerCountry } from '../types';

interface CountryButtonsProps {
  selectedCountries: (CustomerCountry | 'ALL')[];
  onCountryChange: (country: string, isSelected: boolean) => void;
}

function CountryButtons(props: CountryButtonsProps) {
  // -- STATE -- //
  // available countries to display in buttons
  const [availableCountries, setAvailableCountries] = useState<(CustomerCountry | 'ALL')[]>(['ALL']);

  // -- DATA HANDLING -- //
  // load available countries
  useEffect(function() {
    // load countries from leaderboard data
    function loadCountries() {
      fetchLeaderboard()
        .then(function(data) {
          // get unique countries from data
          const countries: string[] = [];
          for (let i = 0; i < data.length; i++) {
            const country = data[i].country;
            if (!countries.includes(country)) {
              countries.push(country);
            }
          }
          
          // add 'ALL' at the beginning
          setAvailableCountries(['ALL', ...countries] as (CustomerCountry | 'ALL')[]);
        })
        .catch(function(error) {
          console.error('failed to load countries:', error);
          // fallback to predefined countries
          setAvailableCountries(['ALL', 'Estonia', 'Finland', 'Norway', 'Chile', 'Canada']);
        });
    }
    
    loadCountries();
  }, []);

  // -- EVENT HANDLERS -- //
  // handle when a button is clicked
  function handleButtonClick(country: string) {
    // check if this country is currently selected
    let isSelected = false;
    for (let i = 0; i < props.selectedCountries.length; i++) {
      if (props.selectedCountries[i] === country) {
        isSelected = true;
        break;
      }
    }
    
    // call the parent component's change handler
    props.onCountryChange(country, !isSelected);
  }

  // -- RENDER -- //
  // render the country buttons
  return (
    <div className={styles.buttonContainer}>
      {availableCountries.map(function(country) {
        // determine if this button is selected
        let isSelected = false;
        for (let i = 0; i < props.selectedCountries.length; i++) {
          if (props.selectedCountries[i] === country) {
            isSelected = true;
            break;
          }
        }
        
        // set the button style based on selection state
        const buttonClass = isSelected ? styles.selectedButton : styles.countryButton;
        
        return (
          <Button 
            key={country}
            className={buttonClass}
            onClick={function() { handleButtonClick(country); }}
            disableElevation
            disableRipple
          >
            {country}
          </Button>
        );
      })}
    </div>
  );
}

export default CountryButtons;