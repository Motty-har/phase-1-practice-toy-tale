let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function toyFetch (){
  fetch("http://localhost:3000/toys")
.then(resp => resp.json())
.then(data => {
  renderToysToScreen(data)})
}
function renderToysToScreen(toys){
  const toySource = document.getElementById("toy-collection")
  toys.forEach(toy => {
    const toyCard = makeToyCard(toy)
    toySource.append(toyCard)
  })
}

function makeToyCard(toy){
  const toyDiv = document.createElement('div')
  const toyHeader = document.createElement('h2')
  const toyImg = document.createElement('img')
  const toyPara = document.createElement('p')
  const toyBtn = document.createElement('button')

  toyDiv.className = "card"
  toyDiv.id = `${toy.name}_${toy.id}`
  toyBtn.className = "like-btn"
  toyImg.className = "toy-avatar"
  toyBtn.id = toy.id
  toyHeader.textContent = toy.name
  toyImg.src = toy.image
  toyPara.textContent = toy.likes
  toyBtn.textContent = "Like <3"
  toyDiv.append(toyHeader, toyImg, toyPara, toyBtn)
  
  toyBtn.addEventListener("click", (event) => {
    addLike(toy, toyDiv, toyPara)
  } )
  
  return toyDiv

}
const postToy = (toy) => {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-type": "Application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json)
  .then(json => console.log("Success! Heres the toy: \n\n", json ))
}

const form = document.querySelector('.container')
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("clicked")
    const toyName = event.target[0].value
    const toyImgUrl = event.target[1].value
    const newToy = {
      name: toyName,
      image: toyImgUrl,
      likes: 0
    }
    postToy(newToy)
  })

  const addLike = (toy, toyDiv, toyPara) => {
    console.log("toy", toy)
    fetch(`http://localhost:3000/toys/${toy.id}`, {  
    method: "PATCH",
      headers: {
        "Content-type": "Application/json"
      },
      body: JSON.stringify({"likes": ++toy.likes})
    })
    .then(resp => resp.json())
    .then(updatedToy => {
      console.log("updatedToy", updatedToy)
      updateToyInDom(updatedToy, toyDiv, toyPara)

    })
  }
function updateToyInDom(toy, toyDiv, toyPara){
  console.log("update toy", toy)
  console.log("toydiv", toyDiv)
  console.log("toyparagraph", toyPara)
  toyPara.textContent = toy.likes
}

const init = () => {
  toyFetch() 
  //listenForSubmit()
}
init()


