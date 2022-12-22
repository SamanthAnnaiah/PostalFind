let maxinlength = 6
let pincode = ""
let postoff = ""

function inValidate(tid) {
    if (tid.value.length == 1 && (tid.value == 0 || tid.value == "-")) {
        window.alert("The PINCODE cannot start with zero/minus")
        tid.value = ""
    }
    if (tid.value.length > maxinlength) {
        tid.value = tid.value.slice(0, maxinlength)
        window.alert("The PINCODE length should be less than 6 digits")
    }
}

function postFinder() {
    let apivalue = ""
    let apikey = ""
    pincode = document.getElementById("pincode")
    postoff = document.getElementById("postoff")
    if (postoff.value == "" && pincode.value.length != 6) {
        window.alert("The PINCODE length should be of 6 digits")
    } else {
        if (postoff.value != "" && pincode.value > 0) {
            window.alert("Enter any one value")
        } else {
            if (postoff.value != "") {
                apivalue = postoff.value
                apivalue = apivalue.trim()
                let tempkey = capitaling(apivalue)
                apikey = tempkey.join("")
                apikey = "postoffice/" + apikey
            } else {
                apikey = pincode.value
                apikey = "pincode/" + apikey
            }
        }
        let pinurl = "https://api.postalpincode.in/" + apikey
        fetch(pinurl)
            .then((response) => response.json())
            .then((data) => postProcess(data))
            .catch((error) => {
                window.alert('PIN invalid:', error);
            });
    }
}

function postProcess(data) {
    if (data[0].Status == "Error" || data[0].Status == "404") {
        window.alert('INPUT invalid/DATA not found')
    } else {
        let resbucket = document.querySelector("div.main_4")
        resbucket.innerHTML = ""

        for (i in data) {
            for (j in data[i].PostOffice) {
                console.log(data[i])
                let poffice = document.createElement("div")

                let ptable = document.createElement("table")


                let ptr1 = document.createElement("tr")
                let ptd1 = document.createElement("td")
                ptd1.classList.add("thead")
                ptd1.textContent = "Post Office: "
                ptr1.appendChild(ptd1)
                let ptd2 = document.createElement("td")
                ptd2.classList.add("thead")
                ptd2.textContent = data[i].PostOffice[j].Name
                ptr1.appendChild(ptd2)
                ptable.appendChild(ptr1)

                let ptr2 = document.createElement("tr")
                let ptd3 = document.createElement("td")
                ptd3.textContent = "Branch Type: "
                ptr2.appendChild(ptd3)
                let ptd4 = document.createElement("td")
                ptd4.textContent = data[i].PostOffice[j].BranchType
                ptr2.appendChild(ptd4)
                ptable.appendChild(ptr2)

                let ptr3 = document.createElement("tr")
                let ptd5 = document.createElement("td")
                ptd5.textContent = "Region: "
                ptr3.appendChild(ptd5)
                let ptd6 = document.createElement("td")
                ptd6.textContent = data[i].PostOffice[j].Region
                ptr3.appendChild(ptd6)
                ptable.appendChild(ptr3)

                let ptr4 = document.createElement("tr")
                let ptd7 = document.createElement("td")
                ptd7.textContent = "State: "
                ptr4.appendChild(ptd7)
                let ptd8 = document.createElement("td")
                ptd8.textContent = data[i].PostOffice[j].State
                ptr4.appendChild(ptd8)
                ptable.appendChild(ptr4)

                let ptr5 = document.createElement("tr")
                let ptd9 = document.createElement("td")
                ptd9.textContent = "District: "
                ptr5.appendChild(ptd9)
                let ptd10 = document.createElement("td")
                ptd10.textContent = data[i].PostOffice[j].District
                ptr5.appendChild(ptd10)
                ptable.appendChild(ptr5)

                let ptr6 = document.createElement("tr")
                let ptd11 = document.createElement("td")
                ptd11.textContent = "Status: "
                ptr6.appendChild(ptd11)
                let ptd12 = document.createElement("td")
                ptd12.textContent = data[i].PostOffice[j].DeliveryStatus
                ptr6.appendChild(ptd12)
                ptable.appendChild(ptr6)

                let ptr7 = document.createElement("tr")
                let ptd13 = document.createElement("td")
                ptd13.textContent = "PINCode: "
                ptr7.appendChild(ptd13)
                let ptd14 = document.createElement("td")
                ptd14.textContent = data[i].PostOffice[j].Pincode
                ptr7.appendChild(ptd14)
                ptable.appendChild(ptr7)


                poffice.appendChild(ptable)
                resbucket.appendChild(poffice)
            }
        }
    }
}

function capitaling(apicap) {
    let apistr = apicap.split("")
    let apicon = []
    for (let i = 0; i <= apistr.length; i++) {
        if (i == 0) {
            let temp1 = " "
            temp1 = apistr[0]
            apicon[0] = temp1.toUpperCase()
        } else {
            apicon[i] = apistr[i]
        }
    }
    return apicon
}