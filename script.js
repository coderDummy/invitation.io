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

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
        clearInterval(x);
        document.querySelector(".countdown-container h1").innerText = "Waktu telah habis!";
        document.querySelector(".countdown").style.display = "none";
    }
}

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