function autocomplete(input) {
    if(!input) return;

    const dropdown = new google.maps.places.Autocomplete(input);

    // dropdown.addListener('place_changed', () => {
    //     const place = dropdown.getPlace();
    //     latInput.valur
    // })
}

export default autocomplete;