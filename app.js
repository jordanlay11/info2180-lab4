document.getElementById('searchBtn').addEventListener('click', function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'superheroes.php', true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      alert(xhr.responseText); 
    } else {
      alert('Error: could not load heroes list');
    }
  };
  xhr.onerror = function() {
    alert('Request failed.');
  };
  xhr.send();
});
