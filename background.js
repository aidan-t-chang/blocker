const urlsubmit = document.getElementById('urlsubmit');

urlsubmit.addEventListener('click', () => {
    const urlinput = document.getElementById('urlinput');
    const url = urlinput.value;
    if (url) {
        chrome.storage.local.set({ [url]: true }, () => {
            urlinput.value = '';
            updateBlockedList();
        });
    } else {
        urlinput.value = 'Please input a valid URL.';
    }
});

async function updateBlockedList() {
    const blockedlistDiv = document.getElementById('blockedlist');
    blockedlistDiv.innerHTML = '';
    const allItems = await chrome.storage.local.get(null);
    for (const url in allItems) {
        const p = document.createElement('p');
        p.className = 'urlelement';
        p.textContent = url;
        blockedlistDiv.appendChild(p);
    }
}