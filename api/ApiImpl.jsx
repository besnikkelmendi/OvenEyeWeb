import ApiInterface from "./ApiInterface.jsx";

require('isomorphic-fetch');
function getToken() {
    try {
        let persistRoot = JSON.parse(localStorage.getItem('persist:root-phmt'));
        return JSON.parse(persistRoot.auth);
    } catch (err) {
        window.location.href = "/login"
    }
}

const GET = () => {
    return {
        method: 'GET',
        headers: {}
    }
};

const POST = (data) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(data),
    }
};

const formDataPOST = (data) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',

        },
        body: data
    }
};

const PUT = (data) => {
    return {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        },
        body: JSON.stringify(data),
    }
};
const DELETE = (data) => {
    return {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': getToken()
        },
        body: JSON.stringify(data),
    }
};

export default class ApiImpl extends ApiInterface {
    constructor(url) {
        super();
        this.url = url;
    }

    customFetch(input, init = null) {
        return fetch(input, init).then((response) => {
            if (response.ok) {
                return response.json();
            } 
            
            return response.json();//else throw response;

        });
    }

    //returns all zones
    getImageKeys() {
        return this.customFetch(this.url + `/api/v1/images`,
            GET()
        )
    }

    postImage(data) {
        return this.customFetch(this.url + `/api/v1/image`,
        formDataPOST(data)
        );
    }

    postRegisterClients(data) {
        return this.customFetch(this.url + `/api/v1/client/register`,
        POST(data)
        );
    }
    

    // getAllBookings(page, limit, text, status, sortField, sortOrder) {
    //     return this.customFetch(this.url + `/api/v1/all-bookings`,
    //         GET()
    //     )
    // }
    // getAllStaff(){
    //     return this.customFetch(this.url + `/api/v1/all-staff`,
    //         GET()
    //     )
    // }

    // getAllBookingsByOrder(zoneId, page, limit, text, sortField, sortOrder) {
    //     return this.customFetch(this.url + `/api/v1/all-bookings-in-order?text=${text}&limit=${limit}&page=${page}&sortField=${sortField}&sortOrder=${sortOrder}`,
    //         POST(zoneId)
    //     )
    // }


    // //returns all bookings for a zone id
    // getBookingsPerZone(zoneId) {
    //     if (zoneId === "") {
    //         return []
    //     }
    //     return this.customFetch(this.url + `/api/v1/bookings/` + zoneId,
    //         GET()
    //     )
    // }

    // getMembersPerBooking(bookingId) {
    //     if (bookingId === "") {
    //         return []
    //     }
    //     return this.customFetch(this.url + `/api/v1/members/${bookingId}`,
    //         GET()
    //     )
    // }

    // updateUser(data) {
    //     return this.customFetch(this.url + `/edit/user`,
    //         PUT(data)
    //     );
    // }

    // updateZone(data) {
    //     return this.customFetch(this.url + `/api/v1/zone`,
    //         PUT(data)
    //     );
    // }

    // addZone(data) {
    //     return this.customFetch(this.url + `/api/v1/zone`,
    //         POST(data)
    //     );
    // }

    // getStats(data) {
    //     return this.customFetch(this.url + `/api/v1/stats`,
    //         POST(data)
    //     );
    // }
    // addMembers(data) {
    //     return this.customFetch(this.url + `/api/v1/members`,
    //         POST(data)
    //     );
    // }
    // addStaff(data) {
    //     return this.customFetch(this.url + `/api/v1/staff/register`,
    //         POST(data)
    //     );
    // }

    clientLogin(data) {
        return fetch(this.url + `/api/v1/client/login`,
        {
            method: "POST",
            headers: {
                //'Authorization': getToken(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        );
    }

    // makeBooking(data) {
    //     return this.customFetch(this.url + `/api/v1/booking`,
    //         POST(data)
    //     );
    // }


    // deleteBooking(zoneId, bookingId) {
    //     return fetch(this.url + `/api/v1/deleteBooking/${zoneId}/${bookingId}`, {
    //         method: "DELETE",
    //         headers: {
    //             //'Authorization': getToken(),
    //             'Content-Type': 'application/json',
    //         }
    //     })
    // }

    // deleteMemberFromBooking(bookingId, memberId){
    //     return fetch(this.url + `/api/v1/members/${bookingId}/${memberId}`, {
    //         method: "DELETE",
    //         headers: {
    //             //'Authorization': getToken(),
    //             'Content-Type': 'application/json',
    //         }
    //     })
    // }
    // deleteStaff(memberId){
    //     return fetch(this.url + `/api/v1/staff/${memberId}`, {
    //         method: "DELETE",
    //         headers: {
    //             //'Authorization': getToken(),
    //             'Content-Type': 'application/json',
    //         }
    //     })
    // }
    // truncateVisitHistory(date) {
    //     return fetch(this.url + `/api/v1/truncateVisitHistory/${date}`,
    //         DELETE()
    //     )
    // }
    // truncateReservationHistory(date) {
    //     return fetch(this.url + `/api/v1/truncateVisitHistory/${date}`,
    //         DELETE()
    //     )
    // }

}
