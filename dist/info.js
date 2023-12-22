var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const des = document.querySelector(".description");
const alcoholBV = document.querySelector(".abv");
const ingr = document.querySelector(".ingredients");
const volum = document.querySelector(".v");
const hop = document.querySelector(".hops");
const fp = document.querySelector(".fp");
const bt = document.querySelector(".bt");
const imgBeer = document.querySelector(".imgBeer");
let oncee = 1;
let dataArr = [];
function showInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        if (oncee == 1) {
            oncee++;
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
                    dataArr.push(element);
                });
                dataList2.forEach((element) => {
                    dataArr.push(element);
                });
                dataList3.forEach((element) => {
                    dataArr.push(element);
                });
                dataList4.forEach((element) => {
                    dataArr.push(element);
                });
                dataList5.forEach((element) => {
                    dataArr.push(element);
                });
                dataArr.forEach((element) => {
                    if (element.name == NameOfBeer()) {
                        document.title = element.name;
                        imgBeer.setAttribute("src", element.image_url);
                        imgBeer.setAttribute("alt", element.name);
                        des.innerHTML = "Description: " + element.description;
                        alcoholBV.innerHTML = "Alcohol by volume: " + element.abv;
                        volum.innerHTML = "Volume: " + element.volume.value;
                        ingr.innerHTML = "Ingredients: ";
                        element.ingredients.malt.forEach((ing) => {
                            ingr.innerHTML +=
                                ing.name +
                                    " " +
                                    ing.amount.value +
                                    " " +
                                    ing.amount.unit +
                                    " <br>";
                        });
                        hop.innerHTML = "Hops: ";
                        element.ingredients.hops.forEach((ho) => {
                            hop.innerHTML +=
                                ho.name +
                                    " " +
                                    ho.amount.value +
                                    " " +
                                    ho.amount.unit +
                                    " <br>";
                        });
                        fp.innerHTML = "Food pairing: ";
                        element.food_pairing.forEach((food_pairing) => {
                            fp.innerHTML += food_pairing + " <br>";
                        });
                        bt.innerHTML = "Brewers tips: " + element.brewers_tips;
                    }
                });
            }))
                .catch((err) => {
                console.log(err);
            });
        }
    });
}
function NameOfBeer() {
    let url = document.location.href, params = url.split("?")[1].split("&"), data = {}, tmp;
    for (let i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split("=");
        data[tmp[0]] = tmp[1];
    }
    let beer = data.beer;
    let beerName = beer.replace(/%20/g, " ");
    return beerName;
}
showInfo();
