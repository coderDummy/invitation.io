// Fungsi untuk membaca parameter dari URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Menampilkan nama tamu dari URL
document.addEventListener("DOMContentLoaded", () => {
    const guestName = getQueryParam('to');
    if (guestName) {
        document.getElementById('guest-name-placeholder').textContent = guestName;
    }
});

// Animasi untuk membuka undangan
function openInvitation() {
    document.querySelector('.intro-screen').style.display = 'none';
    document.querySelector('.invitation-content').style.display = 'block';
    document.querySelector('.floating-menu').style.display = 'flex'; // Tampilkan floating menu
    document.body.style.overflow = 'auto'; // Enable scrolling
    const audio = document.getElementById('background-audio');
    audio.play();
}

// Scroll ke section saat tombol navigasi diklik
document.querySelectorAll('.floating-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

function updateCountdown() {
    const targetDate = new Date("2024-12-28T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Menghitung hari, jam, menit, dan detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Fungsi untuk memastikan dua digit (contoh: 8 menjadi 08)
    const formatNumber = (num) => num < 10 ? `0${num}` : num.toString();

    // Memisahkan tiap digit
    const daysDigits = formatNumber(days);
    const hoursDigits = formatNumber(hours);
    const minutesDigits = formatNumber(minutes);
    const secondsDigits = formatNumber(seconds);

    // Menampilkan tiap digit dalam elemen HTML
    document.getElementById("days").innerHTML = `<div>${daysDigits[0]}</div><div>${daysDigits[1]}</div>`;
    document.getElementById("hours").innerHTML = `<div>${hoursDigits[0]}</div><div>${hoursDigits[1]}</div>`;
    document.getElementById("minutes").innerHTML = `<div>${minutesDigits[0]}</div><div>${minutesDigits[1]}</div>`;
    document.getElementById("seconds").innerHTML = `<div>${secondsDigits[0]}</div><div>${secondsDigits[1]}</div>`;

    // Jika waktu sudah habis
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".countdown-container h1").innerText = "Waktu telah habis!";
        document.querySelector(".countdown").style.display = "none";
    }
}

// Memperbarui countdown setiap detik
const countdownInterval = setInterval(updateCountdown, 1000);


// Update countdown every second
const x = setInterval(updateCountdown, 1000);

// Initial call to display countdown immediately
updateCountdown();


document.addEventListener('scroll', () => {
    const akadSection = document.getElementById('akad');
    const resepsiSection = document.getElementById('resepsi');

    const sectionInView = (section) => {
        const sectionTop = section.getBoundingClientRect().top;
        return sectionTop < window.innerHeight && sectionTop >= 0;
    };

    if (sectionInView(akadSection)) {
        akadSection.classList.add('visible');
    }

    if (sectionInView(resepsiSection)) {
        resepsiSection.classList.add('visible');
    }
});

const menuToggle = document.querySelector('.menu-toggle');
const floatingMenu = document.querySelector('.floating-menu');

document.querySelector('.menu-toggle').addEventListener('click', function () {
    const menu = document.querySelector('.floating-menu');
    menu.classList.toggle('menu-expanded');
});

// Toggle play/pause functionality
function toggleAudio() {
    const audio = document.getElementById('background-audio');
    const playPauseButton = document.getElementById('play-pause-button');

    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '<i class="fi fi-rr-pause"></i>'; // Change icon to pause
    } else {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fi fi-rr-play"></i>'; // Change icon to play
    }
}

// customCoulmn
// Get the elements with class="custom-column"
var elements = document.getElementsByClassName("custom-column");

// Declare a loop variable
var i;

// Two images side by side
function two() {
    for (i = 0; i < elements.length; i++) {
        elements[i].style.flex = "50%";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.section');

    sections.forEach((section, index) => {
        section.classList.add('hidden'); // Menambahkan kelas hidden awal
        section.setAttribute('data-delay', index +
            1); // Memberikan atribut data-delay untuk CSS
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry
                    .target); // Menghentikan observasi setelah muncul
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
});

const supabaseUrl = 'https://uxvpvkxnzdbctrckynmw.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4dnB2a3huemRiY3RyY2t5bm13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0Njg5MTgsImV4cCI6MjA0NjA0NDkxOH0.GP_n1ZwHQzQ7Lt3jMPyDjJOXU-TwbebT153TMnQwPsI'; // Ganti dengan API Key Anda

// Fungsi untuk mengambil semua pesan
async function fetchWishMessages() {
    const response = await fetch(
        `${supabaseUrl}/rest/v1/wishMessage?order=created_at.desc`, {
            method: 'GET',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json'
            }
        });

    if (response.ok) {
        const messages = await response.json();
        displayMessages(messages);
    } else {
        console.error('Error fetching messages:', response.status, response.statusText);
    }
}

