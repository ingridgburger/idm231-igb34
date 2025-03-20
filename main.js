document.addEventListener('DOMContentLoaded', function() {

    const birthdayInput = document.getElementById('birthday');
    const findSignButton = document.getElementById('find-sign-button');

    const descriptionBox = document.createElement('div');
    descriptionBox.className = 'description-box';
    descriptionBox.style.display = 'none';
    document.body.appendChild(descriptionBox);

    const zodiacDescriptions = {
        'Aries': { sauce: 'Sriracha Sauce', description: 'Bold and Spicy' },
        'Taurus': { sauce: 'Sweet Cannoli Dip', description: 'Indulgent and Comforting' },
        'Gemini': { sauce: 'Balsamic Glaze', description: 'Versatile and Unexpected' },
        'Cancer': { sauce: 'White Queso Dip', description: 'Comforting and Nostalgic' },
        'Leo': { sauce: 'Jalapeno Sauce', description: 'Fiery and Bold' },
        'Virgo': { sauce: 'Chimichurri Sauce', description: 'Fresh and Balanced' },
        'Libra': { sauce: 'Sweet Chili Sauce', description: 'Balance and Harmony' },
        'Scorpio': { sauce: 'Thai Red Curry Sauce', description: 'Intense and Mysterious' },
        'Sagittarius': { sauce: 'Gaucasalsa', description: 'Adventurous and Global' },
        'Capricorn': { sauce: 'Thick and Chunky Salsa', description: 'Classic and Reliable' },
        'Aquarius': { sauce: 'Aioli Garlic Mustard Sauce', description: 'Unique and Unexpected' },
        'Pisces': { sauce: 'Tzatziki Dip', description: 'Dreamy and Cool' }
    };

    const audioElements = {};
    const signs = Object.keys(zodiacDescriptions);
    for (let i = 0; i < signs.length; i++) {
        const sign = signs[i];
        audioElements[sign] = new Audio(`./audio/${sign.toLowerCase()}.mp3`);
    }

    let currentSign = null;

    function getZodiac(month, day) {
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
            return 'Capricorn';
        } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
            return 'Sagittarius';
        } else if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) {
            return 'Scorpio';
        } else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
            return 'Libra';
        } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
            return 'Virgo';
        } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
            return 'Leo';
        } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
            return 'Cancer';
        } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
            return 'Gemini';
        } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
            return 'Taurus';
        } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
            return 'Aries';
        } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
            return 'Pisces';
        } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
            return 'Aquarius';
        } else return null;
    }

    function resetImages() {
        const images = document.querySelectorAll('.grid-container img');
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            const signName = img.alt;
            img.src = `./images/${signName}/${signName}.png`;
            img.style.opacity = '1';
        }
    }

    function fadeOutImage(signImage) {
        let opacity = 1;
        const fadeOut = setInterval(function() {
            opacity -= 0.1;
            signImage.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(fadeOut);
                signImage.src = `./images/${signImage.alt}/${signImage.alt}_reveal.png`;
                fadeInImage(signImage);
            }
        }, 50);
    }

    function fadeInImage(signImage) {
        let opacity = 0;
        const fadeIn = setInterval(function() {
            opacity += 0.1;
            signImage.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(fadeIn);
            }
        }, 50);
    }

    function showZodiacResult(sign) {
        resetImages();
        descriptionBox.style.display = 'none';

        if (currentSign && audioElements[currentSign]) {
            audioElements[currentSign].pause();
            audioElements[currentSign].currentTime = 0;
        }

        currentSign = sign;

        const signImage = document.querySelector(`.grid-container img[alt="${sign}"]`);

        if (signImage) {
            fadeOutImage(signImage);
            const info = zodiacDescriptions[sign];
            descriptionBox.innerHTML = `
                <h2>${sign}: ${info.sauce}</h2>
                <p>${info.description}</p>
            `;
            descriptionBox.style.display = 'block';

            if (audioElements[sign]) {
                audioElements[sign].play().catch(function(e) {
                    console.log('Audio play error:', e);
                });
            }
        }
    }

    function handleFindSignButtonClick() {
        const date = new Date(birthdayInput.value);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        console.log(`Selected Date: ${date}, Month: ${month}, Day: ${day}`);

        const zodiacSign = getZodiac(month, day);

        if (zodiacSign) {
            console.log(`Detected Zodiac: ${zodiacSign}`);
            showZodiacResult(zodiacSign);
        } else {
            console.log('Invalid date input');
        }
    }

    findSignButton.addEventListener('click', handleFindSignButtonClick);

    function handleZodiacImageClick() {
        const sign = this.alt;
        showZodiacResult(sign);
    }

    const zodiacImages = document.querySelectorAll('.grid-container img');
    for (let i = 0; i < zodiacImages.length; i++) {
        const img = zodiacImages[i];
        img.style.cursor = 'pointer';
        img.addEventListener('click', handleZodiacImageClick);
    }
    const helpButton = document.getElementById('help-button');
    const closeHelpButton = document.getElementById('close-help');
    const helpModal = document.getElementById('help-modal');

    function showHelpModal() {
        helpModal.style.display = 'flex';
    }
    
    function closeHelpModal() {
        helpModal.style.display = 'none';
    }
    
    helpButton.addEventListener('click', showHelpModal);
    closeHelpButton.addEventListener('click', closeHelpModal);
});
