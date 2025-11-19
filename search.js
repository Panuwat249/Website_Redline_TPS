document.getElementById('searchInput').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll('#trainTable tbody tr');
    rows.forEach(row => {
        let station = row.cells[0].textContent.toLowerCase();
        row.style.display = station.includes(filter) ? '' : 'none';
    });
});
