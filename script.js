const chars = "abcdefghijklmnopqrstuvwxyz .,!?";
const pageLength = 10000;

let currentSeed = 0;
let currentPage = 0;
let direction = 0;

function generatePage(seed, pageNumber = 0) {
    let text = "";
    const start = pageNumber * pageLength;
    for (let i = start; i < start + pageLength; i++) {
        let index = Math.floor(Math.abs(Math.sin(seed + i)) * chars.length);
        text += chars[index];
    }
    return text;
}
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}
function showCurrentPage(anim = false) {
    const book = document.getElementById("bookContent");
    const text = generatePage(currentSeed, currentPage);

    if(anim) {
        book.style.transform = `translateX(${direction*100}%)`;
        setTimeout(() => {
            book.innerText = text;
            book.style.transition = 'none';
            book.style.transform = `translateX(${-direction*100}%)`;
            setTimeout(() => {
                book.style.transition = 'transform 0.5s ease';
                book.style.transform = 'translateX(0)';
            }, 10);
        }, 500);
    } else {
        book.innerText = text;
    }
    document.getElementById("pageNumber").innerText = `Страница ${currentPage + 1}`;
}
document.getElementById("searchBtn").onclick = () => {
    const query = document.getElementById("query").value;
    if(query) {
        currentSeed = hashCode(query);
        currentPage = 0;
        showCurrentPage();
    }
};
document.getElementById("randomBtn").onclick = () => {
    currentSeed = Math.floor(Math.random() * 1000000);
    currentPage = 0;
    showCurrentPage();
};
document.getElementById("prevBtn").onclick = () => {
    if(currentPage > 0) {
        direction = -1;
        currentPage--;
        showCurrentPage(true);
    }
};
document.getElementById("nextBtn").onclick = () => {
    direction = 1;
    currentPage++;
    showCurrentPage(true);
};
document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
};
