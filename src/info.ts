interface beerInfo {
  image_url: string | null;
  name: string;
  description: string;
  abv: number;
  volume: any;
  ingredients: any;
  hops: any;
  food_pairing: any;
  brewers_tips: any;
}

const des = document.querySelector(".description") as HTMLElement;
const alcoholBV = document.querySelector(".abv") as HTMLElement;
const ingr = document.querySelector(".ingredients") as HTMLElement;
const volum = document.querySelector(".v") as HTMLElement;
const hop = document.querySelector(".hops") as HTMLElement;
const fp = document.querySelector(".fp") as HTMLElement;
const bt = document.querySelector(".bt") as HTMLElement;
const imgBeer = document.querySelector(".imgBeer") as HTMLElement;

let oncee: number = 1;
let dataArr: any[] = [];

async function showInfo() {
  if (oncee == 1) {
    oncee++;
    Promise.all([
      fetch("https://api.punkapi.com/v2/beers?page=1&per_page=80"),
      fetch("https://api.punkapi.com/v2/beers?page=2&per_page=80"),
      fetch("https://api.punkapi.com/v2/beers?page=3&per_page=80"),
      fetch("https://api.punkapi.com/v2/beers?page=4&per_page=80"),
      fetch("https://api.punkapi.com/v2/beers?page=5&per_page=80"),
    ])
      .then(async ([data1, data2, data3, data4, data5]) => {
        const dataList1: Exempel[] = await data1.json();
        const dataList2: Exempel[] = await data2.json();
        const dataList3: Exempel[] = await data3.json();
        const dataList4: Exempel[] = await data4.json();
        const dataList5: Exempel[] = await data5.json();

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
            element.ingredients.malt.forEach((ing: any) => {
              ingr.innerHTML +=
                ing.name +
                " " +
                ing.amount.value +
                " " +
                ing.amount.unit +
                " <br>";
            });
            hop.innerHTML = "Hops: ";
            element.ingredients.hops.forEach((ho: any) => {
              hop.innerHTML +=
                ho.name +
                " " +
                ho.amount.value +
                " " +
                ho.amount.unit +
                " <br>";
            });

            fp.innerHTML = "Food pairing: ";
            element.food_pairing.forEach((food_pairing: any) => {
              fp.innerHTML += food_pairing + " <br>";
            });

            bt.innerHTML = "Brewers tips: " + element.brewers_tips;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function NameOfBeer(): string {
  let url = document.location.href,
    params = url.split("?")[1].split("&"),
    data: any = {},
    tmp;
  for (let i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  let beer: string = data.beer;
  let beerName = beer.replace(/%20/g, " ");
  return beerName;
}

showInfo();
