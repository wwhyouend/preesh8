async function fetchImages() {
  const res = await fetch('/images');
  const images = await res.json();
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  images.forEach(img => {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.innerHTML = `<img src="${img.url}" alt=""><div class="desc hidden">${img.desc}</div>`;
    card.onclick = () => expandImage(img);
    gallery.appendChild(card);
  });

  const addBtn = document.createElement('div');
  addBtn.className = 'image-card';
  addBtn.innerHTML = '[ + ]';
  addBtn.onclick = () => document.getElementById('uploadForm').classList.remove('hidden');
  gallery.appendChild(addBtn);
}

function expandImage(img) {
  const div = document.createElement('div');
  div.className = 'expanded';
  div.innerHTML = `
    <img src="${img.url}" style="max-width: 80vw;">
    <p>${img.desc}</p>
    <button onclick="this.parentElement.remove()">← Retour</button>
  `;
  document.body.appendChild(div);
}

function closeForm() {
  document.getElementById('uploadForm').classList.add('hidden');
}

async function uploadImage() {
  const file = document.getElementById('imageInput').files[0];
  const desc = document.getElementById('descInput').value;
  const formData = new FormData();
  formData.append('image', file);
  formData.append('desc', desc);

  await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  closeForm();
  fetchImages();
}

fetchImages();