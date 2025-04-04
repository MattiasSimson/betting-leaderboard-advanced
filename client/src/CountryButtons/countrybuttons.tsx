import Button from '@mui/material/Button';
import styles from './countrybuttons.module.css';

// Define CustomerCountry type if not already imported from types
type CustomerCountry = string;

interface CountryButtonsProps {
  selectedCountries: (CustomerCountry | 'ALL')[];
  onCountryChange: (country: string, isSelected: boolean) => void;
  availableCountries?: string[]; // Make this optional to maintain backward compatibility
}

function CountryButtons(props: CountryButtonsProps) {
  // -- UI SETUP -- //
  // available countries to display in buttons - use prop or default list
  const buttonCountries = ['ALL', ...(props.availableCountries || ['Estonia', 'Finland', 'Norway', 'Chile', 'Canada'])];

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
      {buttonCountries.map(function(country) {
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