document.getElementById("kirimKomentar").addEventListener("click", function () {
    const komentar = document.getElementById("komentar").value;

    fetch('router.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ komentar }),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById("komentar").value = ""; 
            loadKomentar();
        })
        .catch(error => console.error("Error:", error));
});

function loadKomentar() {
    fetch('router.php')
        .then(response => response.json())
        .then(data => {
            const listKomentar = document.getElementById("listKomentar");
            listKomentar.innerHTML = "";
            data.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.uraian_komentar;
                listKomentar.appendChild(li);
            });
        })
        .catch(error => console.error("Error:", error));
}

window.onload = loadKomentar;
