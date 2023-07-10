
// Colour elements
const hexInput = document.getElementById('hexInput');
const inputColour = document.getElementById('inputColour');
const alteredColour = document.getElementById('alteredColour');
const alteredColourText = document.getElementById('alteredColourText')

const errorMessage = document.getElementById('error')

//Slider html elements
const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');

//lightenText, darkenText, toggleBtn elements
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
    if(toggleBtn.classList.contains('toggled')){
      toggleBtn.classList.remove('toggled');
      lightenText.classList.remove('unselected');
      darkenText.classList.add('unselected');
    } else {
      toggleBtn.classList.add('toggled');
      lightenText.classList.add('unselected');
      darkenText.classList.remove('unselected');
    } 
    reset(); 
  })

// Function to change the input colour box with the value the user passes through
hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;
    
    const strippedHex = hex.replace('#', '');
    
    inputColour.style.backgroundColor = "#" + strippedHex;
    reset(); 

})

// Function to check user is passing in a valid hex value 
const isValidHex = (hex) => {

    if(!hex) return false;
    
     const strippedHex = hex.replace('#', '');

    if(strippedHex.match(/^[A-Fa-f0-9]*$/)) {

        if(strippedHex.length === 3) {

            errorMessage.innerText = '';
            return strippedHex.length === 3;

        } else if(strippedHex.length === 6) {

            errorMessage.innerText = '';
            return strippedHex.length === 6;

        } else {

            errorMessage.innerText = 'Please enter a value equal to 3 or 6 characters';

        }

    } else {
        errorMessage.innerText = 'Please enter a valid hex using numbers 0-9 and letters a/A-f/F';
    }

}

// Error function


// Function to convert a hex value to an RGB value 
const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;
    
    let strippedHex = hex.replace('#','');
    
    if(strippedHex.length === 3) {
      strippedHex = strippedHex[0] + strippedHex[0]
      + strippedHex[1] + strippedHex[1]
      + strippedHex[2] + strippedHex[2];
    }
    
    const r  = parseInt(strippedHex.substring(0,2), 16);
    const g  = parseInt(strippedHex.substring(2,4), 16);
    const b  = parseInt(strippedHex.substring(4,6), 16);
    
    return {r,g,b}
  }

// Function to convert a RGB value to a hex value 
const convertRGBToHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);
    
    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
  }

  slider.addEventListener('input', () => {
    if(!isValidHex(hexInput.value)) return;
    
    sliderText.textContent = `${slider.value}%`;

    const valueAddition  = 
    toggleBtn.classList.contains('toggled') ? 
    -slider.value 
    : slider.value;
    
    //get the altered hex value
    const alteredHex = alterColour(hexInput.value, valueAddition);
    alteredColour.style.backgroundColor = alteredHex;
    alteredColourText.innerText = `Altered Color ${alteredHex}`; 
    //update the altered colour
  })

// Function to alter the input colour
  const alterColour = (hex, percentage) => {
    const {r,g,b} = convertHexToRGB(hex);
    
    const amount = Math.floor((percentage/100) * 255);
    
    const newR = increaseWithinRange(r,amount);
    const newG = increaseWithinRange(g,amount);
    const newB = increaseWithinRange(b,amount)
    return convertRGBToHex(newR, newG, newB);
  }


  const increaseWithinRange = (hex, amount) => {

    const newHex = hex + amount;
    if(newHex > 255) return 255;
    if(newHex < 0) return 0;
    return newHex;
  }

  const reset = () =>{ 
    slider.value = 0;
    sliderText.innerText=`0%`;
    alteredColour.style.backgroundColor = hexInput.value;
    alteredColourText.innerText = `Altered Color ${hexInput.value}`; 
  
  }