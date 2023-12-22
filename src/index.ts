interface Exempel {
  image_url: string | null;
  name: string;
  description: string;
  abv: number;
  v: number;
  ingredients: string[] & number[];
  hope: string[] & number[];
  fp: string;
  bt: string;
}

let arr: any[] = [];

const title = document.querySelector(".title") as HTMLElement;
const img = document.querySelector(".imgBeer") as HTMLElement;
const searchInput = document.querySelector(".input-search") as HTMLInputElement;
const searchList = document.querySelector(".result-search") as HTMLElement;
const seeMore = document.querySelector(".info") as HTMLElement;
const parents = document.querySelector(".text") as HTMLElement;
const random_btn = document.querySelector(".random-btn") as HTMLButtonElement;

let num: number = 0;
let id: number = 1;
let once: number = 1;

async function getRandomBeer() {
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
      .then(async ([data1, data2, data3, data4, data5]) => {
        const dataList1: Exempel[] = await data1.json();
        const dataList2: Exempel[] = await data2.json();
        const dataList3: Exempel[] = await data3.json();
        const dataList4: Exempel[] = await data4.json();
        const dataList5: Exempel[] = await data5.json();

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
      })
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
        if (
          searchInput.value == "" ||
          searchInput.value == null ||
          searchInput.value.length === 0
        ) {
          searchList.style.visibility = "hidden";
        }
      });

      setList(num, arr);
    }
  });
  try {
    const response = await fetch("https://api.punkapi.com/v2/beers/random");
    if (response.status === 200) {
      const data: Exempel[] = await response.json();
      data.forEach((element) => {
        if (element.image_url != null) {
          title.innerHTML = element.name;
          img.setAttribute("src", element.image_url);
          let see = document.createElement("span") as HTMLElement;
          see.setAttribute("class", "info");
          see.innerHTML = "See More >";
          see.addEventListener("click", function () {
            window.open(`./beerInfo.html?beer=${element.name}`, "_blank");
          });
          parents.append(see);
        }
      });
    } else {
      throw Error("Något gick fel, försök igen senare");
    }
  } catch (error) {}
}

function setList(num: number, data: any[]): void {
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
      } else {
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
