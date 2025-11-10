// script.js
const API_URL = '/api/nfts';
let currentAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'; // Default: BAYC

const fetchNFTs = async (address) => {
    try {
        const res = await fetch(`${API_URL}?contractAddress=${address}`);
        const data = await res.json();
        if (data.error) {
            alert(data.error);
            return [];
        }
        return data.nfts;
    } catch (err) {
        alert('Network error. Is the server running?');
        return [];
    }
};

const renderNFTs = (nfts) => {
    const grid = document.getElementById('nft-grid');
    const noResults = document.getElementById('no-results');
    grid.innerHTML = '';

    if (!nfts || nfts.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    nfts.forEach(nft => {
        const li = document.createElement('li');
        li.className = 'explore-card';
        li.innerHTML = `
            <div class="card-banner">
                <img src="${nft.image || 'placeholder.jpg'}" alt="${nft.name}" onerror="this.src='placeholder.jpg'">
            </div>
            <div class="card-content">
                <h3 class="card-title">${nft.name}</h3>
                <span class="card-author">#${nft.tokenId}</span>
                <div class="wrapper">
                    <span>${nft.collection}</span>
                </div>
            </div>
        `;
        li.addEventListener('click', () => openModal(nft));
        grid.appendChild(li);
    });
};

const openModal = (nft) => {
    document.getElementById('modal-image').src = nft.image || 'placeholder.jpg';
    document.getElementById('modal-title').textContent = nft.name;
    document.getElementById('modal-description').textContent = nft.description;

    const traitsDiv = document.getElementById('modal-traits');
    traitsDiv.innerHTML = '';
    nft.attributes.forEach(attr => {
        const span = document.createElement('span');
        span.className = 'trait';
        span.textContent = `${attr.trait_type}: ${attr.value}`;
        traitsDiv.appendChild(span);
    });

    document.getElementById('modal').style.display = 'block';
};

// Close modal
document.querySelector('.close-modal').onclick = () => {
    document.getElementById('modal').style.display = 'none';
};
window.onclick = (e) => {
    if (e.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};

// Search
document.getElementById('search-form').onsubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById('search-input').value.trim();
    if (input) {
        currentAddress = input;
        const nfts = await fetchNFTs(currentAddress);
        renderNFTs(nfts);
    }
};

// Load default collection
(async () => {
    const nfts = await fetchNFTs(currentAddress);
    renderNFTs(nfts);
})();