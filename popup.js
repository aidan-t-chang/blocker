document.addEventListener('DOMContentLoaded', () => {
    const timerInput = document.getElementById('timerinput');
    const timerSubmit = document.getElementById('timersubmit');

    const toggle = document.getElementById('toggle');

    chrome.storage.local.get(['isEnabled'], (result) => {
        if (result.isEnabled === undefined) {
            toggle.checked = true;
            chrome.storage.local.set({ isEnabled: true });
        } else {
            toggle.checked = result.isEnabled;
        }
    })

    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        chrome.storage.local.set({ isEnabled: isEnabled }, () => {
            const status = isEnabled ? 'enabled' : 'disabled';

            showToast(`Extension ${status}.`, isEnabled ? 'green' : 'red');
        });
    });

    chrome.storage.local.get(['blockTimer'], (result) => {
        if (result.blockTimer) {
            timerInput.value = result.blockTimer;
        }
    });

    timerSubmit.addEventListener('click', () => {
        const time = parseInt(timerInput.value);
        if (time >= 0 && time <= 59) {
            chrome.storage.local.set({ 'blockTimer': time }, () => {
                showToast(`Timer set to ${time} seconds.`, 'green');
            });
        } else if (time > 59) {
            chrome.storage.local.set({ 'blockTimer': 59}, () => {
                showToast('Maximum timer is 59 seconds. Timer set to 59 seconds.', 'red');
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

    const settingsButton = document.getElementById('settingsButton');
    const backButton = document.getElementById('backButton');
    if (!backButton) {
        return;
    }
    if (!settingsButton) {
        return;
    }

    settingsButton.addEventListener('click', () => {
        document.getElementById('settingsDiv').style.display = 'block';
        document.getElementById('mainDiv').style.display = 'none';
    });

    backButton.addEventListener('click', () => {
        document.getElementById('settingsDiv').style.display = 'none';
        document.getElementById('mainDiv').style.display = 'block';
    });
})

async function updateBlockedList() {
    const blockedlistDiv = document.getElementById('blockedlist');
    if (blockedlistDiv != null) {
        blockedlistDiv.innerHTML = '';
    }
    const allItems = await chrome.storage.local.get(null);
    for (const url in allItems) {
        if (url === 'blockTimer') {
            continue;
        }
        const p = document.createElement('p');
        p.className = 'urlelement';
        p.textContent = url;
        p.id = `url-${url}`;
        p.addEventListener('click', async () => {
            await chrome.storage.local.remove(url);
            updateBlockedList();
        });
        blockedlistDiv.appendChild(p);
    }
}

function showToast(message, color) {
    const toast = document.getElementById('status-message');
    if (toast) {
        toast.textContent = message;
        toast.style.color = color || 'black';

        setTimeout(() => {
            toast.textContent = '';
        }, 3000);
    }
}