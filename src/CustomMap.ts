// instructions to every other class on how they can be an argument to 'addMarker'
interface Mappable {
    location: {
        lat: number;
        lng: number;
    };
}

// creating a custom class to "hide existence of google maps from other engineers", prevent other engineers from using methods on google map instance that could 'break' app
export class CustomMap {
    private googleMap: google.maps.Map;

    constructor(divId: string) {
        this.googleMap = new google.maps.Map(document.getElementById(divId) as HTMLElement, {
            zoom: 1, 
            center:{
                lat:0, lng:0
            }
        });
    }

    // ***** BAD APPROACH ***** //
    // addUserMarker(user: User): void {
    //     new google.maps.Marker({
    //         map: this.googleMap,
    //         position: {
    //             lat: user.location.lat,
    //             lng: user.location.lng
    //         }
    //     });
    // }

    // addCompanyMarker(company: Company): void {
    //     new google.maps.Marker({
    //         map: this.googleMap,
    //         position: {
    //             lat: company.location.lat,
    //             lng: company.location.lng
    //         }
    //     });
    // }

    // addMarker(mappable: User | Company): void {
    //     new google.maps.Marker({
    //         map: this.googleMap,
    //         position: {
    //             lat: mappable.location.lat,
    //             lng: mappable.location.lng
    //         }
    //     });
    // }

    // ***** BETTER APPROACH ***** //
    // adding interface as type makes function more scalable
    // user can be type User AND Mappable if fulfills interface requirements
    addMarker(mappable: Mappable): void {
        new google.maps.Marker({
            map: this.googleMap,
            position: {
                lat: mappable.location.lat,
                lng: mappable.location.lng
            }
        });
    }
}