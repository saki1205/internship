const data = {
  companyName: "TechCorp",
  matchScore: 86,
  accountStatus: "Target"
};

const widget = document.createElement("div");
widget.className = "fe-widget";
widget.innerHTML = `
  <div><strong>${data.companyName}</strong></div>
  <div>Match Score: <progress value="${data.matchScore}" max="100"></progress> ${data.matchScore}%</div>
  <div>Status: <span class="${data.accountStatus === 'Target' ? 'target' : 'not-target'}">${data.accountStatus}</span></div>
  <button id="toggle-widget">Hide</button>
`;

widget.style.display = "block";
document.body.appendChild(widget);

chrome.storage.sync.get(["showWidget"], ({ showWidget }) => {
  if (showWidget === false) widget.style.display = "none";
});

document.getElementById("toggle-widget").onclick = () => {
  const visible = widget.style.display !== "none";
  widget.style.display = visible ? "none" : "block";
  chrome.storage.sync.set({ showWidget: !visible });
};
