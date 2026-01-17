chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        checkAndStartTimer(tabId, tab.url);
    }
});

function checkAndStartTimer(tabId, url) {
    chrome.storage.local.get(null, (items) => {
        const timerDuration = items.blockTimer || 10;

        let isBlocked = false;
        for (const key in items) {
            if (key !== 'blockTimer' && url.includes(key)) {
                isBlocked = true;
                break;
            }
        }

        if (isBlocked) {
            if (timerDuration > 0) {
                console.log(`Starting timer for ${url} for ${timerDuration} seconds.`);
                chrome.alarms.create(`blockTimer-${tabId}`, { delayInMinutes: timerDuration / 60 });
            } else {
                chrome.tabs.remove(tabId);
            }
        }
    });
}

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name.startsWith('blockTimer-')) {
        const tabId = parseInt(alarm.name.split('-')[1]);

        chrome.tabs.remove(tabId, () => {});

        chrome.alarms.clear(alarm.name);
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getTimer') {
        const alarmName = `blockTimer-${sender.tab.id}`;

        chrome.alarms.get(alarmName, (alarm) => {
            if (alarm) {
                sendResponse({ scheduledTime: alarm.scheduledTime });
            } else {
                sendResponse({ scheduledTime: null });
            }
        })
    }
})