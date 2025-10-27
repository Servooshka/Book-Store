function init() {
    const element = document.getElementById("map");
    if (!element) {
        console.error("Элемент с id 'map' не найден.");
        return;
    }
    // Создание экземпляра карты и его привязка к контейнеру 'map'.
    var myMap = new ymaps.Map(element, {
        center: [59.916901, 30.309883],
        zoom: 15
    });
    // Добавление метки на карту
    var myPlacemark = new ymaps.Placemark([59.916901, 30.309883], {
        balloonContent: "Военмех"
    });

    myMap.geoObjects.add(myPlacemark);
}