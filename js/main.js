var inputName = document.getElementById('siteName');
var inputSite = document.getElementById('siteURL');
var btnData = document.getElementById('btnSub');
var searchInput = document.getElementById('search');
var sites = [];
var resultName = false
var resultSite = false

/* get data from local storage*/
if (JSON.parse(localStorage.getItem('markList'))) {

    sites = JSON.parse(localStorage.getItem('markList'))
    displayData()
}

/* get inputs data from user*/
function getFormData() {
    var site = {
        name: inputName.value,
        url: inputSite.value
    }
    sites.push(site)
    localStorage.setItem('markList', JSON.stringify(sites))
}

/* display sites */
function displayData() {
    var siteList = ''
    for (let i = 0; i < sites.length; i++) {
        siteList +=
            `<li class="py-3 bg-info ">
        <div class="content d-flex align-items-center justify-content-between w-75 m-auto">
            <span class="fw-bolder fs-5">${sites[i].name}</span>
            <div class="buttons">
                <button class="btn btn-success visitBtn me-2" ><a class="text-decoration-none text-white" href="http://${sites[i].url}" target="_blank">Visit</a></button>
                <button onclick="deleteBtn(${i})" class="btn btn-danger">Delete</button>    
            </div>
        </div>
    </li>`
    }
    document.getElementById('dataList').innerHTML = siteList;
}

/* clear inputs after add new site from user*/
function clearData() {
    inputName.value = ''
    inputSite.value = ''
    inputSite.classList.remove('is-valid')
    inputName.classList.remove('is-valid')
    resultName = false
    resultSite = false



}

/* add data button */
btnData.onclick = function () {
    if (resultName && resultSite) {

        getFormData()
        displayData()
        clearData()

    }
}

/* delete button */
function deleteBtn(index) {
    sites.splice(index, 1)
    displayData()
    localStorage.setItem('markList', JSON.stringify(sites))
}

/* search input ( by site name) */
searchInput.onkeyup = function () {
    console.log(searchInput.value)
    var siteList = ''
    for (let i = 0; i < sites.length; i++) {
        if (sites[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            siteList +=
                `<li class="py-3 bg-info ">
        <div class="content d-flex align-items-center justify-content-between w-75 m-auto">
            <span class="fw-bolder fs-5">${sites[i].name}</span>
            <div class="buttons">
                <button class="btn btn-success visitBtn me-2" ><a class="text-decoration-none text-white" href="http://${sites[i].url}" target="_blank">Visit</a></button>
                <button onclick="deleteBtn(${i})" class="btn btn-danger">Delete</button>    
            </div>
        </div>
    </li>`

        }
    }
    console.log(siteList)
    document.getElementById('dataList').innerHTML = siteList;
}

/* inputs validation */
let regular = / /;

inputName.onkeyup = function () {
    if (regular.test(inputName.value) || inputName.value == '') {
        inputName.classList.add('is-invalid')
        inputName.classList.remove('is-valid')
        alertName.classList.remove('d-none')
    } else {
        inputName.classList.remove('is-invalid')
        inputName.classList.add('is-valid')
        alertName.classList.add('d-none')
        resultName = true
    }
}
inputSite.onkeyup = function () {
    if (regular.test(inputSite.value) || inputSite.value == '') {
        inputSite.classList.add('is-invalid')
        inputSite.classList.remove('is-valid')
        alertSite.classList.remove('d-none')
    } else {
        inputSite.classList.remove('is-invalid')
        inputSite.classList.add('is-valid')
        alertSite.classList.add('d-none')
        resultSite = true
    }
}

