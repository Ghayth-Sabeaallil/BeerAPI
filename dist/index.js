var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let arr = [];
const title = document.querySelector(".title");
const img = document.querySelector(".imgBeer");
const searchInput = document.querySelector(".input-search");
const searchList = document.querySelector(".result-search");
const seeMore = document.querySelector(".info");
const parents = document.querySelector(".text");
const random_btn = document.querySelector(".random-btn");
let num = 0;
let id = 1;
let once = 1;
function getRandomBeer() {
    return __awaiter(this, void 0, void 0, function* () {
        parents.removeChild(parents.lastChild);
        random_btn.disabled = true;
        var delayInMilliseconds = 500;
        setTimeout(function () {
            random_btn.disabled = false;
        }, delayInMilliseconds);
        if (once == 1) {
            once++;
            Promise.all([
                fetch("https://api.punkapi.com/v2/beers?page=1&per_page=80"),
                fetch("https://api.punkapi.com/v2/beers?page=2&per_page=80"),
                fetch("https://api.punkapi.com/v2/beers?page=3&per_page=80"),
                fetch("https://api.punkapi.com/v2/beers?page=4&per_page=80"),
                fetch("https://api.punkapi.com/v2/beers?page=5&per_page=80"),
            ])
                .then(([data1, data2, data3, data4, data5]) => __awaiter(this, void 0, void 0, function* () {
                const dataList1 = yield data1.json();
                const dataList2 = yield data2.json();
                const dataList3 = yield data3.json();
                const dataList4 = yield data4.json();
                const dataList5 = yield data5.json();
                dataList1.forEach((element) => {
                    arr.push(element);
                });
                dataList2.forEach((element) => {
                    arr.push(element);
                });
                dataList3.forEach((element) => {
                    arr.push(element);
                });
                dataList4.forEach((element) => {
                    arr.push(element);
                });
                dataList5.forEach((element) => {
                    arr.push(element);
                });
            }))
                .catch((err) => {
                console.log(err);
            });
        }
        searchInput.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                num = 0;
                id = 1;
                arr.forEach((beer) => {
                    if (searchInput.value != "" && searchInput.value != null) {
                        searchList.style.visibility = "visible";
                        if (beer.name.toLocaleLowerCase().includes(searchInput.value)) {
                            num++;
                        }
                    }
                    if (searchInput.value == "" ||
                        searchInput.value == null ||
                        searchInput.value.length === 0) {
                        searchList.style.visibility = "hidden";
                    }
                });
                setList(num, arr);
            }
        });
        try {
            const response = yield fetch("https://api.punkapi.com/v2/beers/random");
            if (response.status === 200) {
                const data = yield response.json();
                data.forEach((element) => {
                    if (element.image_url != null) {
                        title.innerHTML = element.name;
                        img.setAttribute("src", element.image_url);
                        let see = document.createElement("span");
                        see.setAttribute("class", "info");
                        see.innerHTML = "See More >";
                        see.addEventListener("click", function () {
                            window.open(`./beerInfo.html?beer=${element.name}`, "_blank");
                        });
                        parents.append(see);
                    }
                });
            }
            else {
                throw Error("Något gick fel, försök igen senare");
            }
        }
        catch (error) { }
    });
}
function setList(num, data) {
    let child = searchList.lastElementChild;
    while (searchList.lastElementChild) {
        searchList.removeChild(child);
        child = searchList.lastElementChild;
    }
    if (num >= 1) {
        data.forEach((beer) => {
            if (num > 10) {
                if (beer.name.toLocaleLowerCase().includes(searchInput.value)) {
                    const li = document.createElement("li");
                    li.setAttribute("class", "result");
                    li.setAttribute("unselectable", "on");
                    li.addEventListener("click", function () {
                        window.open(`./beerInfo.html?beer=${beer.name}`, "_blank");
                    });
                    li.textContent = id + " " + beer.name;
                    searchList.appendChild(li);
                    id++;
                }
            }
            else {
                if (beer.name.toLocaleLowerCase().includes(searchInput.value)) {
                    const li = document.createElement("li");
                    li.setAttribute("class", "result");
                    li.setAttribute("unselectable", "on");
                    li.addEventListener("click", function () {
                        window.open(`./beerInfo.html?beer=${beer.name}`, "_blank");
                    });
                    li.textContent = beer.name;
                    searchList.appendChild(li);
                }
            }
        });
    }
}
getRandomBeer();
