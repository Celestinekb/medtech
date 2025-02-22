document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements with error checking
    const country1Search = document.getElementById('country1Search');
    const country1Select = document.getElementById('country1');
    const country2Search = document.getElementById('country2Search');
    const country2Select = document.getElementById('country2');
    const yearsInput = document.getElementById('years');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    // Check if all required elements exist
    if (!country1Search || !country1Select || !country2Search || !country2Select || !yearsInput || !calculateBtn || !resultDiv) {
        console.error('One or more DOM elements for Technological Multiplier Analyzer are missing. Check your HTML.');
        return;
    }

    // Comprehensive list of all 195 countries with technological advancement ratings (out of 10) as of 2025
    const countries = [
        { name: 'Afghanistan', techRating: 2.5 },
        { name: 'Albania', techRating: 4 },
        { name: 'Algeria', techRating: 3.5 },
        { name: 'Andorra', techRating: 5 },
        { name: 'Angola', techRating: 2.5 },
        { name: 'Antigua and Barbuda', techRating: 4 },
        { name: 'Argentina', techRating: 5.5 },
        { name: 'Armenia', techRating: 4.5 },
        { name: 'Australia', techRating: 8 },
        { name: 'Austria', techRating: 7.5 },
        { name: 'Azerbaijan', techRating: 4 },
        { name: 'Bahamas', techRating: 4.5 },
        { name: 'Bahrain', techRating: 5.5 },
        { name: 'Bangladesh', techRating: 3.5 },
        { name: 'Barbados', techRating: 4.5 },
        { name: 'Belarus', techRating: 5 },
        { name: 'Belgium', techRating: 7.5 },
        { name: 'Belize', techRating: 3.5 },
        { name: 'Benin', techRating: 2.5 },
        { name: 'Bhutan', techRating: 3 },
        { name: 'Bolivia', techRating: 3 },
        { name: 'Bosnia and Herzegovina', techRating: 4 },
        { name: 'Botswana', techRating: 3.5 },
        { name: 'Brazil', techRating: 5.5 },
        { name: 'Brunei', techRating: 4.5 },
        { name: 'Bulgaria', techRating: 5 },
        { name: 'Burkina Faso', techRating: 2.5 },
        { name: 'Burundi', techRating: 2 },
        { name: 'Cabo Verde', techRating: 3.5 },
        { name: 'Cambodia', techRating: 3 },
        { name: 'Cameroon', techRating: 3 },
        { name: 'Canada', techRating: 8 },
        { name: 'Central African Republic', techRating: 2 },
        { name: 'Chad', techRating: 2 },
        { name: 'Chile', techRating: 6 },
        { name: 'China', techRating: 8 },
        { name: 'Colombia', techRating: 5 },
        { name: 'Comoros', techRating: 2.5 },
        { name: 'Congo (Brazzaville)', techRating: 2.5 },
        { name: 'Congo (Kinshasa)', techRating: 2 },
        { name: 'Costa Rica', techRating: 5 },
        { name: 'Cote d\'Ivoire', techRating: 3 },
        { name: 'Croatia', techRating: 5.5 },
        { name: 'Cuba', techRating: 3.5 },
        { name: 'Cyprus', techRating: 5.5 },
        { name: 'Czech Republic', techRating: 6.5 },
        { name: 'Denmark', techRating: 8.5 },
        { name: 'Djibouti', techRating: 2.5 },
        { name: 'Dominica', techRating: 3.5 },
        { name: 'Dominican Republic', techRating: 4.5 },
        { name: 'East Timor (Timor-Leste)', techRating: 2.5 },
        { name: 'Ecuador', techRating: 4.5 },
        { name: 'Egypt', techRating: 4 },
        { name: 'El Salvador', techRating: 4 },
        { name: 'Equatorial Guinea', techRating: 2.5 },
        { name: 'Eritrea', techRating: 2 },
        { name: 'Estonia', techRating: 7.5 },
        { name: 'Eswatini', techRating: 3 },
        { name: 'Ethiopia', techRating: 3 },
        { name: 'Fiji', techRating: 3.5 },
        { name: 'Finland', techRating: 8.5 },
        { name: 'France', techRating: 7.5 },
        { name: 'Gabon', techRating: 3 },
        { name: 'Gambia', techRating: 2.5 },
        { name: 'Georgia', techRating: 4.5 },
        { name: 'Germany', techRating: 8 },
        { name: 'Ghana', techRating: 3.5 },
        { name: 'Greece', techRating: 5.5 },
        { name: 'Grenada', techRating: 3.5 },
        { name: 'Guatemala', techRating: 4 },
        { name: 'Guinea', techRating: 2.5 },
        { name: 'Guinea-Bissau', techRating: 2 },
        { name: 'Guyana', techRating: 3.5 },
        { name: 'Haiti', techRating: 2.5 },
        { name: 'Honduras', techRating: 3.5 },
        { name: 'Hungary', techRating: 6 },
        { name: 'Iceland', techRating: 7.5 },
        { name: 'India', techRating: 6.5 },
        { name: 'Indonesia', techRating: 5 },
        { name: 'Iran', techRating: 4.5 },
        { name: 'Iraq', techRating: 3 },
        { name: 'Ireland', techRating: 7.5 },
        { name: 'Israel', techRating: 8.5 },
        { name: 'Italy', techRating: 6.5 },
        { name: 'Jamaica', techRating: 4 },
        { name: 'Japan', techRating: 9 },
        { name: 'Jordan', techRating: 4.5 },
        { name: 'Kazakhstan', techRating: 4 },
        { name: 'Kenya', techRating: 4 },
        { name: 'Kiribati', techRating: 2.5 },
        { name: 'Korea, North', techRating: 3 },
        { name: 'Korea, South', techRating: 9 },
        { name: 'Kuwait', techRating: 4.5 },
        { name: 'Kyrgyzstan', techRating: 3 },
        { name: 'Laos', techRating: 2.5 },
        { name: 'Latvia', techRating: 5.5 },
        { name: 'Lebanon', techRating: 4 },
        { name: 'Lesotho', techRating: 2.5 },
        { name: 'Liberia', techRating: 2 },
        { name: 'Libya', techRating: 3 },
        { name: 'Liechtenstein', techRating: 6 },
        { name: 'Lithuania', techRating: 6 },
        { name: 'Luxembourg', techRating: 7 },
        { name: 'Madagascar', techRating: 2.5 },
        { name: 'Malawi', techRating: 2 },
        { name: 'Malaysia', techRating: 6 },
        { name: 'Maldives', techRating: 3.5 },
        { name: 'Mali', techRating: 2.5 },
        { name: 'Malta', techRating: 5.5 },
        { name: 'Marshall Islands', techRating: 2.5 },
        { name: 'Mauritania', techRating: 2.5 },
        { name: 'Mauritius', techRating: 4.5 },
        { name: 'Mexico', techRating: 5.5 },
        { name: 'Micronesia', techRating: 2.5 },
        { name: 'Moldova', techRating: 4 },
        { name: 'Monaco', techRating: 6 },
        { name: 'Mongolia', techRating: 3.5 },
        { name: 'Montenegro', techRating: 4.5 },
        { name: 'Morocco', techRating: 4 },
        { name: 'Mozambique', techRating: 2.5 },
        { name: 'Myanmar', techRating: 3 },
        { name: 'Namibia', techRating: 3.5 },
        { name: 'Nauru', techRating: 2.5 },
        { name: 'Nepal', techRating: 3 },
        { name: 'Netherlands', techRating: 8.5 },
        { name: 'New Zealand', techRating: 7.5 },
        { name: 'Nicaragua', techRating: 3.5 },
        { name: 'Niger', techRating: 2 },
        { name: 'Nigeria', techRating: 4 },
        { name: 'North Macedonia', techRating: 4.5 },
        { name: 'Norway', techRating: 8.5 },
        { name: 'Oman', techRating: 4.5 },
        { name: 'Pakistan', techRating: 3.5 },
        { name: 'Palau', techRating: 2.5 },
        { name: 'Panama', techRating: 4.5 },
        { name: 'Papua New Guinea', techRating: 2.5 },
        { name: 'Paraguay', techRating: 3.5 },
        { name: 'Peru', techRating: 4.5 },
        { name: 'Philippines', techRating: 5 },
        { name: 'Poland', techRating: 6 },
        { name: 'Portugal', techRating: 6.5 },
        { name: 'Qatar', techRating: 5.5 },
        { name: 'Romania', techRating: 5.5 },
        { name: 'Russia', techRating: 6 },
        { name: 'Rwanda', techRating: 3.5 },
        { name: 'Saint Kitts and Nevis', techRating: 3.5 },
        { name: 'Saint Lucia', techRating: 3.5 },
        { name: 'Saint Vincent and the Grenadines', techRating: 3.5 },
        { name: 'Samoa', techRating: 2.5 },
        { name: 'San Marino', techRating: 5 },
        { name: 'Sao Tome and Principe', techRating: 2.5 },
        { name: 'Saudi Arabia', techRating: 5 },
        { name: 'Senegal', techRating: 3.5 },
        { name: 'Serbia', techRating: 5 },
        { name: 'Seychelles', techRating: 3.5 },
        { name: 'Sierra Leone', techRating: 2.5 },
        { name: 'Singapore', techRating: 9 },
        { name: 'Slovakia', techRating: 6 },
        { name: 'Slovenia', techRating: 6.5 },
        { name: 'Solomon Islands', techRating: 2.5 },
        { name: 'Somalia', techRating: 2 },
        { name: 'South Africa', techRating: 5 },
        { name: 'South Sudan', techRating: 2 },
        { name: 'Spain', techRating: 6.5 },
        { name: 'Sri Lanka', techRating: 4 },
        { name: 'Sudan', techRating: 2.5 },
        { name: 'Suriname', techRating: 3.5 },
        { name: 'Sweden', techRating: 8.5 },
        { name: 'Switzerland', techRating: 8.5 },
        { name: 'Syria', techRating: 2.5 },
        { name: 'Taiwan', techRating: 8.5 },
        { name: 'Tajikistan', techRating: 3 },
        { name: 'Tanzania', techRating: 3 },
        { name: 'Thailand', techRating: 5 },
        { name: 'Togo', techRating: 2.5 },
        { name: 'Tonga', techRating: 2.5 },
        { name: 'Trinidad and Tobago', techRating: 4.5 },
        { name: 'Tunisia', techRating: 4 },
        { name: 'Turkey', techRating: 5.5 },
        { name: 'Turkmenistan', techRating: 3 },
        { name: 'Tuvalu', techRating: 2.5 },
        { name: 'Uganda', techRating: 3 },
        { name: 'Ukraine', techRating: 4.5 },
        { name: 'United Arab Emirates', techRating: 6 },
        { name: 'United Kingdom', techRating: 7.5 },
        { name: 'United States', techRating: 9 },
        { name: 'Uruguay', techRating: 5.5 },
        { name: 'Uzbekistan', techRating: 3.5 },
        { name: 'Vanuatu', techRating: 2.5 },
        { name: 'Vatican City', techRating: 4 },
        { name: 'Venezuela', techRating: 3 },
        { name: 'Vietnam', techRating: 5.5 },
        { name: 'Yemen', techRating: 2 },
        { name: 'Zambia', techRating: 3 },
        { name: 'Zimbabwe', techRating: 3 }
    ];

    // Populate country selects with error handling
    function populateCountrySelects(selectElement, id) {
        try {
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name;
                option.textContent = country.name;
                selectElement.appendChild(option);
            });
        } catch (error) {
            console.error(`Error populating country select ${id}:`, error);
        }
    }

    // Initialize country selects
    if (country1Select) populateCountrySelects(country1Select, 'country1');
    if (country2Select) populateCountrySelects(country2Select, 'country2');

    // Filter and update dropdown options based on search input
    function filterDropdown(select, searchInput, query) {
        const options = select.options;
        let foundMatch = false;
        for (let i = 0; i < options.length; i++) {
            const optionText = options[i].text.toLowerCase();
            if (optionText.includes(query.toLowerCase()) || optionText.startsWith(query.toLowerCase()) || optionText.match(new RegExp(`^${query}`, 'i'))) {
                options[i].style.display = 'block';
                options[i].selected = true;
                options[i].style.backgroundColor = 'rgba(0, 243, 255, 0.15)';
                options[i].style.color = '#ffffff';
                setTimeout(() => {
                    options[i].style.backgroundColor = '';
                    options[i].style.color = '';
                }, 2000); // Highlight for 2 seconds
                foundMatch = true;
            } else {
                options[i].style.display = 'none';
                options[i].selected = false;
                options[i].style.backgroundColor = '';
                options[i].style.color = '';
            }
        }
        if (!foundMatch && query) {
            const noMatchOption = document.createElement('option');
            noMatchOption.textContent = 'No countries found';
            noMatchOption.value = '';
            noMatchOption.disabled = true;
            noMatchOption.style.color = 'rgba(255, 255, 255, 0.7)';
            select.appendChild(noMatchOption);
            setTimeout(() => select.removeChild(noMatchOption), 2000); // Remove after 2 seconds
        }
        // Expand dropdown to show filtered options
        if (query) {
            select.size = Math.min(options.length, 10); // Show up to 10 options
        } else {
            select.size = 1; // Collapse to default
        }
    }

    // Independent search bar functionality for country1 with dropdown integration
    if (country1Search && country1Select) {
        country1Search.addEventListener('input', function(e) {
            const query = e.target.value;
            filterDropdown(country1Select, country1Search, query);
        });

        // Handle click outside to collapse dropdown
        document.addEventListener('click', function(e) {
            if (!country1Search.contains(e.target) && !country1Select.contains(e.target)) {
                country1Select.size = 1; // Collapse dropdown
                country1Search.value = country1Select.value || ''; // Sync search with selection
            }
        });

        // Sync dropdown selection with search bar
        country1Select.addEventListener('change', function() {
            country1Search.value = this.value || '';
            this.size = 1; // Collapse after selection
        });
    }

    // Independent search bar functionality for country2 with dropdown integration
    if (country2Search && country2Select) {
        country2Search.addEventListener('input', function(e) {
            const query = e.target.value;
            filterDropdown(country2Select, country2Search, query);
        });

        // Handle click outside to collapse dropdown
        document.addEventListener('click', function(e) {
            if (!country2Search.contains(e.target) && !country2Select.contains(e.target)) {
                country2Select.size = 1; // Collapse dropdown
                country2Search.value = country2Select.value || ''; // Sync search with selection
            }
        });

        // Sync dropdown selection with search bar
        country2Select.addEventListener('change', function() {
            country2Search.value = this.value || '';
            this.size = 1; // Collapse after selection
        });
    }

    // Calculate button functionality with three scenarios and professional analysis
    if (calculateBtn && resultDiv && country1Select && country2Select && yearsInput) {
        calculateBtn.addEventListener('click', function() {
            const country1 = country1Select.value;
            const country2 = country2Select.value;
            const years = parseInt(yearsInput.value) || 10;

            if (!country1 || !country2 || country1 === country2 || years < 1 || years > 100) {
                resultDiv.innerHTML = '<p class="result-text">Please select two different countries and enter a valid number of years (1–100).</p>';
                return;
            }

            const c1 = countries.find(c => c.name === country1);
            const c2 = countries.find(c => c.name === country2);

            if (!c1 || !c2) {
                resultDiv.innerHTML = '<p class="result-text">One or both countries not found. Please check spelling or selections.</p>';
                return;
            }

            // Apply 10× multiplier over years (exponential growth simplified)
            const multiplier = Math.pow(10, years / 10);
            const newRating1 = c1.techRating * multiplier;
            const newRating2 = c2.techRating * multiplier;

            // Calculate initial and final gaps for three scenarios
            const initialGap = c2.techRating - c1.techRating;

            // Scenario 1: Both countries use AI
            const bothGap = newRating2 - newRating1;

            // Scenario 2: Only country2 (reference) uses AI
            const onlyC2Gap = newRating2 - c1.techRating;

            // Scenario 3: Only country1 (your country) uses AI
            const onlyC1Gap = newRating1 - c2.techRating;

            // Display professional, analytical results
            let resultText = `
                <h4 class="result-heading">Technological Gap Analysis (${2025}–${2025 + years})</h4>
                <p class="result-text">Comparative analysis of ${country1} and ${country2} over ${years} years, applying a 10× technological multiplier effect:</p>
                <ul class="result-list">
                    <li><strong>Both Countries Use AI:</strong> Initial gap = ${initialGap.toFixed(2)} (${country2} - ${country1}). After ${years} years, gap = ${bothGap.toFixed(2)}. The disparity widens by ${Math.abs(bothGap - initialGap).toFixed(2)} due to exponential technological growth.</li>
                    <li><strong>Only ${country2} Uses AI:</strong> ${country1} remains at ${c1.techRating.toFixed(2)}, ${country2} reaches ${newRating2.toFixed(2)}. Gap = ${onlyC2Gap.toFixed(2)}, increasing by ${Math.abs(onlyC2Gap - initialGap).toFixed(2)} over ${years} years, potentially leaving ${country1} significantly behind.</li>
                    <li><strong>Only ${country1} Uses AI:</strong> ${country1} reaches ${newRating1.toFixed(2)}, ${country2} remains at ${c2.techRating.toFixed(2)}. Gap = ${onlyC1Gap.toFixed(2)}, decreasing by ${Math.abs(onlyC1Gap - initialGap).toFixed(2)} over ${years} years, allowing ${country1} to potentially surpass ${country2}.</li>
                </ul>
                <p class="result-text">This analysis underscores the critical role of AI adoption in shaping technological disparities, highlighting the strategic importance of investment in technological advancement.</p>
            `;

            resultDiv.innerHTML = resultText;
        });
    } else {
        console.error('Calculate button, result div, or input elements not found.');
    }
});