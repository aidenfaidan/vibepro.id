document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOGIC SEARCH & FILTER ---
    const searchInput = document.getElementById('searchInput');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const cards = document.querySelectorAll('.price-card');
    const noResultsMsg = document.getElementById('noResults');

    let currentCategory = 'all';
    let currentSearch = '';

    function filterCards() {
        let visibleCount = 0;

        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const isCategoryMatch = (currentCategory === 'all') || (cardCategory === currentCategory);
            const cardTitle = card.querySelector('.plan-name').textContent.toLowerCase();
            const isSearchMatch = cardTitle.includes(currentSearch);

            if (isCategoryMatch && isSearchMatch) {
                card.classList.remove('hide');
                visibleCount++;
            } else {
                card.classList.add('hide');
            }
        });

        if (visibleCount === 0) {
            noResultsMsg.style.display = 'block';
        } else {
            noResultsMsg.style.display = 'none';
        }
    }

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        filterCards();
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-filter');
            filterCards();
        });
    });

    // --- 2. LOGIC ORDER WHATSAPP (BARU) ---
    const orderButtons = document.querySelectorAll('.btn-order');
    
    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah link default '#'
            
            // 1. Ambil elemen kartu pembungkus tombol ini
            const card = btn.closest('.price-card');
            
            // 2. Ambil Nama Produk dari dalam kartu tersebut
            const productName = card.querySelector('.plan-name').innerText;
            
            // 3. Nomor WA Tujuan (Tanpa tanda + atau 0 di depan)
            const phoneNumber = '6281564889885'; 
            
            // 4. Buat Pesan Otomatis
            const message = `Halo Admin VIBEPRO, saya mau order *${productName}*. Apakah stok ready?`;
            
            // 5. Buat Link WhatsApp
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            // 6. Buka di Tab Baru
            window.open(whatsappUrl, '_blank');
        });
    });

});
