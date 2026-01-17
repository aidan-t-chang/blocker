document.addEventListener('DOMContentLoaded', () => {
    const timerInput = document.getElementById('timerinput');
    const timerSubmit = document.getElementById('timersubmit');

    chrome.storage.local.get(['blockTimer'], (result) => {
        if (result.blockTimer) {
            timerInput.value = result.blockTimer;
        }
    });

    timerSubmit.addEventListener('click', () => {
        const time = parseInt(timerInput.value);
        if (time >= 0 && time <= 59) {
            chrome.storage.local.set({ 'blockTimer': time }, () => {
                alert('Timer set to ' + time + ' seconds.');
            });
        } else if (time > 59) {
            chrome.storage.local.set({ 'blockTimer': 59}, () => {
                alert('Maximum timer is 59 seconds. Timer set to 59 seconds.');
            });
        }
    });
    const urlsubmit = document.getElementById('urlsubmit');

    if (urlsubmit) {
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
    }
    updateBlockedList();
})

async function updateBlockedList() {
    const blockedlistDiv = document.getElementById('blockedlist');
    blockedlistDiv.innerHTML = '';
    const allItems = await chrome.storage.local.get(null);
    for (const url in allItems) {
        if (url === 'blockTimer') {
            continue;
        }
        const p = document.createElement('p');
        p.className = 'urlelement';
        p.textContent = url;
        blockedlistDiv.appendChild(p);
    }
}
