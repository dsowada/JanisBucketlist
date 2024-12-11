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

//firebase konfiguration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIBVRnJW1sEL18Dd3OSrWHQ1hiRrguWfY",
  authDomain: "janisbucketlist.firebaseapp.com",
  projectId: "janisbucketlist",
  storageBucket: "janisbucketlist.firebasestorage.app",
  messagingSenderId: "1037956310526",
  appId: "1:1037956310526:web:9af7fa7da5072689eaccaf",
  measurementId: "G-C781G816TX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//test wegen integration
 
  async function saveText() {  
    const text = document.getElementById('textInput').value;  

    try {  
      // Speichere den Text in der Firestore-Datenbank  
      await db.collection('texte').add({  
        content: text,  
        timestamp: firebase.firestore.FieldValue.serverTimestamp()  
      });  
      alert('Text erfolgreich gespeichert!');  
    } catch (error) {  
      console.error('Fehler beim Speichern:', error);  
    }  
  }  
