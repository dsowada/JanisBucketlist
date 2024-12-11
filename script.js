function checkPassword() {
  const password = document.getElementById('passwordInput').value;
  const today = new Date();
  const isSpecialDay = today.getDate() === 20 && today.getMonth() === 10; // November ist 10

  if (password === "20.11.23") {
      if (isSpecialDay) {
          showBinaryAnimation();
      } else {
          showBucketList();
      }
  } else {
      alert("Falsches Passwort!");
  }
}

function showBinaryAnimation() {
  const animation = document.getElementById('binaryAnimation');
  animation.style.display = 'block';
  
  // Einfache binäre Blumenanimation
  let flowers = '';
  for (let i = 0; i < 100; i++) {
      flowers += '1010  🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸0101<br>';
  }
  animation.innerHTML = flowers;

  // Animation nach 3 Sekunden ausblenden
  setTimeout(() => {
      animation.style.display = 'none';
      showBucketList();
  }, 3000);
}

function showBucketList() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('bucketList').style.display = 'block';
  loadItems();
}

function addItem() {
  const input = document.getElementById('newItem');
  const text = input.value.trim();
  
  if (text) {
      const items = JSON.parse(localStorage.getItem('bucketItems') || '[]');
      items.push({
          text: text,
          completed: false,
          note: ''
      });
      localStorage.setItem('bucketItems', JSON.stringify(items));
      input.value = '';
      loadItems();
  }
}

function loadItems() {
  const items = JSON.parse(localStorage.getItem('bucketItems') || '[]');
  const list = document.getElementById('itemsList');
  list.innerHTML = '';

  items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'list-item';
      li.innerHTML = `
          <input type="checkbox" ${item.completed ? 'checked' : ''} 
                 onchange="toggleItem(${index})">
          <span style="margin-left: 10px; ${item.completed ? 'text-decoration: line-through' : ''}">${item.text}</span>
      `;
      list.appendChild(li);
  });
}

function toggleItem(index) {
  const items = JSON.parse(localStorage.getItem('bucketItems') || '[]');
  if (!items[index].completed) {
      const note = prompt('Füge eine Notiz hinzu:');
      if (note) {
          items[index].completed = true;
          items[index].note = note;
          localStorage.setItem('bucketItems', JSON.stringify(items));
          loadItems();
      }
  }
}
