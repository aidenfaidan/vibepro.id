// Tunggu HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // Ambil elemen-elemen yang dibutuhkan
    const searchInput = document.getElementById('searchInput');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const cards = document.querySelectorAll('.price-card');
    const noResultsMsg = document.getElementById('noResults');

    // Variabel untuk menyimpan state filter saat ini
    let currentCategory = 'all';
    let currentSearch = '';

    // Fungsi Utama Filter
    function filterCards() {
        let visibleCount = 0;

        cards.forEach(card => {
            // 1. Cek Kategori
            const cardCategory = card.getAttribute('data-category');
            const isCategoryMatch = (currentCategory === 'all') || (cardCategory === currentCategory);

            // 2. Cek Pencarian (Nama Plan)
            const cardTitle = card.querySelector('.plan-name').textContent.toLowerCase();
            const isSearchMatch = cardTitle.includes(currentSearch);

            // 3. Gabungkan Logika (Harus cocok DUA-DUANYA)
            if (isCategoryMatch && isSearchMatch) {
                card.classList.remove('hide');
                visibleCount++;
            } else {
                card.classList.add('hide');
            }
        });

        // Tampilkan pesan jika tidak ada hasil
        if (visibleCount === 0) {
            noResultsMsg.style.display = 'block';
        } else {
            noResultsMsg.style.display = 'none';
        }
    }

    // Event Listener untuk Search Bar (Realtime input)
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase(); // Simpan text search lowercase
        filterCards(); // Jalankan filter
    });

    // Event Listener untuk Tombol Kategori
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus class active dari semua tombol
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Tambah class active ke tombol yang diklik
            btn.classList.add('active');

            // Update kategori saat ini
            currentCategory = btn.getAttribute('data-filter');
            
            // Jalankan filter
            filterCards();
        });
    });

});