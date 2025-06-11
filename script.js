document.addEventListener("DOMContentLoaded", () => {
  // --- ELEMENTOS DO DOM ---
  const countryInput = document.getElementById("country-input");
  const guessButton = document.getElementById("guess-button");
  const guessesContainer = document.getElementById("guesses-container");
  const suggestionsBox = document.getElementById("suggestions-box");
  const gameOverMessage = document.getElementById("game-over-message");
  const finalText = document.getElementById("final-text");
  const shareButton = document.getElementById("share-button");

  function normalize(text) {
    return text
      .normalize("NFD") // separa base + acento
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .toLowerCase(); // caixa baixa p/ comparação
  }

  // --- DADOS DO JOGO ---
  // Uma lista simplificada de países. Em um projeto real, isso viria de um API ou um arquivo JSON maior.
  const countries = [
    { name: "Afeganistão", lat: 33.9391, lon: 67.71 },
    { name: "África do Sul", lat: -30.5595, lon: 22.9375 },
    { name: "Albânia", lat: 41.1533, lon: 20.1683 },
    { name: "Alemanha", lat: 51.1657, lon: 10.4515 },
    { name: "Andorra", lat: 42.5462, lon: 1.6016 },
    { name: "Angola", lat: -11.2027, lon: 17.8739 },
    { name: "Arábia Saudita", lat: 23.8859, lon: 45.0792 },
    { name: "Argélia", lat: 28.0339, lon: 1.6596 },
    { name: "Argentina", lat: -38.4161, lon: -63.6167 },
    { name: "Armênia", lat: 40.0691, lon: 45.0382 },
    { name: "Austrália", lat: -25.2744, lon: 133.7751 },
    { name: "Áustria", lat: 47.5162, lon: 14.5501 },
    { name: "Azerbaijão", lat: 40.1431, lon: 47.5769 },
    { name: "Bahamas", lat: 25.0343, lon: -77.3963 },
    { name: "Bangladesh", lat: 23.685, lon: 90.3563 },
    { name: "Barbados", lat: 13.1939, lon: -59.5432 },
    { name: "Bélgica", lat: 50.8503, lon: 4.3517 },
    { name: "Belize", lat: 17.1899, lon: -88.4976 },
    { name: "Bielorrússia", lat: 53.7098, lon: 27.9534 },
    { name: "Bolívia", lat: -16.2902, lon: -63.5887 },
    { name: "Bósnia e Herzegovina", lat: 43.9159, lon: 17.6791 },
    { name: "Botsuana", lat: -22.3285, lon: 24.6849 },
    { name: "Brasil", lat: -14.235, lon: -51.9253 },
    { name: "Brunei", lat: 4.5353, lon: 114.7277 },
    { name: "Bulgária", lat: 42.7339, lon: 25.4858 },
    { name: "Burkina Faso", lat: 12.2383, lon: -1.5616 },
    { name: "Butão", lat: 27.5142, lon: 90.4336 },
    { name: "Cabo Verde", lat: 16.5388, lon: -23.0418 },
    { name: "Camarões", lat: 7.3697, lon: 12.3547 },
    { name: "Camboja", lat: 12.5657, lon: 104.991 },
    { name: "Canadá", lat: 56.1304, lon: -106.3468 },
    { name: "Catar", lat: 25.3548, lon: 51.1839 },
    { name: "Cazaquistão", lat: 48.0196, lon: 66.9237 },
    { name: "Chade", lat: 15.4542, lon: 18.7322 },
    { name: "Chile", lat: -35.6751, lon: -71.543 },
    { name: "China", lat: 35.8617, lon: 104.1954 },
    { name: "Chipre", lat: 35.1264, lon: 33.4299 },
    { name: "Colômbia", lat: 4.5709, lon: -74.2973 },
    { name: "Coreia do Norte", lat: 40.3399, lon: 127.5101 },
    { name: "Coreia do Sul", lat: 35.9078, lon: 127.7669 },
    { name: "Costa do Marfim", lat: 7.54, lon: -5.5471 },
    { name: "Costa Rica", lat: 9.7489, lon: -83.7534 },
    { name: "Croácia", lat: 45.1, lon: 15.2 },
    { name: "Cuba", lat: 21.5218, lon: -77.7812 },
    { name: "Dinamarca", lat: 56.2639, lon: 9.5018 },
    { name: "Djibuti", lat: 11.8251, lon: 42.5903 },
    { name: "Egito", lat: 26.8206, lon: 30.8025 },
    { name: "El Salvador", lat: 13.7942, lon: -88.8965 },
    { name: "Emirados Árabes Unidos", lat: 23.4241, lon: 53.8478 },
    { name: "Equador", lat: -1.8312, lon: -78.1834 },
    { name: "Eslováquia", lat: 48.669, lon: 19.699 },
    { name: "Eslovênia", lat: 46.1512, lon: 14.9955 },
    { name: "Espanha", lat: 40.4637, lon: -3.7492 },
    { name: "Estados Unidos", lat: 37.0902, lon: -95.7129 },
    { name: "Estônia", lat: 58.5953, lon: 25.0136 },
    { name: "Etiópia", lat: 9.145, lon: 40.4897 },
    { name: "Fiji", lat: -17.7134, lon: 178.065 },
    { name: "Filipinas", lat: 12.8797, lon: 121.774 },
    { name: "Finlândia", lat: 61.9241, lon: 25.7482 },
    { name: "França", lat: 46.2276, lon: 2.2137 },
    { name: "Gabão", lat: -0.8037, lon: 11.6094 },
    { name: "Gâmbia", lat: 13.4432, lon: -15.3101 },
    { name: "Gana", lat: 7.9465, lon: -1.0232 },
    { name: "Geórgia", lat: 42.3154, lon: 43.3569 },
    { name: "Grécia", lat: 39.0742, lon: 21.8243 },
    { name: "Guatemala", lat: 15.7835, lon: -90.2308 },
    { name: "Guiana", lat: 4.8604, lon: -58.9302 },
    { name: "Guiné", lat: 9.9456, lon: -9.6966 },
    { name: "Haiti", lat: 18.9712, lon: -72.2852 },
    { name: "Holanda", lat: 52.1326, lon: 5.2913 },
    { name: "Honduras", lat: 15.2, lon: -86.2419 },
    { name: "Hungria", lat: 47.1625, lon: 19.5033 },
    { name: "Iêmen", lat: 15.5527, lon: 48.5164 },
    { name: "Índia", lat: 20.5937, lon: 78.9629 },
    { name: "Indonésia", lat: -0.7893, lon: 113.9213 },
    { name: "Irã", lat: 32.4279, lon: 53.688 },
    { name: "Iraque", lat: 33.2232, lon: 43.6793 },
    { name: "Irlanda", lat: 53.4129, lon: -8.2439 },
    { name: "Islândia", lat: 64.9631, lon: -19.0208 },
    { name: "Israel", lat: 31.0461, lon: 34.8516 },
    { name: "Itália", lat: 41.8719, lon: 12.5674 },
    { name: "Jamaica", lat: 18.1096, lon: -77.2975 },
    { name: "Japão", lat: 36.2048, lon: 138.2529 },
    { name: "Jordânia", lat: 30.5852, lon: 36.2384 },
    { name: "Kuwait", lat: 29.3117, lon: 47.4818 },
    { name: "Laos", lat: 19.8563, lon: 102.4955 },
    { name: "Letônia", lat: 56.8796, lon: 24.6032 },
    { name: "Líbano", lat: 33.8547, lon: 35.8623 },
    { name: "Libéria", lat: 6.4281, lon: -9.4295 },
    { name: "Líbia", lat: 26.3351, lon: 17.2283 },
    { name: "Liechtenstein", lat: 47.166, lon: 9.5554 },
    { name: "Lituânia", lat: 55.1694, lon: 23.8813 },
    { name: "Luxemburgo", lat: 49.8153, lon: 6.1296 },
    { name: "Macedônia do Norte", lat: 41.6086, lon: 21.7453 },
    { name: "Madagascar", lat: -18.7669, lon: 46.8691 },
    { name: "Malásia", lat: 4.2105, lon: 101.9758 },
    { name: "Malawi", lat: -13.2543, lon: 34.3015 },
    { name: "Maldivas", lat: 3.2028, lon: 73.2207 },
    { name: "Mali", lat: 17.5707, lon: -3.9962 },
    { name: "Malta", lat: 35.9375, lon: 14.3754 },
    { name: "Marrocos", lat: 31.7917, lon: -7.0926 },
    { name: "Mauritânia", lat: 21.0079, lon: -10.9408 },
    { name: "México", lat: 23.6345, lon: -102.5528 },
    { name: "Moçambique", lat: -18.6657, lon: 35.5296 },
    { name: "Moldávia", lat: 47.4116, lon: 28.3699 },
    { name: "Mônaco", lat: 43.7384, lon: 7.4246 },
    { name: "Mongólia", lat: 46.8625, lon: 103.8467 },
    { name: "Montenegro", lat: 42.7087, lon: 19.3744 },
    { name: "Myanmar", lat: 21.914, lon: 95.956 },
    { name: "Namíbia", lat: -22.9576, lon: 18.4904 },
    { name: "Nepal", lat: 28.3949, lon: 84.124 },
    { name: "Nicarágua", lat: 12.8654, lon: -85.2072 },
    { name: "Níger", lat: 17.6078, lon: 8.0817 },
    { name: "Nigéria", lat: 9.082, lon: 8.6753 },
    { name: "Noruega", lat: 60.472, lon: 8.4689 },
    { name: "Nova Zelândia", lat: -40.9006, lon: 174.886 },
    { name: "Omã", lat: 21.5126, lon: 55.9233 },
    { name: "Panamá", lat: 8.538, lon: -80.7821 },
    { name: "Papua Nova Guiné", lat: -6.315, lon: 143.9555 },
    { name: "Paquistão", lat: 30.3753, lon: 69.3451 },
    { name: "Paraguai", lat: -23.4425, lon: -58.4438 },
    { name: "Peru", lat: -9.19, lon: -75.0152 },
    { name: "Polônia", lat: 51.9194, lon: 19.1451 },
    { name: "Portugal", lat: 39.3999, lon: -8.2245 },
    { name: "Quênia", lat: -0.0236, lon: 37.9062 },
    { name: "Reino Unido", lat: 55.3781, lon: -3.436 },
    { name: "República Centro-Africana", lat: 6.6111, lon: 20.9394 },
    { name: "República Tcheca", lat: 49.8175, lon: 15.473 },
    { name: "República Dominicana", lat: 18.7357, lon: -70.1627 },
    { name: "Romênia", lat: 45.9432, lon: 24.9668 },
    { name: "Ruanda", lat: -1.9403, lon: 29.8739 },
    { name: "Rússia", lat: 61.524, lon: 105.3188 },
    { name: "Senegal", lat: 14.4974, lon: -14.4524 },
    { name: "Sérvia", lat: 44.0165, lon: 21.0059 },
    { name: "Serra Leoa", lat: 8.4606, lon: -11.7799 },
    { name: "Singapura", lat: 1.3521, lon: 103.8198 },
    { name: "Síria", lat: 34.8021, lon: 38.9968 },
    { name: "Somália", lat: 5.1521, lon: 46.1996 },
    { name: "Sri Lanka", lat: 7.8731, lon: 80.7718 },
    { name: "Suazilândia", lat: -26.5225, lon: 31.4659 },
    { name: "Sudão", lat: 12.8628, lon: 30.2176 },
    { name: "Sudão do Sul", lat: 6.877, lon: 31.307 },
    { name: "Suécia", lat: 60.1282, lon: 18.6435 },
    { name: "Suíça", lat: 46.8182, lon: 8.2275 },
    { name: "Suriname", lat: 3.9193, lon: -56.0278 },
    { name: "Tadjiquistão", lat: 38.861, lon: 71.2761 },
    { name: "Tailândia", lat: 15.87, lon: 100.9925 },
    { name: "Tanzânia", lat: -6.369, lon: 34.8888 },
    { name: "Timor-Leste", lat: -8.8742, lon: 125.7275 },
    { name: "Togo", lat: 8.6195, lon: 0.8248 },
    { name: "Trindade e Tobago", lat: 10.6918, lon: -61.2225 },
    { name: "Tunísia", lat: 33.8869, lon: 9.5375 },
    { name: "Turcomenistão", lat: 38.9697, lon: 59.5563 },
    { name: "Turquia", lat: 38.9637, lon: 35.2433 },
    { name: "Ucrânia", lat: 48.3794, lon: 31.1656 },
    { name: "Uganda", lat: 1.3733, lon: 32.2903 },
    { name: "Uruguai", lat: -32.5228, lon: -55.7658 },
    { name: "Uzbequistão", lat: 41.3775, lon: 64.5853 },
    { name: "Venezuela", lat: 6.4238, lon: -66.5897 },
    { name: "Vietnã", lat: 14.0583, lon: 108.2772 },
    { name: "Zâmbia", lat: -13.1339, lon: 27.8493 },
    { name: "Zimbábue", lat: -19.0154, lon: 29.1549 },
    { name: "Antígua e Barbuda", lat: 17.0608, lon: -61.7964 },
    { name: "Bahrein", lat: 26.0667, lon: 50.5577 },
    { name: "Burundi", lat: -3.3731, lon: 29.9189 },
    { name: "Comores", lat: -11.6455, lon: 43.3333 },
    { name: "Dominica", lat: 15.415, lon: -61.371 },
    { name: "Eritreia", lat: 15.1794, lon: 39.7823 },
    { name: "Granada", lat: 12.1165, lon: -61.679 },
    { name: "Guiné-Bissau", lat: 11.8037, lon: -15.1804 },
    { name: "Guiné Equatorial", lat: 1.6508, lon: 10.2679 },
    { name: "Ilhas Marshall", lat: 7.1315, lon: 171.1845 },
    { name: "Ilhas Salomão", lat: -9.6457, lon: 160.1562 },
    { name: "Kiribati", lat: 1.8709, lon: -157.3592 },
    { name: "Lesoto", lat: -29.61, lon: 28.2336 },
    { name: "Micronésia", lat: 7.4256, lon: 150.5508 },
    { name: "Nauru", lat: -0.5228, lon: 166.9315 },
    { name: "Palau", lat: 7.515, lon: 134.5825 },
    { name: "Quirguistão", lat: 41.2044, lon: 74.7661 },
    { name: "Samoa", lat: -13.759, lon: -172.1046 },
    { name: "São Cristóvão e Névis", lat: 17.3578, lon: -62.783 },
    { name: "Santa Lúcia", lat: 13.9094, lon: -60.9789 },
    { name: "São Marino", lat: 43.9424, lon: 12.4578 },
    { name: "São Tomé e Príncipe", lat: 0.1864, lon: 6.6131 },
    { name: "São Vicente e Granadinas", lat: 13.2528, lon: -61.1971 },
    { name: "Seicheles", lat: -4.6796, lon: 55.492 },
    { name: "Tonga", lat: -21.179, lon: -175.1982 },
    { name: "Tuvalu", lat: -7.1095, lon: 177.6493 },
    { name: "Vanuatu", lat: -15.3767, lon: 166.9592 },
    { name: "Vaticano", lat: 41.9029, lon: 12.4534 },
  ]
    .map((c) => ({ ...c, norm: normalize(c.name) }))
    .sort((a, b) => a.norm.localeCompare(b.norm)); // Ordenar para autocomplete

  // --- ESTADO DO JOGO ---
  const MAX_ATTEMPTS = 6;
  let remainingAttempts = MAX_ATTEMPTS;
  let targetCountry = countries[Math.floor(Math.random() * countries.length)];
  let gameOver = false;
  let guessHistory = [];

  // --- FUNÇÕES DE LÓGICA ---

  // Calcula a distância usando a fórmula de Haversine
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
  }

  // Calcula a direção (bearing) inicial
  function calculateBearing(lat1, lon1, lat2, lon2) {
    lat1 = (lat1 * Math.PI) / 180;
    lon1 = (lon1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;

    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    const bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return (bearing + 360) % 360; // Normaliza para 0-360
  }

  // Converte a direção em graus para uma seta
  function getDirectionArrow(bearing) {
    if (bearing >= 337.5 || bearing < 22.5) return "⬆️"; // N
    if (bearing >= 22.5 && bearing < 67.5) return "↗️"; // NE
    if (bearing >= 67.5 && bearing < 112.5) return "➡️"; // E
    if (bearing >= 112.5 && bearing < 157.5) return "↘️"; // SE
    if (bearing >= 157.5 && bearing < 202.5) return "⬇️"; // S
    if (bearing >= 202.5 && bearing < 247.5) return "↙️"; // SW
    if (bearing >= 247.5 && bearing < 292.5) return "⬅️"; // W
    if (bearing >= 292.5 && bearing < 337.5) return "↖️"; // NW
    return "🌍";
  }

  // Função principal para processar uma tentativa
  function handleGuess() {
    if (gameOver) return;

    const guessName = countryInput.value.trim();
    const guessNorm = normalize(guessName);

    const guessedCountry = countries.find((c) => c.norm === guessNorm);

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

    // Proximidade: 100% se for muito perto, 0% se for do outro lado do mundo (~20000 km)
    const proximity = Math.max(0, 100 - (distance / 20000) * 100);

    addGuessToGrid(guessedCountry.name, distance, direction, proximity);
    guessHistory.push(proximity);

    countryInput.value = "";
    hideSuggestions();

    // Checar condição de vitória
    if (distance < 1) {
      // Acertou
      endGame(true);
    } else if (remainingAttempts === 0) {
      // Perdeu
      endGame(false);
    }
  }

  // Adiciona a linha de resultado na tela
  function addGuessToGrid(name, distance, direction, proximity) {
    const proximityColorPercentage = proximity;
    const guessRow = document.createElement("div");
    guessRow.className =
      "grid grid-cols-4 gap-1 md:gap-2 items-center bg-gray-700 p-2 rounded-lg text-sm md:text-base animate-reveal";

    guessRow.innerHTML = `
            <div class="truncate pr-2">${name}</div>
            <div class="text-center">${Math.round(distance).toLocaleString(
              "pt-BR"
            )} km</div>
            <div class="text-center text-2xl">${direction}</div>
            <div class="flex items-center gap-2">
                <div class="w-full bg-gray-600 rounded-full h-5 overflow-hidden">
                    <div class="h-full rounded-full progress-bar-gradient" style="width: ${proximityColorPercentage}%;"></div>
                </div>
                <span class="font-bold text-xs">${Math.round(proximity)}%</span>
            </div>
        `;
    guessesContainer.appendChild(guessRow);
  }

  // Lógica para o autocomplete
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

  // Finaliza o jogo
  function endGame(isWin) {
    gameOver = true;
    countryInput.disabled = true;
    guessButton.disabled = true;

    if (isWin) {
      finalText.innerHTML = `Parabéns! Você acertou! O país era <strong class="text-emerald-400">${targetCountry.name}</strong>.`;
    } else {
      finalText.innerHTML = `Fim de jogo! O país secreto era <strong class="text-red-400">${targetCountry.name}</strong>.`;
    }
    gameOverMessage.classList.remove("hidden");
  }

  // Gera texto para compartilhamento
  function generateShareText() {
    const attemptCount = MAX_ATTEMPTS - remainingAttempts;
    const title = `GeoTermo ${new Date().toLocaleDateString(
      "pt-BR"
    )} ${attemptCount}/${MAX_ATTEMPTS}`;

    const squares = guessHistory
      .map((prox) => {
        if (prox > 95) return "🟩"; // Verde (acerto ou muito perto)
        if (prox > 75) return "🟨"; // Amarelo
        if (prox > 50) return "🟧"; // Laranja
        return "🟥"; // Vermelho
      })
      .join("");

    return `${title}\n${squares}\n\nJogue também: [LINK DO SEU JOGO]`;
  }

  // --- EVENT LISTENERS ---
  guessButton.addEventListener("click", handleGuess);
  countryInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleGuess();
    }
  });

  countryInput.addEventListener("input", handleAutocomplete);

  // Clicar em uma sugestão
  suggestionsBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("suggestion-item")) {
      countryInput.value = e.target.textContent;
      hideSuggestions();
      countryInput.focus();
    }
  });

  // Fechar sugestões se clicar fora
  document.addEventListener("click", (e) => {
    if (
      !countryInput.contains(e.target) &&
      !suggestionsBox.contains(e.target)
    ) {
      hideSuggestions();
    }
  });

  shareButton.addEventListener("click", () => {
    const textToCopy = generateShareText();
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Resultado copiado para a área de transferência!");
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err);
      });
  });
});

// Animação simples para revelar a linha
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
