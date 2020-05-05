// User

function signup(user) {
    const url = "/user"
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
    return fetch(request)
            .then(function (res) {
                return res.json()
            })
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
}


function login(user) {
    const url = "/auth"
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({user: user}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
    return fetch(request)
            .then(function (res) {
                return res.json()
            })
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
}


function checkLoggedin(setUser) {
    const url = "/user"
    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(response => {
            if (response && response.user) {
                return response.user
            }
        })
        .catch(error => {
            console.log(error)
        })
}


function changePassword(password) {
    const url = "/user"
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify({newPassword: password}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
    return fetch(request)
            .then(function (res) {
                return res.json()
            })
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
}


//Links
function addLink(link) {
    const url = "/link"
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({fullUrl: link.fullUrl, shortUrl: link.shortUrl}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
    return fetch(request)
            .then(function (res) {
                return res.json()
            })
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
}


function getLinks() {
    const url = "/link"
    return fetch(url)
            .then(function (res) {
                return res.json()
            })
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
}


function deleteLink(id) {
    const url = "/link"
    const request = new Request(url, {
        method: "delete",
        body: JSON.stringify({_id: id}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
    return fetch(request)
            .then(function (res) {
                return res.json()
            })
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
}


export const Worker = {
    signup,
    login,
    checkLoggedin,
    addLink,
    getLinks,
    deleteLink,
    changePassword
}