// Fungsi untuk menampilkan pesan di DOM
function displayMessages(messages) {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = ''; // Kosongkan sebelumnya

    if (messages.length === 0) {
        // Jika tidak ada pesan, tampilkan pesan default
        const noMessageItem = document.createElement('div');
        noMessageItem.className = 'list-group-item text-center';
        noMessageItem.textContent = 'BELUM ADA PESAN';
        noMessageItem.style.padding = '20px';
        messagesList.appendChild(noMessageItem);
    } else {
        // Jika ada pesan, tampilkan setiap pesan
        messages.forEach(message => {
            const listItem = document.createElement('a');
            listItem.className =
                'list-group-item list-group-item-action flex-column align-items-start';
            listItem.href = '#';

            // Menghitung waktu relatif
            const timeAgo = formatRelativeTime(new Date(message.created_at));

            listItem.innerHTML = `
<div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1"></h5>
    <small class="text-muted">${timeAgo}</small>
</div>
<p class="mb-1">${message.message}</p>
<small class="text-muted"> ~ ${message.name || 'No notes available.'}</small>
`;
            messagesList.appendChild(listItem);
        });
    }
}

// Fungsi untuk menghitung waktu relatif
function formatRelativeTime(date) {
    const now = new Date();
    const elapsed = now - date;

    const units = [{
            label: 'second',
            ms: 1000
        },
        {
            label: 'minute',
            ms: 1000 * 60
        },
        {
            label: 'hour',
            ms: 1000 * 60 * 60
        },
        {
            label: 'day',
            ms: 1000 * 60 * 60 * 24
        },
        {
            label: 'week',
            ms: 1000 * 60 * 60 * 24 * 7
        },
        {
            label: 'month',
            ms: 1000 * 60 * 60 * 24 * 30
        },
        {
            label: 'year',
            ms: 1000 * 60 * 60 * 24 * 365
        },
    ];

    for (let i = units.length - 1; i >= 0; i--) {
        const {
            label,
            ms
        } = units[i];
        const value = Math.floor(elapsed / ms);
        if (value > 0) {
            return new Intl.RelativeTimeFormat('en', {
                numeric: 'auto'
            }).format(-value, label);
        }
    }
    return 'just now';
}

// Fungsi untuk menambahkan pesan baru
async function addWishMessage(name, message) {
    // Tampilkan overlay loading
    showLoadingOverlay();

    const response = await fetch(`${supabaseUrl}/rest/v1/wishMessage`, {
        method: 'POST',
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation' // Untuk mendapatkan item yang baru ditambahkan
        },
        body: JSON.stringify({
            name,
            message
        })
    });

    if (response.ok) {
        const newWishMessage = await response.json();
        console.log('Added Wish Message:', newWishMessage);
        fetchWishMessages(); // Refresh the list after adding a message
    } else {
        console.error('Error adding wish message:', response.status, response.statusText);
    }

    // Sembunyikan overlay loading setelah data berhasil ditambahkan
    hideLoadingOverlay();
}

// Fungsi untuk menampilkan overlay loading
function showLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'flex'; // Tampilkan overlay
    // Nonaktifkan tombol dan input
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('nameInput').disabled = true;
    document.getElementById('messageTextarea').disabled = true;
}

// Fungsi untuk menyembunyikan overlay loading
function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'none'; // Sembunyikan overlay
    // Aktifkan tombol dan input kembali
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('nameInput').disabled = false;
    document.getElementById('nameInput').value = '';
    document.getElementById('messageTextarea').value = '';
    document.getElementById('messageTextarea').disabled = false;
}

// Event listener untuk tombol submit
document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah pengiriman form default
    const name = document.getElementById('nameInput').value;
    const message = document.getElementById('messageTextarea').value;
    if (name && message) {
        addWishMessage(name, message); // Panggil fungsi untuk menambahkan pesan
    } else {
        alert('Nama dan pesan tidak boleh kosong!');
    }
});

// Ambil semua pesan saat halaman dimuat
fetchWishMessages();

// J8R7.W9kqzYx*r@