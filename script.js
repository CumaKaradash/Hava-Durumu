const url = 'https://api.openweathermap.org/data/2.5/';  // Hava durumu verilerini almak için API URL'si
const key = '68237c970b884111fa21af8b3b763ee4';  // OpenWeatherMap API anahtarı

const setQuery = (e) => {
  if (e.keyCode == '13') {  // Eğer Enter tuşuna basıldıysa
    getResult(searchBar.value);  // Arama çubuğunda girilen değeri getResult işlevine gönder
  }
};

const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;  // API sorgusu oluştur
  fetch(query)  // API'ye GET isteği gönder
    .then(weather => {
      return weather.json();  // Gelen verileri JSON formatına dönüştür
    })
    .then(displayResult);  // Dönüştürülen verileri displayResult işlevine göndererek sonuçları görüntüle
};

const displayResult = (result) => {
  let city = document.querySelector('.city');  // Şehir adını içeren HTML elementini seç
  city.innerText = `${result.name}, ${result.sys.country}`;  // Seçilen elementin içeriğini API'den gelen şehir adı ve ülke koduyla güncelle

  let temp = document.querySelector('.temp');  // Sıcaklık bilgisini içeren HTML elementini seç
  temp.innerText = `${Math.round(result.main.temp)}°C`;  // Seçilen elementin içeriğini API'den gelen sıcaklık değeriyle güncelle

  let desc = document.querySelector('.desc');  // Hava durumu açıklamasını içeren HTML elementini seç
  desc.innerText = result.weather[0].description;  // Seçilen elementin içeriğini API'den gelen hava durumu açıklamasıyla güncelle

  let minmax = document.querySelector('.minimax');  // Minimum ve maksimum sıcaklık bilgisini içeren HTML elementini seç
  minmax.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`;  // Seçilen elementin içeriğini API'den gelen minimum ve maksimum sıcaklık değerleriyle güncelle
};

const searchBar = document.getElementById('searchBar');  // Arama çubuğunu temsil eden HTML elementini seç
searchBar.addEventListener('keydown', setQuery);  // Arama çubuğuna her tuş vurulduğunda setQuery işlevini çağır

