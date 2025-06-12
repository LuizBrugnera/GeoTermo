document.addEventListener("DOMContentLoaded", () => {
  // --- 1. ELEMENTOS DO DOM ---
  // Elementos do jogo principal
  const gameContainer = document.getElementById("game-container");
  const countryInput = document.getElementById("country-input");
  const guessButton = document.getElementById("guess-button");
  const guessesContainer = document.getElementById("guesses-container");
  const suggestionsBox = document.getElementById("suggestions-box");
  const gameOverMessage = document.getElementById("game-over-message");
  const finalText = document.getElementById("final-text");
  const shareButton = document.getElementById("share-button");
  const mapContainer = document.getElementById("map");

  // Elementos da tela "Já Jogou Hoje"
  const alreadyPlayedContainer = document.getElementById(
    "already-played-container"
  );
  const pastGuessesContainer = document.getElementById(
    "past-guesses-container"
  );
  const pastFinalText = document.getElementById("past-final-text");
  const pastMapContainer = document.getElementById("past-map");
  const countdownTimer = document.getElementById("countdown-timer");

  // Elementos das Estatísticas
  const statsPlayed = document.getElementById("stats-played");
  const statsWins = document.getElementById("stats-wins");
  const statsCurrentStreak = document.getElementById("stats-current-streak");
  const statsMaxStreak = document.getElementById("stats-max-streak");

  // --- 2. DADOS E ESTADO INICIAL DO JOGO ---
  // IMPORTANTE: Preencha esta lista com todos os países que você tiver!
  const countries = [
    { name: "Afeganistão", lat: 33.9391, lon: 67.71, population: 43844111 },
    {
      name: "África do Sul",
      lat: -30.5595,
      lon: 22.9375,
      population: 64747319,
    },
    { name: "Albânia", lat: 41.1533, lon: 20.1683, population: 2771508 },
    { name: "Alemanha", lat: 51.1657, lon: 10.4515, population: 84075075 },
    { name: "Andorra", lat: 42.5462, lon: 1.6016, population: 82904 },
    { name: "Angola", lat: -11.2027, lon: 17.8739, population: 39040039 },
    {
      name: "Arábia Saudita",
      lat: 23.8859,
      lon: 45.0792,
      population: 34566328,
    },
    { name: "Argélia", lat: 28.0339, lon: 1.6596, population: 47435312 },
    { name: "Argentina", lat: -38.4161, lon: -63.6167, population: 45851378 },
    { name: "Armênia", lat: 40.0691, lon: 45.0382, population: 2952365 },
    { name: "Austrália", lat: -25.2744, lon: 133.7751, population: 26974026 },
    { name: "Áustria", lat: 47.5162, lon: 14.5501, population: 9113574 },
    { name: "Azerbaijão", lat: 40.1431, lon: 47.5769, population: 10397713 },
    { name: "Bahamas", lat: 25.0343, lon: -77.3963, population: 403033 },
    { name: "Bangladesh", lat: 23.685, lon: 90.3563, population: 175686899 },
    { name: "Barbados", lat: 13.1939, lon: -59.5432, population: 282623 },
    { name: "Bélgica", lat: 50.8503, lon: 4.3517, population: 11758603 },
    { name: "Belize", lat: 17.1899, lon: -88.4976, population: 422924 },
    { name: "Bielorrússia", lat: 53.7098, lon: 27.9534, population: 8997603 },
    { name: "Bolívia", lat: -16.2902, lon: -63.5887, population: 12581843 },
    {
      name: "Bósnia e Herzegovina",
      lat: 43.9159,
      lon: 17.6791,
      population: 3140095,
    },
    { name: "Botsuana", lat: -22.3285, lon: 24.6849, population: 2562122 },
    { name: "Brasil", lat: -14.235, lon: -51.9253, population: 212812405 },
    { name: "Brunei", lat: 4.5353, lon: 114.7277, population: 466330 },
    { name: "Bulgária", lat: 42.7339, lon: 25.4858, population: 6714560 },
    { name: "Burkina Faso", lat: 12.2383, lon: -1.5616, population: 24074580 },
    { name: "Butão", lat: 27.5142, lon: 90.4336, population: 796682 },
    { name: "Cabo Verde", lat: 16.5388, lon: -23.0418, population: 527326 },
    { name: "Camarões", lat: 7.3697, lon: 12.3547, population: 29879337 },
    { name: "Camboja", lat: 12.5657, lon: 104.991, population: 17847982 },
    { name: "Canadá", lat: 56.1304, lon: -106.3468, population: 40126723 },
    { name: "Catar", lat: 25.3548, lon: 51.1839, population: 3115889 },
    { name: "Cazaquistão", lat: 48.0196, lon: 66.9237, population: 20843754 },
    { name: "Chade", lat: 15.4542, lon: 18.7322, population: 21003705 },
    { name: "Chile", lat: -35.6751, lon: -71.543, population: 19859921 },
    { name: "China", lat: 35.8617, lon: 104.1954, population: 1416096094 },
    { name: "Chipre", lat: 35.1264, lon: 33.4299, population: 1370754 },
    { name: "Colômbia", lat: 4.5709, lon: -74.2973, population: 53425635 },
    {
      name: "Coreia do Norte",
      lat: 40.3399,
      lon: 127.5101,
      population: 26571036,
    },
    {
      name: "Coreia do Sul",
      lat: 35.9078,
      lon: 127.7669,
      population: 51667029,
    },
    { name: "Costa do Marfim", lat: 7.54, lon: -5.5471, population: 32711547 },
    { name: "Costa Rica", lat: 9.7489, lon: -83.7534, population: 5152950 },
    { name: "Croácia", lat: 45.1, lon: 15.2, population: 3848160 },
    { name: "Cuba", lat: 21.5218, lon: -77.7812, population: 10937203 },
    { name: "Dinamarca", lat: 56.2639, lon: 9.5018, population: 6002507 },
    { name: "Djibuti", lat: 11.8251, lon: 42.5903, population: 1184076 },
    { name: "Egito", lat: 26.8206, lon: 30.8025, population: 118365995 },
    { name: "El Salvador", lat: 13.7942, lon: -88.8965, population: 6365503 },
    {
      name: "Emirados Árabes Unidos",
      lat: 23.4241,
      lon: 53.8478,
      population: 11346000,
    },
    { name: "Equador", lat: -1.8312, lon: -78.1834, population: 18289896 },
    { name: "Eslováquia", lat: 48.669, lon: 19.699, population: 5474881 },
    { name: "Eslovênia", lat: 46.1512, lon: 14.9955, population: 2117072 },
    { name: "Espanha", lat: 40.4637, lon: -3.7492, population: 47889958 },
    {
      name: "Estados Unidos",
      lat: 37.0902,
      lon: -95.7129,
      population: 347275807,
    },
    { name: "Estônia", lat: 58.5953, lon: 25.0136, population: 1344232 },
    { name: "Etiópia", lat: 9.145, lon: 40.4897, population: 135472051 },
    { name: "Fiji", lat: -17.7134, lon: 178.065, population: 933154 },
    { name: "Filipinas", lat: 12.8797, lon: 121.774, population: 116786962 },
    { name: "Finlândia", lat: 61.9241, lon: 25.7482, population: 5623329 },
    { name: "França", lat: 46.2276, lon: 2.2137, population: 66650804 },
    { name: "Gabão", lat: -0.8037, lon: 11.6094, population: 2593130 },
    { name: "Gâmbia", lat: 13.4432, lon: -15.3101, population: 2822093 },
    { name: "Gana", lat: 7.9465, lon: -1.0232, population: 35064272 },
    { name: "Geórgia", lat: 42.3154, lon: 43.3569, population: 3806671 },
    { name: "Grécia", lat: 39.0742, lon: 21.8243, population: 9938844 },
    { name: "Guatemala", lat: 15.7835, lon: -90.2308, population: 18687881 },
    { name: "Guiana", lat: 4.8604, lon: -58.9302, population: 835986 },
    { name: "Guiné", lat: 9.9456, lon: -9.6966, population: 15099727 },
    { name: "Haiti", lat: 18.9712, lon: -72.2852, population: 11906095 },
    { name: "Holanda", lat: 52.1326, lon: 5.2913, population: 18346819 },
    { name: "Honduras", lat: 15.2, lon: -86.2419, population: 11005850 },
    { name: "Hungria", lat: 47.1625, lon: 19.5033, population: 9632287 },
    { name: "Iêmen", lat: 15.5527, lon: 48.5164, population: 41773878 },
    { name: "Índia", lat: 20.5937, lon: 78.9629, population: 1463865525 },
    { name: "Indonésia", lat: -0.7893, lon: 113.9213, population: 285721236 },
    { name: "Irã", lat: 32.4279, lon: 53.688, population: 92417681 },
    { name: "Iraque", lat: 33.2232, lon: 43.6793, population: 47020774 },
    { name: "Irlanda", lat: 53.4129, lon: -8.2439, population: 5308039 },
    { name: "Islândia", lat: 64.9631, lon: -19.0208, population: 398266 },
    { name: "Israel", lat: 31.0461, lon: 34.8516, population: 9517181 },
    { name: "Itália", lat: 41.8719, lon: 12.5674, population: 59146260 },
    { name: "Jamaica", lat: 18.1096, lon: -77.2975, population: 2837077 },
    { name: "Japão", lat: 36.2048, lon: 138.2529, population: 123103479 },
    { name: "Jordânia", lat: 30.5852, lon: 36.2384, population: 11520684 },
    { name: "Kuwait", lat: 29.3117, lon: 47.4818, population: 5026078 },
    { name: "Laos", lat: 19.8563, lon: 102.4955, population: 7873046 },
    { name: "Letônia", lat: 56.8796, lon: 24.6032, population: 1853559 },
    { name: "Líbano", lat: 33.8547, lon: 35.8623, population: 5849421 },
    { name: "Libéria", lat: 6.4281, lon: -9.4295, population: 5731206 },
    { name: "Líbia", lat: 26.3351, lon: 17.2283, population: 7458555 },
    { name: "Liechtenstein", lat: 47.166, lon: 9.5554, population: 40128 },
    { name: "Lituânia", lat: 55.1694, lon: 23.8813, population: 2830144 },
    { name: "Luxemburgo", lat: 49.8153, lon: 6.1296, population: 680453 },
    {
      name: "Macedônia do Norte",
      lat: 41.6086,
      lon: 21.7453,
      population: 1813791,
    },
    { name: "Madagascar", lat: -18.7669, lon: 46.8691, population: 32740678 },
    { name: "Malásia", lat: 4.2105, lon: 101.9758, population: 35977838 },
    { name: "Malawi", lat: -13.2543, lon: 34.3015, population: 22216120 },
    { name: "Maldivas", lat: 3.2028, lon: 73.2207, population: 529676 },
    { name: "Mali", lat: 17.5707, lon: -3.9962, population: 25198821 },
    { name: "Malta", lat: 35.9375, lon: 14.3754, population: 545405 },
    { name: "Marrocos", lat: 31.7917, lon: -7.0926, population: 38430770 },
    { name: "Mauritânia", lat: 21.0079, lon: -10.9408, population: 5315065 },
    { name: "México", lat: 23.6345, lon: -102.5528, population: 131946900 },
    { name: "Moçambique", lat: -18.6657, lon: 35.5296, population: 35631653 },
    { name: "Moldávia", lat: 47.4116, lon: 28.3699, population: 2996106 },
    { name: "Mônaco", lat: 43.7384, lon: 7.4246, population: 38341 },
    { name: "Mongólia", lat: 46.8625, lon: 103.8467, population: 3517100 },
    { name: "Montenegro", lat: 42.7087, lon: 19.3744, population: 632729 },
    { name: "Myanmar", lat: 21.914, lon: 95.956, population: 54850648 },
    { name: "Namíbia", lat: -22.9576, lon: 18.4904, population: 3092816 },
    { name: "Nepal", lat: 28.3949, lon: 84.124, population: 29618118 },
    { name: "Nicarágua", lat: 12.8654, lon: -85.2072, population: 7007502 },
    { name: "Níger", lat: 17.6078, lon: 8.0817, population: 27917831 },
    { name: "Nigéria", lat: 9.082, lon: 8.6753, population: 237527782 },
    { name: "Noruega", lat: 60.472, lon: 8.4689, population: 5623071 },
    { name: "Nova Zelândia", lat: -40.9006, lon: 174.886, population: 5251899 },
    { name: "Omã", lat: 21.5126, lon: 55.9233, population: 5494691 },
    { name: "Panamá", lat: 8.538, lon: -80.7821, population: 4571189 },
    {
      name: "Papua Nova Guiné",
      lat: -6.315,
      lon: 143.9555,
      population: 10762817,
    },
    { name: "Paquistão", lat: 30.3753, lon: 69.3451, population: 255219554 },
    { name: "Paraguai", lat: -23.4425, lon: -58.4438, population: 7013078 },
    { name: "Peru", lat: -9.19, lon: -75.0152, population: 34576665 },
    { name: "Polônia", lat: 51.9194, lon: 19.1451, population: 38140910 },
    { name: "Portugal", lat: 39.3999, lon: -8.2245, population: 10411834 },
    { name: "Quênia", lat: -0.0236, lon: 37.9062, population: 57532493 },
    { name: "Reino Unido", lat: 55.3781, lon: -3.436, population: 69551332 },
    {
      name: "República Centro-Africana",
      lat: 6.6111,
      lon: 20.9394,
      population: 5513282,
    },
    {
      name: "República Tcheca",
      lat: 49.8175,
      lon: 15.473,
      population: 10609239,
    },
    {
      name: "República Dominicana",
      lat: 18.7357,
      lon: -70.1627,
      population: 11520487,
    },
    { name: "Romênia", lat: 45.9432, lon: 24.9668, population: 18908650 },
    { name: "Ruanda", lat: -1.9403, lon: 29.8739, population: 14569341 },
    { name: "Rússia", lat: 61.524, lon: 105.3188, population: 143997393 },
    { name: "Senegal", lat: 14.4974, lon: -14.4524, population: 18931966 },
    { name: "Sérvia", lat: 44.0165, lon: 21.0059, population: 6689039 },
    { name: "Serra Leoa", lat: 8.4606, lon: -11.7799, population: 8819794 },
    { name: "Singapura", lat: 1.3521, lon: 103.8198, population: 5870750 },
    { name: "Síria", lat: 34.8021, lon: 38.9968, population: 25620427 },
    { name: "Somália", lat: 5.1521, lon: 46.1996, population: 19654739 },
    { name: "Sri Lanka", lat: 7.8731, lon: 80.7718, population: 23229470 },
    { name: "Suazilândia", lat: -26.5225, lon: 31.4659, population: 1256174 },
    { name: "Sudão", lat: 12.8628, lon: 30.2176, population: 51662147 },
    { name: "Sudão do Sul", lat: 6.877, lon: 31.307, population: 12188788 },
    { name: "Suécia", lat: 60.1282, lon: 18.6435, population: 10656633 },
    { name: "Suíça", lat: 46.8182, lon: 8.2275, population: 8967407 },
    { name: "Suriname", lat: 3.9193, lon: -56.0278, population: 639850 },
    { name: "Tadjiquistão", lat: 38.861, lon: 71.2761, population: 10786734 },
    { name: "Tailândia", lat: 15.87, lon: 100.9925, population: 71619863 },
    { name: "Tanzânia", lat: -6.369, lon: 34.8888, population: 70545865 },
    { name: "Timor-Leste", lat: -8.8742, lon: 125.7275, population: 1418517 },
    { name: "Togo", lat: 8.6195, lon: 0.8248, population: 9721608 },
    {
      name: "Trindade e Tobago",
      lat: 10.6918,
      lon: -61.2225,
      population: 1511155,
    },
    { name: "Tunísia", lat: 33.8869, lon: 9.5375, population: 12348573 },
    { name: "Turcomenistão", lat: 38.9697, lon: 59.5563, population: 7618847 },
    { name: "Turquia", lat: 38.9637, lon: 35.2433, population: 87685426 },
    { name: "Ucrânia", lat: 48.3794, lon: 31.1656, population: 38980376 },
    { name: "Uganda", lat: 1.3733, lon: 32.2903, population: 51384894 },
    { name: "Uruguai", lat: -32.5228, lon: -55.7658, population: 3384688 },
    { name: "Uzbequistão", lat: 41.3775, lon: 64.5853, population: 37053428 },
    { name: "Venezuela", lat: 6.4238, lon: -66.5897, population: 28516896 },
    { name: "Vietnã", lat: 14.0583, lon: 108.2772, population: 101598527 },
    { name: "Zâmbia", lat: -13.1339, lon: 27.8493, population: 21913874 },
    { name: "Zimbábue", lat: -19.0154, lon: 29.1549, population: 16950795 },
    {
      name: "Antígua e Barbuda",
      lat: 17.0608,
      lon: -61.7964,
      population: 94209,
    },
    { name: "Bahrein", lat: 26.0667, lon: 50.5577, population: 1643332 },
    { name: "Burundi", lat: -3.3731, lon: 29.9189, population: 14390003 },
    { name: "Comores", lat: -11.6455, lon: 43.3333, population: 882847 },
    { name: "Dominica", lat: 15.415, lon: -61.371, population: 65871 },
    { name: "Eritreia", lat: 15.1794, lon: 39.7823, population: 3607003 },
    { name: "Granada", lat: 12.1165, lon: -61.679, population: 117303 },
    { name: "Guiné-Bissau", lat: 11.8037, lon: -15.1804, population: 2249515 },
    {
      name: "Guiné Equatorial",
      lat: 1.6508,
      lon: 10.2679,
      population: 1938431,
    },
    { name: "Ilhas Marshall", lat: 7.1315, lon: 171.1845, population: 36282 },
    { name: "Ilhas Salomão", lat: -9.6457, lon: 160.1562, population: 838645 },
    { name: "Kiribati", lat: 1.8709, lon: -157.3592, population: 136488 },
    { name: "Lesoto", lat: -29.61, lon: 28.2336, population: 2363325 },
    { name: "Micronésia", lat: 7.4256, lon: 150.5508, population: 113683 },
    { name: "Nauru", lat: -0.5228, lon: 166.9315, population: 12025 },
    { name: "Palau", lat: 7.515, lon: 134.5825, population: 17663 },
    { name: "Quirguistão", lat: 41.2044, lon: 74.7661, population: 7295034 },
    { name: "Samoa", lat: -13.759, lon: -172.1046, population: 219306 },
    {
      name: "São Cristóvão e Névis",
      lat: 17.3578,
      lon: -62.783,
      population: 46922,
    },
    { name: "Santa Lúcia", lat: 13.9094, lon: -60.9789, population: 180149 },
    { name: "São Marino", lat: 43.9424, lon: 12.4578, population: 33572 },
    {
      name: "São Tomé e Príncipe",
      lat: 0.1864,
      lon: 6.6131,
      population: 240254,
    },
    {
      name: "São Vicente e Granadinas",
      lat: 13.2528,
      lon: -61.1971,
      population: 99924,
    },
    { name: "Seicheles", lat: -4.6796, lon: 55.492, population: 132779 },
    { name: "Tonga", lat: -21.179, lon: -175.1982, population: 103742 },
    { name: "Tuvalu", lat: -7.1095, lon: 177.6493, population: 9492 },
    { name: "Vanuatu", lat: -15.3767, lon: 166.9592, population: 335169 },
    { name: "Vaticano", lat: 41.9029, lon: 12.4534, population: 501 },
  ]
    .map((c) => ({ ...c, norm: normalize(c.name) }))
    .sort((a, b) => a.norm.localeCompare(b.norm));

  const MAX_ATTEMPTS = 6;
  let remainingAttempts,
    targetCountry,
    gameOver,
    guessHistory,
    guessHistoryData;

  // --- 3. FUNÇÕES DE LÓGICA E CÁLCULO (sem alterações) ---
  function normalize(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
  function getDailySeed() {
    const t = new Date();
    return t.getFullYear() * 10000 + (t.getMonth() + 1) * 100 + t.getDate();
  }
  function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  function calculateBearing(lat1, lon1, lat2, lon2) {
    lat1 *= Math.PI / 180;
    lon1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lon2 *= Math.PI / 180;
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  }
  function getDirectionArrow(bearing) {
    if (bearing >= 337.5 || bearing < 22.5) return "⬆️";
    if (bearing >= 22.5 && bearing < 67.5) return "↗️";
    if (bearing >= 67.5 && bearing < 112.5) return "➡️";
    if (bearing >= 112.5 && bearing < 157.5) return "↘️";
    if (bearing >= 157.5 && bearing < 202.5) return "⬇️";
    if (bearing >= 202.5 && bearing < 247.5) return "↙️";
    if (bearing >= 247.5 && bearing < 292.5) return "⬅️";
    if (bearing >= 292.5 && bearing < 337.5) return "↖️";
    return "🌍";
  }

  // --- 4. FUNÇÃO DE INICIALIZAÇÃO E ROTEAMENTO ---
  function initGame() {
    const todaySeed = getDailySeed();
    const dailyGames =
      JSON.parse(localStorage.getItem("geoTermoDailyGames")) || {};
    const stats = loadStats();

    const dailyIndex = Math.floor(seededRandom(todaySeed) * countries.length);
    targetCountry = countries[dailyIndex];

    if (dailyGames[todaySeed]) {
      showAlreadyPlayedScreen(dailyGames[todaySeed], stats);
    } else {
      startNewGame();
    }
  }

  function startNewGame() {
    gameContainer.classList.remove("hidden");
    alreadyPlayedContainer.classList.add("hidden");

    remainingAttempts = MAX_ATTEMPTS;
    gameOver = false;
    guessHistory = [];
    guessHistoryData = [];

    guessesContainer.innerHTML = "";
    gameOverMessage.classList.add("hidden");
    countryInput.disabled = false;
    guessButton.disabled = false;
    countryInput.value = "";
    countryInput.focus();
  }

  function showAlreadyPlayedScreen(gameData, stats) {
    gameContainer.classList.add("hidden");
    alreadyPlayedContainer.classList.remove("hidden");

    pastGuessesContainer.innerHTML = "";

    gameData.guesses.forEach((guess) => {
      const distance = calculateDistance(
        guess.lat,
        guess.lon,
        targetCountry.lat,
        targetCountry.lon
      );
      const bearing = calculateBearing(
        guess.lat,
        guess.lon,
        targetCountry.lat,
        targetCountry.lon
      );
      const direction = distance < 1 ? "🎉" : getDirectionArrow(bearing);
      const proximity = Math.max(0, 100 - (distance / 20000) * 100);
      let populationHint = "↔️";
      if (targetCountry.population > guess.population) populationHint = "⬆️";
      else if (targetCountry.population < guess.population)
        populationHint = "⬇️";
      if (distance < 1) populationHint = "✅";

      addGuessToGrid(
        guess.name,
        distance,
        direction,
        populationHint,
        proximity,
        pastGuessesContainer
      );
    });

    if (gameData.win) {
      pastFinalText.innerHTML = `Você acertou! O país era <strong class="text-emerald-400">${targetCountry.name}</strong>.`;
    } else {
      pastFinalText.innerHTML = `Você não acertou. O país era <strong class="text-red-400">${targetCountry.name}</strong>.`;
    }

    displayMap(targetCountry, gameData.guesses, pastMapContainer);
    displayStats(stats);
    startCountdown();
  }

  // --- 5. LÓGICA DE ESTATÍSTICAS E LOCALSTORAGE ---
  const defaultStats = {
    gamesPlayed: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
  };
  function loadStats() {
    return JSON.parse(localStorage.getItem("geoTermoStats")) || defaultStats;
  }
  function saveStats(stats) {
    localStorage.setItem("geoTermoStats", JSON.stringify(stats));
  }
  function displayStats(stats) {
    statsPlayed.textContent = stats.gamesPlayed;
    statsWins.textContent =
      stats.gamesPlayed > 0
        ? `${Math.round((stats.wins / stats.gamesPlayed) * 100)}%`
        : "0%";
    statsCurrentStreak.textContent = stats.currentStreak;
    statsMaxStreak.textContent = stats.maxStreak;
  }

  // --- 6. CONTADOR REGRESSIVO ---
  function startCountdown() {
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      const diff = tomorrow - now;

      if (diff <= 0) {
        clearInterval(countdownInterval);
        window.location.reload();
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdownTimer.textContent = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }, 1000);
  }

  // --- 7. FUNÇÕES DE JOGO ATIVO ---
  function handleGuess() {
    if (gameOver) return;
    const guessName = countryInput.value.trim();
    const guessedCountry = countries.find(
      (c) => c.norm === normalize(guessName)
    );

    if (!guessedCountry) {
      alert("País não encontrado. Use uma das sugestões.");
      return;
    }

    remainingAttempts--;
    const distance = calculateDistance(
      guessedCountry.lat,
      guessedCountry.lon,
      targetCountry.lat,
      targetCountry.lon
    );
    const bearing = calculateBearing(
      guessedCountry.lat,
      guessedCountry.lon,
      targetCountry.lat,
      targetCountry.lon
    );
    const direction = distance < 1 ? "🎉" : getDirectionArrow(bearing);
    const proximity = Math.max(0, 100 - (distance / 20000) * 100);
    let populationHint = "↔️";
    if (targetCountry.population > guessedCountry.population)
      populationHint = "⬆️";
    else if (targetCountry.population < guessedCountry.population)
      populationHint = "⬇️";
    if (distance < 1) populationHint = "✅";

    addGuessToGrid(
      guessedCountry.name,
      distance,
      direction,
      populationHint,
      proximity,
      guessesContainer
    );
    guessHistory.push(proximity);
    guessHistoryData.push(guessedCountry);
    countryInput.value = "";
    hideSuggestions();

    if (distance < 1) endGame(true);
    else if (remainingAttempts === 0) endGame(false);
  }

  function addGuessToGrid(
    name,
    distance,
    direction,
    populationHint,
    proximity,
    container
  ) {
    const guessRow = document.createElement("div");
    // CORRIGIDO: O grid agora é de 5 colunas
    guessRow.className =
      "grid grid-cols-5 gap-1 md:gap-2 items-center bg-gray-700 p-2 rounded-lg text-sm md:text-base animate-reveal";
    // CORRIGIDO: O innerHTML foi preenchido corretamente
    guessRow.innerHTML = `
            <div class="truncate pr-2">${name}</div>
            <div class="text-center">${Math.round(distance).toLocaleString(
              "pt-BR"
            )} km</div>
            <div class="text-center text-2xl">${direction}</div>
            <div class="text-center text-2xl font-bold">${populationHint}</div>
            <div class="flex items-center gap-2">
                <div class="w-full bg-gray-600 rounded-full h-5 overflow-hidden">
                    <div class="h-full rounded-full progress-bar-gradient" style="width: ${proximity}%;"></div>
                </div>
                <span class="font-bold text-xs">${Math.round(proximity)}%</span>
            </div>
        `;
    container.appendChild(guessRow);
  }

  function endGame(isWin) {
    gameOver = true;
    countryInput.disabled = true;
    guessButton.disabled = true;

    const stats = loadStats();
    stats.gamesPlayed++;
    if (isWin) {
      stats.wins++;
      stats.currentStreak++;
      stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
      finalText.innerHTML = `Parabéns! Você acertou! O país era <strong class="text-emerald-400">${targetCountry.name}</strong>.`;
    } else {
      stats.currentStreak = 0;
      finalText.innerHTML = `Fim de jogo! O país secreto era <strong class="text-red-400">${targetCountry.name}</strong>.`;
    }
    saveStats(stats);

    const todaySeed = getDailySeed();
    const dailyGames =
      JSON.parse(localStorage.getItem("geoTermoDailyGames")) || {};
    dailyGames[todaySeed] = { win: isWin, guesses: guessHistoryData };
    localStorage.setItem("geoTermoDailyGames", JSON.stringify(dailyGames));

    gameOverMessage.classList.remove("hidden");
    displayMap(targetCountry, guessHistoryData, mapContainer);
  }

  function displayMap(target, guesses, mapContainerElement) {
    // Limpa o container do mapa para evitar erros de reinicialização do Leaflet
    mapContainerElement.innerHTML = "";

    const localMap = L.map(mapContainerElement).setView([20, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(localMap);

    const targetMarker = L.circleMarker([target.lat, target.lon], {
      radius: 8,
      color: "#22c55e",
      fillColor: "#22c55e",
      fillOpacity: 0.8,
    }).addTo(localMap);
    targetMarker.bindPopup(`<b>País Secreto: ${target.name}</b>`).openPopup();

    guesses.forEach((guess, index) => {
      const guessMarker = L.circleMarker([guess.lat, guess.lon], {
        radius: 6,
        color: "#ef4444",
        fillColor: "#ef4444",
        fillOpacity: 0.6,
      }).addTo(localMap);
      guessMarker.bindPopup(`<b>${index + 1}º Palpite:</b> ${guess.name}`);
      L.polyline(
        [
          [guess.lat, guess.lon],
          [target.lat, target.lon],
        ],
        { color: "#4a5568", weight: 2, dashArray: "5, 5" }
      ).addTo(localMap);
    });
  }

  // --- 8. AUTOCOMPLETE E EVENT LISTENERS ---
  function handleAutocomplete() {
    /* ... código original ... */
  }
  function hideSuggestions() {
    /* ... código original ... */
  }
  // (O código de autocomplete e os event listeners permanecem os mesmos)
  function handleAutocomplete() {
    const value = normalize(countryInput.value);
    if (!value) return hideSuggestions();
    const filtered = countries
      .filter((c) => c.norm.startsWith(value))
      .slice(0, 5);
    if (filtered.length) {
      suggestionsBox.innerHTML = filtered
        .map(
          (c) =>
            `<div class="p-2 hover:bg-gray-700 cursor-pointer suggestion-item">${c.name}</div>`
        )
        .join("");
      suggestionsBox.classList.remove("hidden");
    } else {
      hideSuggestions();
    }
  }
  function hideSuggestions() {
    suggestionsBox.classList.add("hidden");
  }

  guessButton.addEventListener("click", handleGuess);
  countryInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !gameOver) handleGuess();
  });
  countryInput.addEventListener("input", handleAutocomplete);
  suggestionsBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("suggestion-item")) {
      countryInput.value = e.target.textContent;
      hideSuggestions();
      countryInput.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (
      !countryInput.contains(e.target) &&
      !suggestionsBox.contains(e.target)
    ) {
      hideSuggestions();
    }
  });
  shareButton.addEventListener("click", () => {
    const attemptCount = MAX_ATTEMPTS - remainingAttempts;
    const title = `GeoTermo ${new Date().toLocaleDateString(
      "pt-BR"
    )} ${attemptCount}/${MAX_ATTEMPTS}`;
    const squares = guessHistory
      .map((prox) => {
        if (prox > 95) return "🟩";
        if (prox > 75) return "🟨";
        if (prox > 50) return "🟧";
        return "🟥";
      })
      .join("");
    const textToCopy = `${title}\n${squares}\n\nJogue também: [LINK DO SEU JOGO]`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Resultado copiado para a área de transferência!");
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err);
      });
  });

  // --- 9. INICIA O JOGO AO CARREGAR A PÁGINA ---
  initGame();
});

// A animação no final do arquivo permanece a mesma
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes reveal {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-reveal {
  animation: reveal 0.3s ease-out;
}
`;
document.head.appendChild(styleSheet);
