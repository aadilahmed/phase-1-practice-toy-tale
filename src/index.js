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

  document.querySelector(".add-toy-form").addEventListener('submit', (e) => {
    e.preventDefault();
    let toyObj = {
      name:e.target.name.value,
      image:e.target.image.value,
      likes:0
    }
    renderToy(toyObj)
    createToy(toyObj);
  });

  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toyData) => {
      toyData.forEach(toy => renderToy(toy));
    });

});

function renderToy(toy) {
  let card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes}</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>`

  card.querySelector('.like-btn').addEventListener('click', (e) => {
    toy.likes++;

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "likes": toy.likes
      })
    })
    .then((response) => response.json())
    .then((toyData) => card.querySelector('p').innerText = toyData.likes);
  })

  document.querySelector("#toy-collection").appendChild(card);
}

function createToy(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(toyObj)
  })
}
